import { useNavigate } from 'react-router-dom'
import Vinyl from './Vinyl'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-navy/10 px-8 md:px-16 py-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <Vinyl size={36} className="animate-spin-slow" />
          <span className="text-xl font-extrabold tracking-tight text-navy">
            Roaming <span className="text-orange">Records</span>
          </span>
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-navy/70">
          <a href="#features" className="hover:text-orange transition-colors">Features</a>
          <button onClick={() => navigate('/destinations')} className="hover:text-orange transition-colors cursor-pointer">Destinations</button>
          <button onClick={() => navigate('/about')} className="hover:text-orange transition-colors cursor-pointer">About</button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/sign-in')} className="hidden sm:block text-sm font-medium text-navy hover:text-sky transition-colors cursor-pointer">
            Sign In
          </button>
          <button onClick={() => navigate('/get-started')} className="bg-orange hover:bg-[#e07030] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}
