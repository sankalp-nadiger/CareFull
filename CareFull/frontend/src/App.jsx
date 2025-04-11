import { useState } from 'react'
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PharmacistOnboardingStatic from './components/Onboarding'
import DeepSeekChat from './components/Sample'
import LowStockManagement from './components/Inventory'
import PharmacyReorderPage from './components/order'
import PharmacyRegistration from './components/PharmacyRegister'
import PharmacyLogin from './components/PharmacyLogin'
import VolunteerAuth from './components/Volunteer'
import SignIn from './pages/UserSignin'
import SignUp from './pages/UserSignup'
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
        <Route path="/Volunteer" element={<VolunteerAuth/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        </Routes>
        </Router>
      </>
    )
}

export default App
