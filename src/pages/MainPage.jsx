import React, { useState } from 'react';
import { Heart, Users, Phone, AlertTriangle, Clock, MapPin, Shield, Smartphone, Pill, Star, ChevronRight, Menu, X, UserPlus } from 'lucide-react';

const CareFull = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const testimonials = [
    { name: "Priya M., Bangalore", text: "CareFull volunteers reached me within 10 minutes during my emergency!" },
    { name: "Rajesh K., Mumbai", text: "The medicine delivery service was a lifesaver when I couldn't leave home." },
    { name: "Anita S., Delhi", text: "Emergency response was instant and the volunteers were so caring." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            <a href="/booking" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Emergency</a>
            <a href="/inventory" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Medicines</a>
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
              <a href="/emergency" className="text-gray-600 hover:text-blue-600 font-medium">Emergency</a>
              <a href="/volunteers" className="text-gray-600 hover:text-blue-600 font-medium">Volunteers</a>
              <a href="/medicines" className="text-gray-600 hover:text-blue-600 font-medium">Medicines</a>
            </nav>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 rounded-3xl blur-3xl -z-10"></div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              CareFull
            </span>
            <br />
            <span className="text-3xl lg:text-4xl text-gray-700">Emergency Support & Community Care</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Swift Response. Community Support. Immediate Help.
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto">
            Need urgent help or essential medicines? CareFull connects you instantly with emergency responders, community volunteers, and medicine delivery – when you need it most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6" />
              <span>Emergency Help</span>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Get Volunteers</span>
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2">
              <Pill className="w-6 h-6" />
              <span>Order Medicines</span>
            </button>
          </div>
        </div>

        {/* Features at a Glance */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How We Help You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Response</h3>
              <p className="text-gray-600">Instant connection to emergency services and immediate location sharing for rapid response</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Volunteers</h3>
              <p className="text-gray-600">Connect with nearby volunteers ready to help with transportation, errands, or support</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Pill className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medicine Delivery</h3>
              <p className="text-gray-600">Quick delivery of essential medicines from nearby pharmacies to your doorstep</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get help in 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose your need", desc: "Emergency, Volunteer, or Medicine", icon: <Smartphone className="w-8 h-8" /> },
              { step: "2", title: "We connect you instantly", desc: "With responders or volunteers nearby", icon: <MapPin className="w-8 h-8" /> },
              { step: "3", title: "Get immediate help", desc: "Fast response and caring support", icon: <Shield className="w-8 h-8" /> }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-blue-600">{item.icon}</div>
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
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
                See how our simple interface makes getting help effortless in emergency situations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">One-tap Emergency Alert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Volunteer Request System</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Medicine Ordering Portal</span>
                </div>
              </div>
            </div>

            {/* Updated Device Mockup */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8">
                <div className="space-y-6">
                  {/* Emergency Button */}
                  <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 font-bold text-xl hover:shadow-lg transition-all">
                    <div className="flex items-center justify-center space-x-3">
                      <AlertTriangle className="w-8 h-8" />
                      <span>🚨 EMERGENCY</span>
                    </div>
                  </button>

                  {/* Volunteer Request */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="w-6 h-6 text-cyan-600" />
                      <span className="font-semibold text-gray-800">Need a Volunteer?</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg p-3 font-medium">
                      Find Helper Nearby
                    </button>
                  </div>

                  {/* Medicine Order */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Pill className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold text-gray-800">Quick Medicine Order</span>
                    </div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Search medicines..." 
                        className="w-full p-2 border rounded-lg text-sm"
                      />
                      <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-2 text-sm font-medium">
                        Order Now
                      </button>
                    </div>
                  </div>

                  {/* Active Volunteers */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Volunteers Nearby</span>
                      <span className="text-xs text-green-600 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        12 Available
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {i}
                        </div>
                      ))}
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">
                        +8
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Community Says</h2>
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

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join CareFull?</h2>
          <p className="text-xl mb-8 opacity-90">Get the help you need, when you need it most</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Download App
            </button>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-white">
              Become a Volunteer
            </button>
          </div>
        </section>
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