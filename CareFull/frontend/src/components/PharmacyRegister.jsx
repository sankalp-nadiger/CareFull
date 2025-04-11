import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PharmacyRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    suppliers: [{ name: '', email: '', phone: '' }]
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSupplierChange = (index, field, value) => {
    const updatedSuppliers = [...formData.suppliers];
    updatedSuppliers[index] = {
      ...updatedSuppliers[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      suppliers: updatedSuppliers
    }));
  };
  
  const addSupplier = () => {
    setFormData(prev => ({
      ...prev,
      suppliers: [...prev.suppliers, { name: '', email: '', phone: '' }]
    }));
  };
  
  const removeSupplier = (index) => {
    if (formData.suppliers.length === 1) return;
    
    const updatedSuppliers = formData.suppliers.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      suppliers: updatedSuppliers
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Pharmacy name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    formData.suppliers.forEach((supplier, index) => {
      if (supplier.email && !/\S+@\S+\.\S+/.test(supplier.email)) {
        newErrors[`supplierEmail${index}`] = 'Supplier email is invalid';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      
      // Filter out empty suppliers
      const filteredSuppliers = formData.suppliers.filter(
        supplier => supplier.name || supplier.email || supplier.phone
      );
      
      // In a real app, this would be your API call
      // const response = await fetch('/api/pharmacy/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password,
      //     location: formData.location,
      //     suppliers: filteredSuppliers
      //   })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      const mockResponse = {
        message: 'Pharmacist registered successfully',
        token: 'mock-jwt-token',
        pharmacist: {
          id: 'mock-id-123',
          name: formData.name,
          email: formData.email,
          location: formData.location
        }
      };
      
      // Store token in localStorage/sessionStorage
      localStorage.setItem('pharmacyToken', mockResponse.token);
      
      setNotification({
        type: 'success',
        message: 'Registration successful! Redirecting to dashboard...'
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setNotification({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const clearNotification = () => {
    setNotification(null);
  };
  
  return (
    <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {notification && (
          <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex justify-between items-center">
              <p>{notification.message}</p>
              <button 
                onClick={clearNotification}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Pharmacy Registration</h2>
        </div>
        
        <div className="bg-blue-50 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Register Your Pharmacy</h3>
              <p className="text-sm text-blue-700 mt-1">
                Join our network of pharmacies to manage inventory, process prescriptions, and connect with suppliers.
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pharmacy Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Pharmacy Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter pharmacy name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="City, State"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
            
            {/* Suppliers Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-medium text-gray-700">Suppliers</h3>
                <button
                  type="button"
                  onClick={addSupplier}
                  className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Supplier
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {formData.suppliers.map((supplier, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Supplier {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeSupplier(index)}
                        className="text-red-500 hover:text-red-700"
                        disabled={formData.suppliers.length === 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Supplier Name</label>
                        <input
                          type="text"
                          value={supplier.name}
                          onChange={(e) => handleSupplierChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="MedSupply Inc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={supplier.email}
                          onChange={(e) => handleSupplierChange(index, 'email', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md text-sm ${errors[`supplierEmail${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="contact@supplier.com"
                        />
                        {errors[`supplierEmail${index}`] && 
                          <p className="mt-1 text-xs text-red-600">{errors[`supplierEmail${index}`]}</p>
                        }
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={supplier.phone}
                          onChange={(e) => handleSupplierChange(index, 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                * You can add your suppliers now or later from your dashboard.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800">
                Sign in
              </a>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : "Register Pharmacy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}