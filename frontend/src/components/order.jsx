import { useState, useEffect } from 'react';

export default function PharmacyReorderPage() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [pharmacyId, setPharmacyId] = useState('pharm123'); // Would come from auth context in real app
  
  useEffect(() => {
    // Fetch low stock items
    const fetchLowStockItems = async () => {
      try {
        setLoading(true);
        // This would be your actual API endpoint
        // const response = await fetch(`/api/inventory/low-stock/${pharmacyId}`);
        // const data = await response.json();
        
        // Simulating API response
        const data = {
          lowStockItems: [
            { drugId: '1001', name: 'Amoxicillin', manufacturer: 'Pfizer', quantity: 3, price: 12.99, lowStockThreshold: 5, supplierName: 'MedSupply Inc.' },
            { drugId: '1002', name: 'Lisinopril', manufacturer: 'Novartis', quantity: 2, price: 8.50, lowStockThreshold: 5, supplierName: 'PharmaDist' },
            { drugId: '1003', name: 'Metformin', manufacturer: 'Merck', quantity: 0, price: 15.75, lowStockThreshold: 5, supplierName: 'MedSupply Inc.' },
            { drugId: '1004', name: 'Simvastatin', manufacturer: 'AstraZeneca', quantity: 4, price: 22.30, lowStockThreshold: 10, supplierName: 'GlobalMeds' }
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
    
    // If the item doesn't exist in selectedItems yet, add it
    if (!updatedItems.some(item => item.drugId === drugId)) {
      const itemToAdd = lowStockItems.find(item => item.drugId === drugId);
      updatedItems.push({ ...itemToAdd, orderQuantity: parseInt(quantity) || 0 });
    }
    
    // Filter out items with quantity 0
    setSelectedItems(updatedItems.filter(item => item.orderQuantity > 0));
  };
  
  const handleSubmitOrder = async () => {
    if (selectedItems.length === 0) {
      setOrderStatus({ type: 'error', message: 'Please select at least one item to order' });
      return;
    }
    
    try {
      setLoading(true);
      
      // This would be your actual API call
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     pharmacyId,
      //     items: selectedItems.map(item => ({
      //       drugId: item.drugId,
      //       quantity: item.orderQuantity
      //     }))
      //   })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrderStatus({ 
        type: 'success', 
        message: `Order placed successfully! Order #ORD-${Math.floor(Math.random() * 10000)}` 
      });
      
      // Clear selected items after successful order
      setSelectedItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus({ type: 'error', message: 'Failed to place order. Please try again.' });
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

  if (loading && lowStockItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
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
                Enter the quantity for each item you want to reorder. The system will automatically place orders with the respective suppliers.
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
                  <td className="px-4 py-3">${item.price.toFixed(2)}</td>
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
                  <span>${(item.price * item.orderQuantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 font-medium flex justify-between">
                <span>Total</span>
                <span>${getTotalCost()}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmitOrder}
            disabled={loading || selectedItems.length === 0}
            className={`px-4 py-2 rounded text-white ${
              loading || selectedItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}