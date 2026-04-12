import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Vinyl from './Vinyl'
import { useDarkMode } from '../context/DarkModeContext'
import { useAuth } from '../context/AuthContext'
import { MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

function DarkModeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={dark}
      className="relative inline-flex items-center w-11 h-6 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none"
      style={{ backgroundColor: dark ? '#2F6BFF' : '#d1d5db' }}
    >
      <span
        className="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
        style={{ transform: dark ? 'translateX(1.375rem)' : 'translateX(0.125rem)' }}
      >
        <MoonIcon className={`w-3 h-3 ${dark ? 'text-sky' : 'text-navy/50'}`} />
      </span>
    </button>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const { dark, toggle } = useDarkMode()
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/')
  }
  const [menuOpen, setMenuOpen] = useState(false)

  function navTo(path) {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-navy/10 dark:border-cream/10 px-8 md:px-16 py-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <Vinyl size={36} className="animate-spin-slow" />
          <span className="text-xl font-extrabold tracking-tight text-navy dark:text-cream">
            Roaming <span className="text-orange">Records</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/70 dark:text-cream/70">
          <button onClick={() => navigate('/destinations')} className="hover:text-orange transition-colors cursor-pointer">Destinations</button>
          <button onClick={() => navigate('/my-trips')} className="hover:text-orange transition-colors cursor-pointer">My Trips</button>
          <button onClick={() => navigate('/wishlist')} className="hover:text-orange transition-colors cursor-pointer">Wishlist</button>
          <DarkModeToggle dark={dark} onToggle={toggle} />
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-navy/50 dark:text-cream/50">{currentUser.displayName || currentUser.email}</span>
              <button onClick={handleLogout} className="bg-sky hover:bg-[#1a55e0] text-white text-md font-semibold px-6 py-1.5 rounded-lg transition-colors cursor-pointer">
                Log Out
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-sky hover:bg-[#1a55e0] text-white text-md font-semibold px-6 py-1.5 rounded-lg transition-colors cursor-pointer">
              Log In
            </button>
          )}
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <DarkModeToggle dark={dark} onToggle={toggle} />
          <button onClick={() => setMenuOpen(o => !o)} className="text-navy dark:text-cream cursor-pointer">
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 pt-4 pb-2 text-sm font-medium text-navy/80 dark:text-cream/80">
          <button onClick={() => navTo('/destinations')} className="text-left hover:text-orange transition-colors cursor-pointer">Destinations</button>
          <button onClick={() => navTo('/my-trips')} className="text-left hover:text-orange transition-colors cursor-pointer">My Trips</button>
          <button onClick={() => navTo('/wishlist')} className="text-left hover:text-orange transition-colors cursor-pointer">Wishlist</button>
          {currentUser ? (
            <>
              <span className="text-xs text-navy/50 dark:text-cream/50">{currentUser.displayName || currentUser.email}</span>
              <button onClick={handleLogout} className="self-start bg-sky hover:bg-[#1a55e0] text-white font-semibold px-6 py-1.5 rounded-lg transition-colors cursor-pointer">Log Out</button>
            </>
          ) : (
            <button onClick={() => navTo('/login')} className="self-start bg-sky hover:bg-[#1a55e0] text-white font-semibold px-6 py-1.5 rounded-lg transition-colors cursor-pointer">Log In</button>
          )}
        </div>
      )}
    </nav>
  )
}
