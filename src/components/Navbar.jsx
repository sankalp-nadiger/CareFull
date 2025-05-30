import React from 'react';
import { Heart } from 'lucide-react';

const Navbar = ({ currentPage = 'Home' }) => {
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Booking', href: '/booking' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Order', href: '/reorder' },
    { name: 'Help', href: '/help' }
  ];

  return (
    <header className="flex items-center justify-between py-6">
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
    </header>
  );
};

export default Navbar;