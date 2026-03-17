import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream text-navy overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
