import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { DarkModeProvider } from './context/DarkModeContext.jsx'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import App from './App.jsx'
import Destinations from './pages/Destinations.jsx'
import MyTrips from './pages/MyTrips.jsx'
import Wishlist from './pages/Wishlist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>,
)
