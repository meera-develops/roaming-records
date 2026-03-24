import { useNavigate } from 'react-router-dom'
import Vinyl from './Vinyl'
import { useDarkMode } from '../context/DarkModeContext'
import { MoonIcon } from '@heroicons/react/24/solid'

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

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-navy/10 dark:border-cream/10 px-8 md:px-16 py-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <Vinyl size={36} className="animate-spin-slow" />
          <span className="text-xl font-extrabold tracking-tight text-navy dark:text-cream">
            Roaming <span className="text-orange">Records</span>
          </span>
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/70 dark:text-cream/70">
          <button onClick={() => navigate('/destinations')} className="hover:text-orange transition-colors cursor-pointer">Destinations</button>
          <button onClick={() => navigate('/my-trips')} className="hover:text-orange transition-colors cursor-pointer">My Trips</button>
          <button onClick={() => navigate('/wishlist')} className="hover:text-orange transition-colors cursor-pointer">Wishlist</button>
          {/* <button onClick={() => navigate('/about')} className="hover:text-orange transition-colors cursor-pointer">About</button> */}
          <DarkModeToggle dark={dark} onToggle={toggle} />
        </div>
        {/* <div className="flex items-center gap-3">
          <button onClick={() => navigate('/sign-in')} className="hidden sm:block text-sm font-medium text-navy dark:text-cream hover:text-sky transition-colors cursor-pointer">
            Sign In
          </button>
          <button onClick={() => navigate('/get-started')} className="bg-orange hover:bg-[#e07030] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer">
            Get Started
          </button>
        </div> */}
      </div>
    </nav>
  )
}
