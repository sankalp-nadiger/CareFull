import { useState, useEffect } from 'react';
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

export default function PharmacyReorderPage() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [pharmacyId, setPharmacyId] = useState('pharm123');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'IN'
    }
  });
  
  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        setLoading(true);
        const data = {
          lowStockItems: [
            { drugId: '1001', name: 'Amoxicillin', manufacturer: 'Pfizer', quantity: 3, price: 999.99, lowStockThreshold: 5, supplierName: 'MedSupply Inc.' },
            { drugId: '1002', name: 'Lisinopril', manufacturer: 'Novartis', quantity: 2, price: 650.50, lowStockThreshold: 5, supplierName: 'PharmaDist' },
            { drugId: '1003', name: 'Metformin', manufacturer: 'Merck', quantity: 0, price: 1275.75, lowStockThreshold: 5, supplierName: 'MedSupply Inc.' },
            { drugId: '1004', name: 'Simvastatin', manufacturer: 'AstraZeneca', quantity: 4, price: 1830.30, lowStockThreshold: 10, supplierName: 'GlobalMeds' }
          ]
        };
        setLowStockItems(data.lowStockItems);
      } catch (error) {
        console.error('Error fetching low stock items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLowStockItems();
  }, [pharmacyId]);
  
  const handleQuantityChange = (drugId, quantity) => {
    const updatedItems = selectedItems.map(item => 
      item.drugId === drugId ? { ...item, orderQuantity: parseInt(quantity) || 0 } : item
    );
    
    if (!updatedItems.some(item => item.drugId === drugId)) {
      const itemToAdd = lowStockItems.find(item => item.drugId === drugId);
      updatedItems.push({ ...itemToAdd, orderQuantity: parseInt(quantity) || 0 });
    }
    
    setSelectedItems(updatedItems.filter(item => item.orderQuantity > 0));
  };

  const handlePaymentDataChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPaymentData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validatePayment = () => {
    if (paymentMethod === 'credit_card') {
      const { cardNumber, expiryDate, cvv, cardholderName, billingAddress } = paymentData;
      if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length < 13) {
        return 'Please enter a valid card number';
      }
      if (!expiryDate || expiryDate.length < 5) {
        return 'Please enter a valid expiry date';
      }
      if (!cvv || cvv.length < 3) {
        return 'Please enter a valid CVV';
      }
      if (!cardholderName.trim()) {
        return 'Please enter the cardholder name';
      }
      if (!billingAddress.street || !billingAddress.city || !billingAddress.state || !billingAddress.zipCode) {
        return 'Please complete the billing address';
      }
    }
    return null;
  };

  const processPayment = async () => {
    const validationError = validatePayment();
    if (validationError) {
      setOrderStatus({ type: 'error', message: validationError });
      return false;
    }

    try {
      setPaymentLoading(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment gateway response
      const paymentSuccess = Math.random() > 0.1; // 90% success rate for demo
      
      if (!paymentSuccess) {
        throw new Error('Payment declined. Please check your payment information.');
      }
      
      return {
        transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
        paymentMethod,
        amount: getTotalCost()
      };
    } catch (error) {
      throw error;
    } finally {
      setPaymentLoading(false);
    }
  };
  
  const handleProceedToPayment = () => {
    if (selectedItems.length === 0) {
      setOrderStatus({ type: 'error', message: 'Please select at least one item to order' });
      return;
    }
    setShowPayment(true);
    setOrderStatus(null);
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      
      // Process payment first
      const paymentResult = await processPayment();
      
      // If payment successful, place the order
      const orderNumber = `ORD-${Math.floor(Math.random() * 10000)}`;
      
      // Simulate order placement API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrderStatus({ 
        type: 'success', 
        message: `Order placed successfully! Order #${orderNumber}. Payment processed: ₹${getTotalCost()}` 
      });
      
      // Reset form
      setSelectedItems([]);
      setShowPayment(false);
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'IN'
        }
      });
      
    } catch (error) {
      console.error('Error processing order:', error);
      setOrderStatus({ type: 'error', message: error.message || 'Failed to process order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  const getTotalCost = () => {
    return selectedItems.reduce((total, item) => {
      return total + (item.price * item.orderQuantity);
    }, 0).toFixed(2);
  };
  
  const clearNotification = () => {
    setOrderStatus(null);
  };

  const goBackToOrder = () => {
    setShowPayment(false);
  };

  if (loading && lowStockItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-6">
        <div className="max-w-7xl mx-auto">
          <Navbar currentPage="Order" />
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-6">
      <div className="max-w-7xl mx-auto">
        <Navbar currentPage="Order" />
        
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-3xl">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {orderStatus && (
              <div className={`mb-4 p-4 rounded-md ${orderStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="flex justify-between items-center">
                  <p>{orderStatus.message}</p>
                  <button 
                    onClick={clearNotification}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {!showPayment ? (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Place Reorder</h2>
                </div>

                <div className="bg-blue-50 p-4 mb-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Reorder Low Stock Items</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Enter the quantity for each item you want to reorder. You'll be able to review and pay before finalizing your order.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto mb-6">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="px-4 py-2 font-medium">Product name</th>
                        <th className="px-4 py-2 font-medium">Manufacturer</th>
                        <th className="px-4 py-2 font-medium">Current stock</th>
                        <th className="px-4 py-2 font-medium">Price</th>
                        <th className="px-4 py-2 font-medium">Supplier</th>
                        <th className="px-4 py-2 font-medium">Order quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockItems.map((item) => (
                        <tr key={item.drugId} className="border-b border-gray-100 hover:bg-blue-50">
                          <td className="px-4 py-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a.997.997 0 01.293-.707l5-5A.997.997 0 018 0h5c.256 0 .512.098.707.293l4 4A.997.997 0 0118 5v4.586zM15 5.414L14.586 5H8.414l-5 5V10l7 7 7-7V5.414l-2-2zM13 8a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                            </svg>
                            {item.name}
                          </td>
                          <td className="px-4 py-3">{item.manufacturer}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.quantity === 0 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.quantity} units
                            </span>
                          </td>
                          <td className="px-4 py-3">₹{item.price.toFixed(2)}</td>
                          <td className="px-4 py-3">{item.supplierName}</td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              min="0"
                              className="border rounded px-2 py-1 w-20 text-center"
                              defaultValue="0"
                              onChange={(e) => handleQuantityChange(item.drugId, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {selectedItems.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Order Summary</h3>
                    <div className="space-y-2">
                      {selectedItems.map(item => (
                        <div key={item.drugId} className="flex justify-between">
                          <span>{item.name} × {item.orderQuantity}</span>
                          <span>₹{(item.price * item.orderQuantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 font-medium flex justify-between">
                        <span>Total</span>
                        <span>₹{getTotalCost()}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={handleProceedToPayment}
                    disabled={selectedItems.length === 0}
                    className={`px-6 py-2 rounded text-white ${
                      selectedItems.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 mb-6">
                  <button 
                    onClick={goBackToOrder}
                    className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Payment Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h3 className="font-medium text-gray-700 mb-2">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        {selectedItems.map(item => (
                          <div key={item.drugId} className="flex justify-between">
                            <span>{item.name} × {item.orderQuantity}</span>
                            <span>₹{(item.price * item.orderQuantity).toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 font-bold flex justify-between text-lg">
                          <span>Total Amount</span>
                          <span>₹{getTotalCost()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="credit_card"
                              checked={paymentMethod === 'credit_card'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="mr-2"
                            />
                            <span>Credit/Debit Card</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="bank_transfer"
                              checked={paymentMethod === 'bank_transfer'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="mr-2"
                            />
                            <span>Bank Transfer</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {paymentMethod === 'credit_card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) => handlePaymentDataChange('cardNumber', formatCardNumber(e.target.value))}
                            className="w-full border rounded-lg px-3 py-2"
                            maxLength="19"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={paymentData.expiryDate}
                              onChange={(e) => handlePaymentDataChange('expiryDate', formatExpiryDate(e.target.value))}
                              className="w-full border rounded-lg px-3 py-2"
                              maxLength="5"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) => handlePaymentDataChange('cvv', e.target.value.replace(/\D/g, ''))}
                              className="w-full border rounded-lg px-3 py-2"
                              maxLength="4"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={paymentData.cardholderName}
                            onChange={(e) => handlePaymentDataChange('cardholderName', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                          />
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-700 mb-2">Billing Address</h4>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Street Address"
                              value={paymentData.billingAddress.street}
                              onChange={(e) => handlePaymentDataChange('billingAddress.street', e.target.value)}
                              className="w-full border rounded-lg px-3 py-2"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="City"
                                value={paymentData.billingAddress.city}
                                onChange={(e) => handlePaymentDataChange('billingAddress.city', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                              />
                              <input
                                type="text"
                                placeholder="State"
                                value={paymentData.billingAddress.state}
                                onChange={(e) => handlePaymentDataChange('billingAddress.state', e.target.value)}
                                className="border rounded-lg px-3 py-2"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="PIN Code"
                              value={paymentData.billingAddress.zipCode}
                              onChange={(e) => handlePaymentDataChange('billingAddress.zipCode', e.target.value)}
                              className="w-full border rounded-lg px-3 py-2"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'bank_transfer' && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Bank Transfer Instructions</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p><strong>Account Name:</strong> MedSupply Corp</p>
                          <p><strong>Account Number:</strong> 1234567890</p>
                          <p><strong>IFSC Code:</strong> HDFC0001234</p>
                          <p><strong>Reference:</strong> Order #{Math.floor(Math.random() * 10000)}</p>
                        </div>
                        <p className="text-sm text-blue-600 mt-3">
                          Please include the reference number in your transfer description.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t">
                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading || paymentLoading}
                    className={`px-6 py-3 rounded text-white font-medium ${
                      loading || paymentLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {loading || paymentLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {paymentLoading ? 'Processing Payment...' : 'Placing Order...'}
                  </span>
                ) : (
                  `Complete Order - $${getTotalCost()}`
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
  </div>
  );
}
