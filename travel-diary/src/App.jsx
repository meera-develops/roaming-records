import './App.css'

/* ── Decorative vinyl disc ── */
function Vinyl({ size = 120, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      {/* Outer groove ring */}
      <circle cx="60" cy="60" r="58" fill="#1E2A44" />
      <circle cx="60" cy="60" r="54" fill="none" stroke="#2a3a5c" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="#2a3a5c" strokeWidth="1" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#2a3a5c" strokeWidth="1" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#2a3a5c" strokeWidth="1" />
      {/* Label */}
      <circle cx="60" cy="60" r="22" fill="#FF8A3D" />
      <circle cx="60" cy="60" r="16" fill="#e07030" />
      <text x="60" y="56" textAnchor="middle" fill="#FFF6EE" fontSize="6" fontWeight="bold">ROAMING</text>
      <text x="60" y="65" textAnchor="middle" fill="#FFF6EE" fontSize="6" fontWeight="bold">RECORDS</text>
      {/* Center hole */}
      <circle cx="60" cy="60" r="4" fill="#1E2A44" />
    </svg>
  )
}

/* ── Dotted flight path SVG ── */
function FlightPath({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 120"
      className={`w-full ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M 0 90 Q 150 20 300 60 Q 450 100 600 30"
        fill="none"
        stroke="#2F6BFF"
        strokeWidth="2"
        strokeDasharray="8 6"
        className="animate-dash"
        style={{ strokeDashoffset: 0 }}
      />
      {/* Airplane icon at midpoint */}
      <g transform="translate(280, 52) rotate(-10)">
        <text fontSize="20" fill="#FF8A3D">✈</text>
      </g>
      {/* Destination pins */}
      <circle cx="0" cy="90" r="5" fill="#2EC4B6" />
      <circle cx="300" cy="60" r="5" fill="#FF8A3D" />
      <circle cx="600" cy="30" r="5" fill="#2EC4B6" />
    </svg>
  )
}

/* ── Feature card ── */
function FeatureCard({ icon, title, desc, delay = '0ms' }) {
  return (
    <div
      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/80 flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: delay, opacity: 0 }}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold text-[#1E2A44]">{title}</h3>
      <p className="text-[#1E2A44]/70 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}


export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF6EE] text-[#1E2A44] overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#FFF6EE]/90 backdrop-blur-md border-b border-[#1E2A44]/10 px-8 md:px-16 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Vinyl size={36} className="animate-spin-slow" />
            <span className="text-xl font-extrabold tracking-tight text-[#1E2A44]">
              Roaming <span className="text-[#FF8A3D]">Records</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1E2A44]/70">
            <a href="#features" className="hover:text-[#FF8A3D] transition-colors">Features</a>
            <a href="#destinations" className="hover:text-[#FF8A3D] transition-colors">Destinations</a>
            <a href="#about" className="hover:text-[#FF8A3D] transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-sm font-medium text-[#1E2A44] hover:text-[#2F6BFF] transition-colors cursor-pointer">
              Sign In
            </button>
            <button className="bg-[#FF8A3D] hover:bg-[#e07030] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative w-full px-8 md:px-16 pt-20 pb-12 md:pt-28 md:pb-16 flex flex-col md:flex-row items-center gap-12">
        {/* Hero text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#2F6BFF]/10 text-[#2F6BFF] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            ✈ Your travel story, on vinyl
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-[#1E2A44]">
            Every trip is
            <span className="block text-[#FF8A3D]">a new track.</span>
          </h1>
          <p className="text-lg text-[#1E2A44]/65 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Log your adventures, curate your wishlist, and discover the world — all in one place.
            Roaming Records is the travel diary with a groove.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-[#FF8A3D] hover:bg-[#e07030] text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-md text-base">
              Start Your Journey
            </button>
            <button className="border-2 border-[#1E2A44]/20 hover:border-[#2F6BFF] text-[#1E2A44] font-semibold px-8 py-4 rounded-full transition-colors text-base">
              Explore Destinations
            </button>
          </div>
        </div>

        {/* Hero vinyl art */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative">
            <Vinyl size={280} className="animate-spin-slow drop-shadow-2xl" />
            {/* Floating badges */}
            <div className="absolute -top-4 -right-6 bg-white rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-[#1E2A44] animate-float">
              📍 Tokyo added!
            </div>
            <div className="absolute -bottom-2 -left-8 bg-[#2F6BFF] rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-white animate-float" style={{ animationDelay: '1.5s' }}>
              ✅ Paris logged
            </div>
            <div className="absolute top-1/2 -right-12 bg-[#2EC4B6] rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-white animate-float" style={{ animationDelay: '0.8s' }}>
              🌍 12 countries
            </div>
          </div>
        </div>
      </section>

      {/* ── FLIGHT PATH DIVIDER ── */}
      <div className="py-2 opacity-60">
        <FlightPath />
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="w-full px-8 md:px-16 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#1E2A44] mb-4">
            Drop the needle on your next adventure
          </h2>
          <p className="text-[#1E2A44]/60 max-w-xl mx-auto">
            Everything you need to document, plan, and share your travels — pressed into one beautifully simple app.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon="📖"
            title="Travel Log"
            desc="Record past trips with photos, notes, dates, and memories. Your personal travel journal, always at hand."
            delay="0ms"
          />
          <FeatureCard
            icon="🗺️"
            title="Wishlist"
            desc="Curate the destinations on your bucket list. Plan future trips and keep track of places you dream of visiting."
            delay="100ms"
          />
          <FeatureCard
            icon="🔐"
            title="User Profiles"
            desc="Create an account to save your cities, connect with fellow travelers, and take your diary anywhere."
            delay="200ms"
          />
          <FeatureCard
            icon="🌍"
            title="Filter by Continent"
            desc="Browse and organize destinations by continent. Find inspiration from every corner of the globe."
            delay="300ms"
          />
        </div>
      </section>

      {/* ── DESTINATIONS SHOWCASE ── */}
      <section id="destinations" className="bg-[#1E2A44] py-20">
        <div className="w-full px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-[#FFF6EE] mb-4">
                Discover popular <span className="text-[#FF8A3D]">destinations</span>
              </h2>
              <p className="text-[#FFF6EE]/60 mb-8 max-w-md mx-auto md:mx-0">
                Explore a curated collection of the world's most loved cities and landmarks.
                Filter by continent and add any destination straight to your wishlist.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {[
                  { name: 'Europe', emoji: '🏰' },
                  { name: 'Asia', emoji: '🏯' },
                  { name: 'Americas', emoji: '🗽' },
                  { name: 'Africa', emoji: '🦁' },
                  { name: 'Oceania', emoji: '🦘' },
                ].map(c => (
                  <button
                    key={c.name}
                    className="inline-flex items-center gap-2 border border-[#FFF6EE]/20 hover:border-[#FF8A3D] hover:text-[#FF8A3D] text-[#FFF6EE]/70 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination cards grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {[
                { city: 'Tokyo', country: 'Japan', emoji: '🗼', color: '#FF8A3D' },
                { city: 'Paris', country: 'France', emoji: '🗼', color: '#2F6BFF' },
                { city: 'Nairobi', country: 'Kenya', emoji: '🌅', color: '#2EC4B6' },
                { city: 'New York', country: 'USA', emoji: '🗽', color: '#FF8A3D' },
              ].map(d => (
                <div
                  key={d.city}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 cursor-pointer transition-colors group"
                >
                  <div className="text-3xl mb-2">{d.emoji}</div>
                  <div className="font-bold text-[#FFF6EE] text-sm">{d.city}</div>
                  <div className="text-[#FFF6EE]/50 text-xs">{d.country}</div>
                  <button
                    className="mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: d.color }}
                  >
                    + Add to wishlist
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second flight path in navy section */}
        <div className="mt-12 opacity-30">
          <FlightPath className="text-[#FFF6EE]" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="about" className="w-full px-8 md:px-16 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#1E2A44] mb-4">How it works</h2>
          <p className="text-[#1E2A44]/60 max-w-md mx-auto">Simple enough to use mid-trip, powerful enough to capture every detail.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-[#FF8A3D] to-[#2F6BFF]" />

          {[
            { step: '01', icon: '🔐', title: 'Create your profile', desc: 'Sign up in seconds and set up your traveler identity.' },
            { step: '02', icon: '📍', title: 'Log your trips', desc: 'Add past adventures or pin new places to your wishlist.' },
            { step: '03', icon: '🌐', title: 'Explore & connect', desc: 'Discover popular destinations and connect with other explorers.' },
          ].map(s => (
            <div key={s.step} className="flex flex-col items-center text-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#FF8A3D]/10 flex items-center justify-center text-3xl">
                  {s.icon}
                </div>
                <span className="absolute -top-1 -right-1 bg-[#FF8A3D] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {s.step.slice(1)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1E2A44]">{s.title}</h3>
              <p className="text-[#1E2A44]/60 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-[#2F6BFF] to-[#1E2A44] py-24 px-8 md:px-16">
        <div className="text-center flex flex-col items-center gap-8">
          <Vinyl size={80} className="animate-spin-slow opacity-80" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FFF6EE] leading-tight">
            Ready to press <span className="text-[#FF8A3D]">play</span> on your next trip?
          </h2>
          <p className="text-[#FFF6EE]/65 max-w-lg">
            Join Roaming Records and start documenting the soundtrack of your travels today.
          </p>
          <button className="bg-[#FF8A3D] hover:bg-[#e07030] text-white font-bold px-10 py-4 rounded-full text-lg transition-colors shadow-xl">
            Create Free Account
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1E2A44] text-[#FFF6EE]/50 py-10 px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 font-semibold text-[#FFF6EE]">
            <Vinyl size={24} />
            <span>Roaming Records</span>
          </div>
          <p>Built with React &amp; Tailwind CSS · Fictious website created for class</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FF8A3D] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#FF8A3D] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#FF8A3D] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
