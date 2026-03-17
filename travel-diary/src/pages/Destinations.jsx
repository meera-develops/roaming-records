import { useState, useEffect } from 'react'
import { DESTINATIONS, CONTINENTS } from '../data/destinations'
import { getWishlist, addToWishlist } from '../utils/storage'

export default function Destinations() {
  const [activeContinent, setActiveContinent] = useState('All')
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    setWishlist(getWishlist())
  }, [])

  const filtered = activeContinent === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.continent === activeContinent)

  const wishlistIds = new Set(wishlist.map(w => w.id))

  function handleAdd(dest) {
    addToWishlist({ id: dest.id, city: dest.city, country: dest.country, continent: dest.continent, emoji: dest.emoji })
    setWishlist(getWishlist())
  }

  return (
    <main className="w-full px-8 md:px-16 py-12">
      <h1 className="text-4xl font-extrabold text-navy mb-2">Explore Destinations</h1>
      <p className="text-navy/60 mb-8">Discover places around the world and build your wishlist.</p>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CONTINENTS.map(c => (
          <button
            key={c}
            onClick={() => setActiveContinent(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              activeContinent === c
                ? 'bg-orange text-white shadow-sm'
                : 'border-2 border-navy/20 hover:border-sky text-navy'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Destination cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map(dest => {
          const inWishlist = wishlistIds.has(dest.id)
          return (
            <div
              key={dest.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/80 flex flex-col items-center gap-2"
            >
              <span className="text-4xl">{dest.emoji}</span>
              <div className="text-center">
                <p className="font-bold text-navy">{dest.city}</p>
                <p className="text-sm text-navy/60">{dest.country}</p>
              </div>
              <button
                onClick={() => !inWishlist && handleAdd(dest)}
                disabled={inWishlist}
                className={`mt-auto text-sm font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  inWishlist
                    ? 'bg-teal/20 text-teal cursor-default'
                    : 'bg-orange hover:bg-[#e07030] text-white'
                }`}
              >
                {inWishlist ? '✓ In wishlist' : '+ Wishlist'}
              </button>
            </div>
          )
        })}
      </div>
    </main>
  )
}
