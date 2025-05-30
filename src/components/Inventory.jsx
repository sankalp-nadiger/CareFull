import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const Navbar = ({ currentPage = 'Home' }) => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Emergency', href: '/booking' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Order', href: '/reorder' },
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

const InventoryManagement = ({ pharmacyId }) => {
  // Hardcoded inventory data with prices in Rupees
  const [inventoryItems, setInventoryItems] = useState([
    {
      drugId: 1,
      name: "Amoxicillin 500mg",
      sku: "MED00001",
      price: 1075.50,
      quantity: 45,
      lowStockThreshold: 10,
      manufacturer: "PharmaCorp",
      supplierEmail: "orders@pharmacorp.com"
    },
    {
      drugId: 2,
      name: "Ibuprofen 200mg",
      sku: "MED00002",
      price: 705.00,
      quantity: 3,
      lowStockThreshold: 5,
      manufacturer: "MediTech",
      supplierEmail: "supply@meditech.com"
    },
    {
      drugId: 3,
      name: "Lisinopril 10mg",
      sku: "MED00003",
      price: 1306.25,
      quantity: 0,
      lowStockThreshold: 8,
      manufacturer: "CardioMed",
      supplierEmail: "orders@cardiomed.com"
    },
    {
      drugId: 4,
      name: "Metformin 500mg",
      sku: "MED00004",
      price: 1850.90,
      quantity: 25,
      lowStockThreshold: 15,
      manufacturer: "DiabetCare",
      supplierEmail: "supply@diabetcare.com"
    },
    {
      drugId: 5,
      name: "Omeprazole 20mg",
      sku: "MED00005",
      price: 1568.70,
      quantity: 2,
      lowStockThreshold: 6,
      manufacturer: "GastroPharm",
      supplierEmail: "orders@gastropharm.com"
    },
    {
      drugId: 6,
      name: "Atorvastatin 20mg",
      sku: "MED00006",
      price: 2361.35,
      quantity: 35,
      lowStockThreshold: 12,
      manufacturer: "LipidControl",
      supplierEmail: "supply@lipidcontrol.com"
    },
    {
      drugId: 7,
      name: "Azithromycin 250mg",
      sku: "MED00007",
      price: 2041.80,
      quantity: 1,
      lowStockThreshold: 5,
      manufacturer: "AntiBio Labs",
      supplierEmail: "orders@antibiolabs.com"
    },
    {
      drugId: 8,
      name: "Acetaminophen 325mg",
      sku: "MED00008",
      price: 518.75,
      quantity: 78,
      lowStockThreshold: 20,
      manufacturer: "PainRelief Inc",
      supplierEmail: "supply@painrelief.com"
    }
  ]);

  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [reorderInProgress, setReorderInProgress] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate loading and filter low stock items
    const timer = setTimeout(() => {
      const lowStock = inventoryItems.filter(item => 
        item.quantity < item.lowStockThreshold
      );
      setLowStockItems(lowStock);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [inventoryItems]);

  const handleReorderDrug = async (drugId, name) => {
    try {
      setReorderInProgress(prev => ({ ...prev, [drugId]: true }));
      
      const quantityToAdd = 20;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update both inventory lists
      setInventoryItems(prev => 
        prev.map(item => 
          item.drugId === drugId 
            ? { ...item, quantity: item.quantity + quantityToAdd } 
            : item
        )
      );
      
      setLowStockItems(prev => 
        prev.map(item => 
          item.drugId === drugId 
            ? { ...item, quantity: item.quantity + quantityToAdd } 
            : item
        ).filter(item => item.quantity < item.lowStockThreshold)
      );
      
      setNotification({
        type: 'success',
        message: `Order Received: Successfully ordered 20 units of ${name}`
      });
      
    } catch (error) {
      console.error('Error reordering drug:', error);
      setNotification({
        type: 'error',
        message: `Failed to reorder ${name}. Please try again.`
      });
    } finally {
      setReorderInProgress(prev => ({ ...prev, [drugId]: false }));
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const getStockStatusBadge = (quantity, threshold) => {
    if (quantity === 0) {
      return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Out of stock</span>;
    } else if (quantity < threshold) {
      return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Low in stock</span>;
    } else {
      return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">In stock</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4">
        <div className="max-w-7xl mx-auto">
          <Navbar currentPage="Inventory" />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="max-w-7xl mx-auto">
        <Navbar currentPage="Inventory" />
        
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-3xl">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {notification && (
              <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
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
              <div className="bg-green-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Inventory</h2>
            </div>

            <div className="mb-4">
              <div className="flex border-b">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center mr-4 py-2 px-1 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('low-stock')}
                  className={`flex items-center py-2 px-1 relative ${activeTab === 'low-stock' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Low Stock
                  {lowStockItems.length > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {lowStockItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {activeTab === 'overview' ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="px-4 py-2 font-medium">Product name</th>
                      <th className="px-4 py-2 font-medium">SKU</th>
                      <th className="px-4 py-2 font-medium">Price</th>
                      <th className="px-4 py-2 font-medium">Current quantity</th>
                      <th className="px-4 py-2 font-medium">Minimum quantity</th>
                      <th className="px-4 py-2 font-medium">Stock status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => (
                      <tr key={item.drugId} className="border-b border-gray-100 hover:bg-blue-50">
                        <td className="px-4 py-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a.997.997 0 01.293-.707l5-5A.997.997 0 018 0h5c.256 0 .512.098.707.293l4 4A.997.997 0 0118 5v4.586zM15 5.414L14.586 5H8.414l-5 5V10l7 7 7-7V5.414l-2-2zM13 8a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                          </svg>
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-gray-500">{item.sku}</td>
                        <td className="px-4 py-3">₹{item.price.toFixed(2)}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">{item.lowStockThreshold}</td>
                        <td className="px-4 py-3">
                          {getStockStatusBadge(item.quantity, item.lowStockThreshold)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <div>COUNT: {inventoryItems.length}</div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {lowStockItems.length === 0 ? (
                  <div className="bg-blue-50 p-4 rounded-md text-center">
                    <p className="text-blue-600">No low stock items requiring attention.</p>
                  </div>
                ) : (
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="px-4 py-2 font-medium">Product name</th>
                        <th className="px-4 py-2 font-medium">Manufacturer</th>
                        <th className="px-4 py-2 font-medium">Current quantity</th>
                        <th className="px-4 py-2 font-medium">Supplier</th>
                        <th className="px-4 py-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockItems.map((item) => (
                        <tr key={item.drugId} className="border-b border-gray-100 hover:bg-blue-50">
                          <td className="px-4 py-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {item.name}
                          </td>
                          <td className="px-4 py-3">{item.manufacturer}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                              {item.quantity} units
                            </span>
                          </td>
                          <td className="px-4 py-3">{item.supplierEmail}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleReorderDrug(item.drugId, item.name)}
                              disabled={reorderInProgress[item.drugId]}
                              className={`px-3 py-1 rounded text-white text-sm ${
                                reorderInProgress[item.drugId]
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-blue-500 hover:bg-blue-600'
                              }`}
                            >
                              {reorderInProgress[item.drugId] ? 'Ordering...' : 'Reorder'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement; 