import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import './index.css'
import MessSetup from './pages/MessSetup.jsx'
import MessLogs from './pages/MessLogs.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mess-setup" element={<MessSetup />} />
        <Route path="/logs" element={<MessLogs />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>

)
