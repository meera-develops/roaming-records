import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-cream dark:bg-dark-bg text-navy dark:text-cream overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  )
}
