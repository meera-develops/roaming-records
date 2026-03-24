import './App.css'
import { useNavigate } from 'react-router-dom'
import Vinyl from './components/Vinyl'
import { addToWishlist } from './utils/storage'

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
      className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/80 dark:border-white/10 flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: delay, opacity: 0 }}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold text-navy dark:text-cream">{title}</h3>
      <p className="text-navy/70 dark:text-cream/60 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}


export default function App() {
  const navigate = useNavigate()
  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative w-full px-8 md:px-16 pt-20 pb-12 md:pt-28 md:pb-16 flex flex-col md:flex-row items-center gap-12">
        {/* Hero text */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-sky/10 dark:bg-sky/25 text-sky dark:text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            ✈ Your travel story, on vinyl
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-navy dark:text-cream">
            Every trip is
            <span className="block text-orange">a new track.</span>
          </h1>
          <p className="text-lg text-navy/65 dark:text-cream/65 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Log your adventures, curate your wishlist, and discover the world — all in one place.
            Roaming Records is the travel diary with a groove.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={() => navigate('/my-trips')} className="bg-orange hover:bg-[#e07030] text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-md cursor-pointer text-base">
              Log your Journeys
            </button>
            <button onClick={() => navigate('/destinations')} className="border-2 border-navy/20 dark:border-cream/20 hover:border-sky text-navy dark:text-cream font-semibold px-8 py-4 rounded-full cursor-pointer transition-colors text-base">
              Explore Destinations
            </button>
          </div>
        </div>

        {/* Hero vinyl art */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="relative">
            <Vinyl size={280} className="animate-spin-slow drop-shadow-2xl" />
            {/* Floating badges */}
            <div className="absolute -top-4 -right-6 bg-white dark:bg-dark-surface rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-navy dark:text-cream animate-float">
              📍 Tokyo added!
            </div>
            <div className="absolute -bottom-2 -left-8 bg-sky rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-white animate-float" style={{ animationDelay: '1.5s' }}>
              ✅ Paris logged
            </div>
            <div className="absolute top-1/2 -right-12 bg-teal rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-white animate-float" style={{ animationDelay: '0.8s' }}>
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
          <h2 className="text-4xl font-extrabold text-navy dark:text-cream mb-4">
            Drop the needle on your next adventure
          </h2>
          <p className="text-navy/60 dark:text-cream/60 max-w-xl mx-auto">
            Everything you need to document, plan, and share your travels — pressed into one beautifully simple app.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          <FeatureCard
            icon="📖"
            title="Travel Log"
            desc="Record past trips with notes, dates, and memories. Your personal travel journal, always at hand."
            delay="0ms"
          />
          <FeatureCard
            icon="🗺️"
            title="Wishlist"
            desc="Curate the destinations on your bucket list. Plan future trips and keep track of places you dream of visiting."
            delay="100ms"
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
      <section id="destinations" className="bg-navy py-20">
        <div className="w-full px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-extrabold text-cream mb-4">
                Discover popular <span className="text-orange">destinations</span>
              </h2>
              <p className="text-cream/60 mb-8 max-w-md mx-auto md:mx-0">
                Explore a curated collection of the world's most loved cities and landmarks.
                Filter by continent and add any destination straight to your wishlist.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {[
                  { name: 'Europe', emoji: '🏰' },
                  { name: 'Asia', emoji: '🏯' },
                  { name: 'Americas', emoji: '🗽' },
                  { name: 'Africa', emoji: '🦁' },
                  { name: 'Australia', emoji: '🦘' },
                ].map(c => (
                  <button
                    key={c.name}
                    onClick={() => navigate('/destinations', { state: { continent: c.name } })}
                    className="inline-flex items-center gap-2 border border-cream/20 hover:border-orange hover:text-orange text-cream/70 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
                  >
                    {c.emoji} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination cards grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {[
                { id: 'd1',  city: 'Tokyo',    country: 'Japan',   continent: 'Asia',     emoji: '🗼', color: '#FF8A3D' },
                { id: 'd5',  city: 'Paris',    country: 'France',  continent: 'Europe',   emoji: '🗼', color: '#2EC4B6' },
                { id: 'd13', city: 'Nairobi',  country: 'Kenya',   continent: 'Africa',   emoji: '🦁', color: '#2EC4B6' },
                { id: 'd9',  city: 'New York', country: 'USA',     continent: 'Americas', emoji: '🗽', color: '#FF8A3D' },
              ].map(d => (
                <div
                  key={d.city}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 cursor-pointer transition-colors group"
                >
                  <div className="text-3xl mb-2">{d.emoji}</div>
                  <div className="font-bold text-cream text-sm">{d.city}</div>
                  <div className="text-cream/50 text-xs">{d.country}</div>
                  <button
                    onClick={() => { addToWishlist({ id: d.id, city: d.city, country: d.country, continent: d.continent, emoji: d.emoji }); navigate('/wishlist') }}
                    className="mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
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
          <FlightPath className="text-cream" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="about" className="w-full px-8 md:px-16 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-navy dark:text-cream mb-4">How it works</h2>
          <p className="text-navy/60 dark:text-cream/60 max-w-md mx-auto">Simple enough to use mid-trip, powerful enough to capture every detail.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-linear-to-r from-orange to-sky" />

          {[
            { step: '01', icon: '🌍', title: 'Explore Destinations', desc: 'Browse curated destinations from around the world.' },
            { step: '02', icon: '📍', title: 'Log your trips', desc: 'Add past adventures and document your travel memories.' },
            { step: '03', icon: '✈️', title: 'Build your Wishlist', desc: 'Pin places you want to visit and plan future trips.' },
          ].map(s => (
            <div key={s.step} className="flex flex-col items-center text-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center text-3xl">
                  {s.icon}
                </div>
                <span className="absolute -top-1 -right-1 bg-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {s.step.slice(1)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-navy dark:text-cream">{s.title}</h3>
              <p className="text-navy/60 dark:text-cream/60 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-linear-to-br from-sky to-navy py-24 px-8 md:px-16">
        <div className="text-center flex flex-col items-center gap-8">
          <Vinyl size={80} className="animate-spin-slow opacity-80" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-cream leading-tight">
            Ready to press <span className="text-orange">play</span> on your next trip?
          </h2>
          <p className="text-cream/65 max-w-lg">
            Use Roaming Records to start documenting the soundtrack of your travels today.
          </p>
          <button onClick={() => navigate('/destinations')} className="bg-orange hover:bg-[#e07030] text-white font-bold px-10 py-4 rounded-full text-lg transition-colors cursor-pointer shadow-xl">
            Explore Destinations
          </button>
        </div>
      </section>


    </div>
  )
}
