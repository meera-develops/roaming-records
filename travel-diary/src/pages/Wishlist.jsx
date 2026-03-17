import { useState, useEffect } from 'react'
import { getWishlist, removeFromWishlist } from '../utils/storage'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    setWishlist(getWishlist())
  }, [])

  function handleRemove(id) {
    removeFromWishlist(id)
    setWishlist(getWishlist())
  }

  return (
    <main className="w-full px-8 md:px-16 py-12">
      <h1 className="text-4xl font-extrabold text-navy mb-2">My Wishlist</h1>
      <p className="text-navy/60 mb-8">Places you want to visit someday</p>

      {wishlist.length === 0 ? (
        <p className="text-navy/40 text-lg">Your wishlist is empty. Head to <a href="/destinations" className="text-orange hover:underline">Destinations</a> to add some!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map(item => (
            <div
              key={item.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/80 flex flex-col items-center gap-2"
            >
              <span className="text-4xl">{item.emoji}</span>
              <div className="text-center">
                <p className="font-bold text-navy">{item.city}</p>
                <p className="text-sm text-navy/60">{item.country}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="mt-auto text-red-500 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
