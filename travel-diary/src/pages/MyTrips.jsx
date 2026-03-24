import { useState, useEffect, useRef } from 'react'
import { getTrips, saveTrip, deleteTrip, getPrefs, setPrefs } from '../utils/storage'

const CONTINENTS = ['Asia', 'Europe', 'Americas', 'Africa', 'Oceania', 'Other']

function formatDate(str) {
  if (!str) return ''
  const [year, month, day] = str.split('-')
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`
}

const EMPTY_FORM = {
  city: '',
  country: '',
  continent: 'Asia',
  emoji: '',
  dateArrived: '',
  dateDeparted: '',
  notes: '',
  rating: 3,
}

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-2xl transition-colors cursor-pointer ${n <= value ? 'text-orange' : 'text-navy/20 dark:text-cream/20'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function TripCard({ trip, view, onEdit, onDelete }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < trip.rating ? '★' : '☆').join('')

  if (view === 'list') {
    return (
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/80 dark:border-white/10 flex items-center gap-4">
        <span className="text-3xl">{trip.emoji || '📍'}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-bold text-navy dark:text-cream text-lg">{trip.city}</span>
            <span className="text-navy/60 dark:text-cream/60 text-sm">{trip.country}</span>
            <span className="text-navy/40 dark:text-cream/40 text-xs">·</span>
            <span className="text-navy/60 dark:text-cream/60 text-xs">{formatDate(trip.dateArrived)}{trip.dateDeparted ? ` → ${formatDate(trip.dateDeparted)}` : ''}</span>
          </div>
          <div className="text-orange text-sm">{stars}</div>
          {trip.notes && <p className="text-navy/60 dark:text-cream/60 text-sm mt-1 truncate">{trip.notes}</p>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={onEdit} className="bg-teal hover:bg-[#25a99d] text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm cursor-pointer">
            Edit
          </button>
          <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/80 dark:border-white/10 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{trip.emoji || '📍'}</span>
        <span className="text-xs text-navy/40 dark:text-cream/40">{formatDate(trip.dateArrived)}{trip.dateDeparted ? ` → ${formatDate(trip.dateDeparted)}` : ''}</span>
      </div>
      <div>
        <p className="font-bold text-navy dark:text-cream text-lg leading-tight">{trip.city}</p>
        <p className="text-navy/60 dark:text-cream/60 text-sm">{trip.country}</p>
      </div>
      <div className="text-orange text-sm">{stars}</div>
      {trip.notes && <p className="text-navy/60 dark:text-cream/60 text-sm line-clamp-2">{trip.notes}</p>}
      <div className="flex gap-2 mt-auto pt-2">
        <button onClick={onEdit} className="bg-teal hover:bg-[#25a99d] text-white font-semibold px-4 py-2 rounded-full transition-colors text-sm cursor-pointer">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  )
}

export default function MyTrips() {
  const [trips, setTrips] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [view, setView] = useState(() => getPrefs().tripsView)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [dateError, setDateError] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    setTrips(getTrips())
  }, [])

  function refreshTrips() {
    setTrips(getTrips())
  }

  function handleViewToggle(v) {
    setView(v)
    setPrefs({ ...getPrefs(), tripsView: v })
  }

  function handleEdit(trip) {
    setFormData({
      city: trip.city,
      country: trip.country,
      continent: trip.continent,
      emoji: trip.emoji || '',
      dateArrived: trip.dateArrived,
      dateDeparted: trip.dateDeparted || '',
      notes: trip.notes || '',
      rating: trip.rating,
    })
    setEditingId(trip.id)
    setShowForm(true)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function handleDelete(id) {
    deleteTrip(id)
    refreshTrips()
  }

  function handleSubmit(e) {
    e.preventDefault()
    const today = new Date().toISOString().split('T')[0]
    if (formData.dateArrived > today) {
      setDateError('Arrival date cannot be in the future.')
      return
    }
    if (formData.dateDeparted && formData.dateDeparted < formData.dateArrived) {
      setDateError('Departure date cannot be before arrival date.')
      return
    }
    setDateError('')
    if (editingId) {
      const existing = trips.find(t => t.id === editingId)
      saveTrip({ ...existing, ...formData })
    } else {
      saveTrip({ id: crypto.randomUUID(), ...formData, createdAt: new Date().toISOString() })
    }
    setFormData(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
    setSearch('')
    refreshTrips()
  }

  function handleCancel() {
    setFormData(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
    setDateError('')
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }))
  }

  const displayed = trips
    .filter(t => t.id !== editingId)
    .filter(t => t.city.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.dateArrived) - new Date(a.dateArrived)
      if (sort === 'oldest') return new Date(a.dateArrived) - new Date(b.dateArrived)
      if (sort === 'az')     return a.city.localeCompare(b.city)
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <main className="w-full px-8 md:px-16 py-12">
      <h1 className="text-4xl font-extrabold text-navy dark:text-cream mb-2">My Trips</h1>
      <p className="text-navy/60 dark:text-cream/60 mb-8">Your personal travel diary — every journey recorded.</p>

      {/* Controls bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-stretch md:items-center">
        <input
          type="text"
          placeholder="Search by city…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full md:w-64"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full md:w-48 cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A–Z</option>
          <option value="rating">Rating ↓</option>
        </select>

        {/* View toggle */}
        <div className="flex gap-1 border border-navy/20 dark:border-cream/20 rounded-xl p-1 bg-white dark:bg-dark-surface self-start md:self-auto">
          <button
            onClick={() => handleViewToggle('grid')}
            title="Grid view"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${view === 'grid' ? 'bg-orange text-white' : 'text-navy/50 dark:text-cream/50 hover:text-navy dark:hover:text-cream'}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="6" height="6" rx="1" />
              <rect x="10" y="0" width="6" height="6" rx="1" />
              <rect x="0" y="10" width="6" height="6" rx="1" />
              <rect x="10" y="10" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => handleViewToggle('list')}
            title="List view"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${view === 'list' ? 'bg-orange text-white' : 'text-navy/50 dark:text-cream/50 hover:text-navy dark:hover:text-cream'}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="1" width="16" height="3" rx="1" />
              <rect x="0" y="7" width="16" height="3" rx="1" />
              <rect x="0" y="13" width="16" height="3" rx="1" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => { setShowForm(s => !s); setEditingId(null); setFormData(EMPTY_FORM) }}
          className="bg-sky hover:bg-[#1a55e0] text-white font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer md:ml-auto"
        >
          {showForm && !editingId ? 'Cancel' : '+ Add Trip'}
        </button>
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div ref={formRef} className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/80 dark:border-white/10 mb-8">
          <h2 className="text-xl font-extrabold text-navy dark:text-cream mb-4">{editingId ? 'Edit Trip' : 'New Trip'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">City *</label>
              <input required name="city" value={formData.city} onChange={handleChange}
                className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">Country *</label>
              <input required name="country" value={formData.country} onChange={handleChange}
                className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">Continent *</label>
              <select required name="continent" value={formData.continent} onChange={handleChange}
                className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full cursor-pointer">
                {CONTINENTS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">Emoji <span className="text-navy/40 dark:text-cream/40 font-normal">(optional)</span></label>
              <input name="emoji" value={formData.emoji} onChange={handleChange} placeholder="e.g. 🗼"
                className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">Date Arrived *</label>
              <input required type="date" name="dateArrived" value={formData.dateArrived} onChange={handleChange}
                className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">Date Departed <span className="text-navy/40 dark:text-cream/40 font-normal">(optional)</span></label>
              <input type="date" name="dateDeparted" value={formData.dateDeparted} onChange={handleChange}
                className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full" />
            </div>
            {dateError && (
              <p className="md:col-span-2 text-red-500 text-sm font-medium">{dateError}</p>
            )}
            <div>
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">Rating</label>
              <StarRating value={formData.rating} onChange={v => setFormData(prev => ({ ...prev, rating: v }))} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-navy dark:text-cream mb-1">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Memories, highlights, tips…"
                className="border border-navy/20 dark:border-cream/20 rounded-xl px-4 py-2.5 bg-white dark:bg-dark-surface text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-sky w-full resize-none" />
            </div>
            <div className="md:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={handleCancel}
                className="border-2 border-navy/20 dark:border-cream/20 hover:border-sky text-navy dark:text-cream font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="submit"
                className="bg-orange hover:bg-[#e07030] text-white font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer">
                {editingId ? 'Save Changes' : 'Add Trip'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trips list / grid */}
      {displayed.length === 0 ? (
        <div className="text-center py-20 text-navy/40 dark:text-cream/40">
          <p className="text-5xl mb-4">🗺️</p>
          <p className="text-lg font-semibold">
            {search ? `No trips found for "${search}"` : 'No trips yet. Add your first one!'}
          </p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map(trip => (
            <TripCard key={trip.id} trip={trip} view="grid"
              onEdit={() => handleEdit(trip)}
              onDelete={() => handleDelete(trip.id)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map(trip => (
            <TripCard key={trip.id} trip={trip} view="list"
              onEdit={() => handleEdit(trip)}
              onDelete={() => handleDelete(trip.id)} />
          ))}
        </div>
      )}
    </main>
  )
}
