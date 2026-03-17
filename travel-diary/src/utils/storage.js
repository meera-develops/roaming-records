const KEYS = {
  TRIPS:    'rr_trips',
  WISHLIST: 'rr_wishlist',
  PREFS:    'rr_prefs',
}

function get(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function remove(key) {
  localStorage.removeItem(key)
}

export function getTrips() {
  return get(KEYS.TRIPS) ?? []
}

export function saveTrip(trip) {
  const trips = getTrips()
  const index = trips.findIndex(t => t.id === trip.id)
  if (index === -1) {
    set(KEYS.TRIPS, [...trips, trip])
  } else {
    const updated = [...trips]
    updated[index] = trip
    set(KEYS.TRIPS, updated)
  }
}

export function deleteTrip(id) {
  set(KEYS.TRIPS, getTrips().filter(t => t.id !== id))
}

export function getWishlist() {
  return get(KEYS.WISHLIST) ?? []
}

export function addToWishlist(item) {
  const list = getWishlist()
  if (!list.find(w => w.id === item.id)) {
    set(KEYS.WISHLIST, [...list, item])
  }
}

export function removeFromWishlist(id) {
  set(KEYS.WISHLIST, getWishlist().filter(w => w.id !== id))
}

export function getPrefs() {
  return get(KEYS.PREFS) ?? { tripsView: 'grid' }
}

export function setPrefs(prefs) {
  set(KEYS.PREFS, prefs)
}
