import { useState } from 'react'
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PharmacistOnboardingStatic from './components/Onboarding'
import DeepSeekChat from './components/Sample'
import LowStockManagement from './components/Inventory'
import PharmacyReorderPage from './components/order'
import PharmacyRegistration from './components/PharmacyRegister'
import PharmacyLogin from './components/PharmacyLogin'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/ParentDashboard" element={<ParentDashboard />} /> */}
        <Route path="/Onboarding" element={<PharmacistOnboardingStatic/>}/>
        <Route path="/deepseek" element={<DeepSeekChat/>}/>
        <Route path="/inventory" element={<LowStockManagement/>}/>
        <Route path="/Reorder" element={<PharmacyReorderPage/>}/>
        <Route path="/register" element={<PharmacyRegistration/>}/>
        <Route path="/login" element={<PharmacyLogin/>}/>

        </Routes>
        </Router>
      </>
    )
}

export default App
