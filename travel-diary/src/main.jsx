import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import GetStarted from './pages/GetStarted.jsx'
import Destinations from './pages/Destinations.jsx'
import About from './pages/About.jsx'
import MyTrips from './pages/MyTrips.jsx'
import Wishlist from './pages/Wishlist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
