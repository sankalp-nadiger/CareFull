import React, { useState } from 'react';

const MOCK_SUPPLIERS = [
  { name: "ABC Pharmacy Supplies", email: "abc@example.com" },
  { name: "MedSource Inc", email: "medsource@example.com" },
  { name: "PharmaDirect", email: "contact@pharmadirect.com" },
  { name: "Global Med Supplies", email: "info@globalmedsupplies.com" }
];

const MOCK_DRUGS = [
  { name: "Amoxicillin", manufacturer: "Pfizer" },
  { name: "Lisinopril", manufacturer: "Merck" },
  { name: "Metformin", manufacturer: "Novartis" },
  { name: "Atorvastatin", manufacturer: "AstraZeneca" },
  { name: "Albuterol", manufacturer: "GSK" }
];

const PharmacistOnboardingStatic = () => {
  const [selectedDrug, setSelectedDrug] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');

  const handleSupplierChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSupplier(selectedValue);

    const supplier = MOCK_SUPPLIERS.find(s => s.email === selectedValue);
    if (supplier) {
      setSupplierName(supplier.name);
      setSupplierEmail(supplier.email);
    }
  };

  const handleDrugChange = (e) => {
    setSelectedDrug(e.target.value);
    // Reset supplier selection if drug changes
    setSelectedSupplier('');
    setSupplierName('');
    setSupplierEmail('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSupplier || !selectedDrug) {
      setError('Please complete all selections');
      return;
    }

    const [drugName, manufacturer] = selectedDrug.split('|');

    console.log('Form submission data:', {
      supplierName,
      supplierEmail,
      drugName,
      manufacturer
    });

    setSuccessMessage('Drug successfully added to inventory!');
    setSelectedSupplier('');
    setSelectedDrug('');
    setError(null);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#4a90e2',
          color: 'white',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Pharmacist Onboarding</h2>
          <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Please complete all steps to set up your inventory</p>
        </div>

        {error && (
          <div style={{
            margin: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '0.5rem' }}>⚠</span>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{
            margin: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '0.5rem' }}>✓</span>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Drug */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #eaeaea' }}>
            <h3 style={{ marginBottom: '1rem' }}>Step 1: Select Drug</h3>
            <label htmlFor="drug">Drug:</label>
            <select
              id="drug"
              value={selectedDrug}
              onChange={handleDrugChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                marginTop: '0.5rem'
              }}
            >
              <option value="">-- Select a Drug --</option>
              {MOCK_DRUGS.map((drug, index) => (
                <option key={index} value={`${drug.name}|${drug.manufacturer}`}>
                  {drug.name} (Manufacturer: {drug.manufacturer})
                </option>
              ))}
            </select>

            {selectedDrug && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                borderLeft: '3px solid #4a90e2'
              }}>
                <p><strong>Selected Drug:</strong> {selectedDrug.split('|')[0]}</p>
                <p><strong>Manufacturer:</strong> {selectedDrug.split('|')[1]}</p>
              </div>
            )}
          </div>

          {/* Step 2: Select Supplier */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #eaeaea' }}>
            <h3 style={{ marginBottom: '1rem' }}>Step 2: Select Supplier</h3>
            <label htmlFor="supplier">Supplier:</label>
            <select
              id="supplier"
              value={selectedSupplier}
              onChange={handleSupplierChange}
              required
              disabled={!selectedDrug}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: selectedDrug ? '#f9f9f9' : '#eee',
                marginTop: '0.5rem'
              }}
            >
              <option value="">-- Select a Supplier --</option>
              {MOCK_SUPPLIERS.map((supplier, index) => (
                <option key={index} value={supplier.email}>
                  {supplier.name} ({supplier.email})
                </option>
              ))}
            </select>

            {selectedSupplier && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                borderLeft: '3px solid #4a90e2'
              }}>
                <p><strong>Selected Supplier:</strong> {supplierName}</p>
                <p><strong>Email:</strong> {supplierEmail}</p>
              </div>
            )}
          </div>

          {/* Step 3: Submit */}
          <div style={{ padding: '1.5rem' }}>
            <h3>Step 3: Complete Onboarding</h3>
            <p>Click the button below to add the selected drug to your inventory</p>
            <button
              type="submit"
              disabled={!selectedSupplier || !selectedDrug}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: (!selectedSupplier || !selectedDrug) ? '#ccc' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: (!selectedSupplier || !selectedDrug) ? 'not-allowed' : 'pointer'
              }}
            >
              Save Selection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PharmacistOnboardingStatic;
