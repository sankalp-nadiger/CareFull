import React, { useState } from 'react';
import { Heart, Activity, Users, Phone, Stethoscope, TrendingUp, AlertTriangle, Clock, MapPin, Shield, Smartphone, Pill, Star, ChevronRight, Menu, X } from 'lucide-react';

const CareFull = () => {
  const [activeService, setActiveService] = useState('emergency');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const testimonials = [
    { name: "Priya M., Bangalore", text: "CareFull saved my dad's life. The emergency response was instant and efficient!" },
    { name: "Rajesh K., Mumbai", text: "24/7 doctor availability gave me peace of mind during my recovery." },
    { name: "Anita S., Delhi", text: "The health tracking features helped me manage my diabetes better." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Keep Original Navigation */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center transform rotate-12">
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
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Home
            </button>
            <a href="/booking" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Booking</a>
            <a href="/inventory" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Inventory</a>
            <a href="/reorder" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Order</a>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg p-4 mb-6">
            <nav className="flex flex-col space-y-4">
              <a href="/booking" className="text-gray-600 hover:text-blue-600 font-medium">Booking</a>
              <a href="/inventory" className="text-gray-600 hover:text-blue-600 font-medium">Inventory</a>
              <a href="/reorder" className="text-gray-600 hover:text-blue-600 font-medium">Order</a>
            </nav>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-cyan-100/50 rounded-3xl blur-3xl -z-10"></div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              CareFull
            </span>
            <br />
            <span className="text-3xl lg:text-4xl text-gray-700">Emergency Health & Wellness Support</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Swift Response. Compassionate Care. Anywhere.
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
            Need urgent help or want to stay ahead of your health? CareFull connects you instantly with emergency responders, doctors, and wellness experts – anytime, anywhere.
          </p>

          {/* Service Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveService('emergency')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeService === 'emergency' 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Emergency
              </button>
              <button
                onClick={() => setActiveService('wellness')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeService === 'wellness' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Wellness
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6" />
              <span>Get Emergency Help</span>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <Stethoscope className="w-6 h-6" />
              <span>Talk to a Doctor</span>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <Activity className="w-6 h-6" />
              <span>Track My Health</span>
            </button>
          </div>
        </div>

        {/* Features at a Glance */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Features at a Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Emergency Locator</h3>
              <p className="text-gray-600">Instant location sharing with nearest emergency services</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Medical Chat & Video Call</h3>
              <p className="text-gray-600">Connect with certified doctors anytime, anywhere</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wearable Integration & Health Tracking</h3>
              <p className="text-gray-600">Sync with smartwatches and fitness devices</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Prescriptions & Pharmacy Connect</h3>
              <p className="text-gray-600">Get prescriptions delivered to your nearest pharmacy</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get help in 4 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign up or login", icon: <Smartphone className="w-8 h-8" /> },
              { step: "2", title: "Press 'Emergency' or 'Wellness'", icon: <AlertTriangle className="w-8 h-8" /> },
              { step: "3", title: "Get instant help or begin monitoring", icon: <Clock className="w-8 h-8" /> },
              { step: "4", title: "Follow-up with care advisors", icon: <Shield className="w-8 h-8" /> }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-blue-600">{item.icon}</div>
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* App Preview */}
        <section className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Experience CareFull</h2>
              <p className="text-lg text-gray-600 mb-8">
                See how our intuitive app interface makes emergency response and health monitoring effortless.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Emergency Alert Screen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Live Doctor Chat</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Health Dashboard</span>
                </div>
              </div>
            </div>

            {/* Updated Device Mockup */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8">
                <div className="space-y-6">
                  {/* Doctor Profile */}
                  <div className="flex items-center space-x-4 bg-blue-50 rounded-2xl p-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Dr. Sarah Johnson</h3>
                      <p className="text-gray-600 text-sm">Cardiologist</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-green-600">Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Button */}
                  <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-4 font-bold text-lg hover:shadow-lg transition-all">
                    🚨 EMERGENCY ALERT
                  </button>

                  {/* Health Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Heart Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">72 BPM</div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-pink-500" />
                        <span className="text-sm font-medium text-gray-700">BP</span>
                      </div>
                      <div className="text-2xl font-bold text-pink-600">120/80</div>
                    </div>
                  </div>

                  {/* Progress Chart */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-700">Weekly Progress</span>
                      <span className="text-xs text-green-600">+12%</span>
                    </div>
                    <div className="flex items-end space-x-2 h-16">
                      {[40, 60, 45, 80, 65, 90, 75].map((height, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-t from-cyan-400 to-blue-500 rounded-t flex-1 transition-all duration-1000 hover:scale-110"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-800">– {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer
        <footer className="py-16 bg-gray-800 text-white rounded-t-3xl mt-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CareFull</span>
              </div>
              <p className="text-gray-400">Swift Response. Compassionate Care. Anywhere.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91-1800-CAREFULL</p>
                <p>📧 help@carefull.com</p>
                <p>🏥 24/7 Emergency Hotline</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Download App</h3>
              <div className="space-y-3">
                <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                  <span>📱 App Store</span>
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
                  <span>🤖 Google Play</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors block">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors block">Terms of Service</a>
                <a href="/medical-disclaimer" className="text-gray-400 hover:text-white transition-colors block">Medical Disclaimer</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CareFull. All rights reserved. | Saving lives, one call at a time.</p>
          </div>
        </footer> */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CareFull;