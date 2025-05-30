import React, { useState } from 'react';
import {
  Phone,
  Ambulance,
  Stethoscope,
  Heart,
  Clock,
  User,
  AlertTriangle,
  MapPin,
  Star,
  CreditCard,
  Wallet,
  Shield,
  CheckCircle,
  DollarSign
} from 'lucide-react';

const Navbar = ({ currentPage = 'Booking' }) => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Booking', href: '/booking' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Order', href: '/reorder' },
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between py-6 px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            CareFull
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.name === currentPage ? (
              <button
                key={item.name}
                className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                {item.name}
              </a>
            )
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

const VolunteerBooking = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: '',
    medicalHistory: '',
    emergencyContact: ''
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const healthServices = [
    {
      id: 'ambulance',
      title: 'Emergency Ambulance',
      description: 'Book ambulance service for medical emergencies',
      icon: <Ambulance className="w-8 h-8" />,
      color: 'bg-red-500',
      price: 2500,
      volunteer: {
        name: 'Dr. Rajesh Kumar',
        experience: '8 years',
        rating: 4.9,
        distance: '2.3 km away',
        arrivalTime: '5-8 minutes',
        specialization: 'Emergency Medicine',
        vehicleType: 'Advanced Life Support Ambulance'
      }
    },
    {
      id: 'emergency-doctor',
      title: 'Emergency Doctor',
      description: 'Request immediate doctor consultation',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'bg-orange-500',
      price: 1500,
      volunteer: {
        name: 'Dr. Priya Sharma',
        experience: '12 years',
        rating: 4.8,
        distance: '1.8 km away',
        arrivalTime: '10-15 minutes',
        specialization: 'General Medicine & Emergency Care',
        vehicleType: 'Medical Kit & Portable Equipment'
      }
    },
    {
      id: 'emergency-nurse',
      title: 'Emergency Nurse',
      description: 'Get nursing care and medical assistance',
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-blue-500',
      price: 800,
      volunteer: {
        name: 'Nurse Anita Reddy',
        experience: '6 years',
        rating: 4.7,
        distance: '1.2 km away',
        arrivalTime: '8-12 minutes',
        specialization: 'Critical Care & Patient Monitoring',
        vehicleType: 'Nursing Care Kit'
      }
    },
    {
      id: 'home-care',
      title: 'Home Care Support',
      description: 'In-home medical care and assistance',
      icon: <User className="w-8 h-8" />,
      color: 'bg-green-500',
      price: 1200,
      volunteer: {
        name: 'Caregivers Team (3 members)',
        experience: '5 years average',
        rating: 4.6,
        distance: '3.1 km away',
        arrivalTime: '20-30 minutes',
        specialization: 'Home Care & Elderly Support',
        vehicleType: 'Home Care Equipment & Supplies'
      }
    }
  ];

  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit/Debit Card',
      description: 'Pay securely with your card',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'upi',
      title: 'UPI Payment',
      description: 'Pay using UPI (GPay, PhonePe, Paytm)',
      icon: <Wallet className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'cash',
      title: 'Cash on Service',
      description: 'Pay cash when the volunteer arrives',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInputChange = ({ target: { name, value } }) => {
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSelectedService('');
    setSelectedPayment('');
    setFormData({
      name: '',
      phone: '',
      address: '',
      description: '',
      medicalHistory: '',
      emergencyContact: ''
    });
    setPaymentData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      upiId: ''
    });
  };

  if (isSubmitted) {
    const selectedServiceData = healthServices.find(s => s.id === selectedService);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar currentPage="Booking" />
        <div className="flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-4">Your volunteer request has been received. The assigned volunteer will contact you shortly.</p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Service:</strong> {selectedServiceData?.title}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Volunteer:</strong> {selectedServiceData?.volunteer.name}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Amount Paid:</strong> ₹{selectedServiceData?.price}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Expected Arrival:</strong> {selectedServiceData?.volunteer.arrivalTime}
              </p>
            </div>
            <button
              onClick={resetForm}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedServiceData = healthServices.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar currentPage="Booking" />
      
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Health Services Volunteer</h1>
          <p className="text-gray-600 text-lg">Book a volunteer for emergency medical assistance and health services</p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-700 font-medium">
              For life-threatening emergencies, call emergency services immediately: 108 (India) or your local emergency number
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Service Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Stethoscope className="w-6 h-6 mr-2 text-blue-600" />
              Select Health Service
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {healthServices.map(({ id, icon, title, description, color }) => (
                <div
                  key={id}
                  onClick={() => setSelectedService(id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedService === id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`${color} text-white p-3 rounded-lg w-fit mb-4`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Details */}
          {selectedService && selectedServiceData && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-green-600" />
                Assigned Volunteer
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedServiceData.volunteer.name}</h3>
                    <p className="text-gray-600 mb-2">{selectedServiceData.volunteer.specialization}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedServiceData.volunteer.experience} experience
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {selectedServiceData.volunteer.rating} rating
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      Available Now
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-semibold text-gray-700">Distance</span>
                    </div>
                    <p className="text-gray-600">{selectedServiceData.volunteer.distance}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="font-semibold text-gray-700">Arrival Time</span>
                    </div>
                    <p className="text-lg font-bold text-orange-600">{selectedServiceData.volunteer.arrivalTime}</p>
                  </div>
                </div>
                
                <div className="mt-4 bg-white rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Ambulance className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="font-semibold text-gray-700">Equipment</span>
                  </div>
                  <p className="text-gray-600">{selectedServiceData.volunteer.vehicleType}</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Gateway */}
          {selectedService && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-purple-600" />
                Payment Information
              </h2>
              
              {/* Service Cost Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
                  <span className="text-3xl font-bold text-purple-600">₹{selectedServiceData?.price}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Includes service fee and volunteer charges</p>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {paymentMethods.map(({ id, title, description, icon, color }) => (
                    <div
                      key={id}
                      onClick={() => setSelectedPayment(id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedPayment === id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`${color} text-white p-2 rounded-lg w-fit mb-3`}>
                        {icon}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              {selectedPayment === 'card' && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    Secure Card Payment
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter name as on card"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        type="password"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handlePaymentInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPayment === 'upi' && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Wallet className="w-5 h-5 mr-2 text-green-500" />
                    UPI Payment
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID *</label>
                    <input
                      type="text"
                      name="upiId"
                      value={paymentData.upiId}
                      onChange={handlePaymentInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="yourname@paytm / yourname@gpay"
                      required
                    />
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      You can also scan QR code or use any UPI app to complete payment
                    </p>
                  </div>
                </div>
              )}

              {selectedPayment === 'cash' && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-orange-500" />
                    Cash on Service
                  </h3>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-orange-800 mb-2">
                      <strong>Amount to pay:</strong> ₹{selectedServiceData?.price}
                    </p>
                    <p className="text-sm text-orange-700">
                      Please keep exact cash ready. The volunteer will collect payment upon arrival.
                    </p>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Your payment information is encrypted and secure. We never store your card details.
                </div>
              </div>
            </div>
          )}

          {/* Patient Information */}
          {selectedService && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-green-600" />
                Patient Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    label: 'Full Name *',
                    name: 'name',
                    type: 'text',
                    placeholder: "Enter patient's full name",
                    required: true
                  },
                  {
                    label: 'Phone Number *',
                    name: 'phone',
                    type: 'tel',
                    placeholder: '+91 9876543210',
                    required: true
                  },
                  {
                    label: 'Address *',
                    name: 'address',
                    type: 'textarea',
                    placeholder: 'Complete address with landmarks',
                    required: true
                  },
                  {
                    label: 'Medical Condition Description *',
                    name: 'description',
                    type: 'textarea',
                    placeholder: 'Describe the medical condition, symptoms, or reason for assistance',
                    required: true
                  },
                  {
                    label: 'Medical History',
                    name: 'medicalHistory',
                    type: 'textarea',
                    placeholder: 'Any relevant medical history, allergies, or medications'
                  },
                  {
                    label: 'Emergency Contact',
                    name: 'emergencyContact',
                    type: 'tel',
                    placeholder: 'Emergency contact number'
                  }
                ].map(({ label, name, type, placeholder, required }) => (
                  <div key={name} className={name === 'address' || name === 'description' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    {type === 'textarea' ? (
                      <textarea
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        required={required}
                        rows={name === 'description' ? 4 : 3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={placeholder}
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        required={required}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedService && selectedPayment && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {selectedPayment === 'cash' ? 'Confirm Booking' : `Pay ₹${selectedServiceData?.price} & Book`}
              </button>
              <p className="text-sm text-gray-600 mt-3">
                {selectedPayment === 'cash' 
                  ? `Pay ₹${selectedServiceData?.price} in cash when ${selectedServiceData?.volunteer.name.split(' ')[0]} arrives`
                  : 'Secure payment • The volunteer will arrive after payment confirmation'
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8 text-gray-500">
          <p className="text-sm">Available 24/7 • Trained Medical Volunteers • Quick Response Time</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerBooking;