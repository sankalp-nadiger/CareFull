// pages/volunteer/auth.jsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VolunteerAuth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Registration form state
  const [registrationForm, setRegistrationForm] = useState({
    fitfullDoctorId: '',
    name: '',
    specialties: '',
    password: '',
    confirmPassword: ''
  });

  // Sign-in form state
  const [signInForm, setSignInForm] = useState({
    fitfullDoctorId: '',
    password: ''
  });

  // Handle registration form changes
  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm({ ...registrationForm, [name]: value });
  };

  // Handle sign-in form changes
  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInForm({ ...signInForm, [name]: value });
  };

  // Handle registration submission
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (registrationForm.password !== registrationForm.confirmPassword) {
      setErrorMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Format specialties as an array
      const specialtiesArray = registrationForm.specialties
        .split(',')
        .map(specialty => specialty.trim())
        .filter(specialty => specialty.length > 0);

      const registrationData = {
        fitfullDoctorId: registrationForm.fitfullDoctorId,
        name: registrationForm.name,
        specialties: specialtiesArray,
        // Note: In a real app, you'd handle password hashing securely on backend
        password: registrationForm.password
      };

      // Send registration request
      const response = await axios.post('/api/volunteer/register', registrationData);
      setSuccessMessage('Registration successful! Please sign in.');
      
      // Clear form and switch to sign-in tab after successful registration
      setRegistrationForm({
        fitfullDoctorId: '',
        name: '',
        specialties: '',
        password: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        setActiveTab('signin');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.response?.data?.details || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle sign-in submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Send sign-in request
      const response = await axios.post('/api/volunteer/signin', signInForm);
      setSuccessMessage('Sign-in successful! Redirecting...');
      
      // Store auth token in localStorage (in a real app, handle securely)
      localStorage.setItem('volunteerToken', response.data.token);
      
      // Redirect to volunteer dashboard
      setTimeout(() => {
        navigate('/volunteer/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`w-1/2 py-4 px-6 text-center ${
              activeTab === 'signin' ? 'bg-blue-500 text-white' : 'bg-gray-50'
            }`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-4 px-6 text-center ${
              activeTab === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-50'
            }`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {/* Success and Error Messages */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          {/* Registration Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegistrationSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Volunteer Registration
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fitfullDoctorId">
                  Fitfull Doctor ID*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fitfullDoctorId"
                  name="fitfullDoctorId"
                  type="text"
                  placeholder="Enter your Fitfull Doctor ID"
                  value={registrationForm.fitfullDoctorId}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={registrationForm.name}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialties">
                  Specialties (comma-separated)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="specialties"
                  name="specialties"
                  type="text"
                  placeholder="e.g., pediatrics, elderly care, cardiology"
                  value={registrationForm.specialties}
                  onChange={handleRegistrationChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Choose a password"
                  value={registrationForm.password}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password*
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={registrationForm.confirmPassword}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Register'}
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  By registering, you agree to our Terms of Service and Privacy Policy.
                </p>
                <p className="mt-2">
                  Note: Your medical credentials will be verified before your account is activated.
                </p>
              </div>
            </form>
          )}

          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Volunteer Sign In
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signinFitfullDoctorId">
                  Fitfull Doctor ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signinFitfullDoctorId"
                  name="fitfullDoctorId"
                  type="text"
                  placeholder="Enter your Fitfull Doctor ID"
                  value={signInForm.fitfullDoctorId}
                  onChange={handleSignInChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signinPassword">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signinPassword"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInForm.password}
                  onChange={handleSignInChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>

              <div className="text-center">
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerAuth;
