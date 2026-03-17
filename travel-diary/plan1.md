# Roaming Records — Implementation Plan

## Project Context

- **App name:** Roaming Records — a vinyl-themed travel diary
- **Stack:** React 19, React Router v7, Tailwind CSS v4, Vite
- **Root:** `travel-diary/` (all paths below are relative to this)
- **Theme colors** (defined in `src/index.css`):
  - `orange` → `#FF8A3D`
  - `sky` → `#2F6BFF`
  - `cream` → `#FFF6EE`
  - `navy` → `#1E2A44`
  - `teal` → `#2EC4B6`
- **Existing animations** (use freely): `animate-spin-slow`, `animate-float`, `animate-fade-in-up`, `animate-dash`
- **Existing reusable components:** `<Vinyl />` (SVG vinyl record), `<Navbar />`, `<Footer />`, `<Layout />`
- The home page (`src/App.jsx`) is fully designed — do not touch it.
- `src/pages/GetStarted.jsx` and `src/pages/SignIn.jsx` exist as stubs — leave them as stubs for now (auth is a future bonus feature).

---

## Project Requirements

1. **localStorage** — data survives page refresh, CRUD operations, structured data (not one giant string), helper that wraps `getItem`/`setItem` with JSON parsing.
2. **4–5 core features** — Ex: create/edit/delete items, search or filter, display dynamic content, user preferences, sorting.
3. **Responsive** — must work on mobile and desktop.

---

## What to Build

### Feature List (hits all 5)

| # | Feature | Where |
|---|---------|-------|
| 1 | Create / Edit / Delete trips | `/my-trips` |
| 2 | Search trips by city name | `/my-trips` |
| 3 | Sort trips (by date, A–Z, rating) | `/my-trips` |
| 4 | Filter destinations by continent | `/destinations` |
| 5 | User preference: grid vs. list view | `/my-trips` (saved to localStorage) |

---

## Files to Create or Modify

### 1. `src/utils/storage.js` — **CREATE**

A helper module. All localStorage access in the app goes through this file only.

```js
// Three private base functions:
function get(key)        // localStorage.getItem(key) + JSON.parse, returns null on failure
function set(key, value) // JSON.stringify(value) + localStorage.setItem(key, ...)
function remove(key)     // localStorage.removeItem(key)

// Keys:
const KEYS = {
  TRIPS:    'rr_trips',
  WISHLIST: 'rr_wishlist',
  PREFS:    'rr_prefs',
}

// Exported functions:
export function getTrips()              // returns array, default []
export function saveTrip(trip)          // insert if new id, replace if existing id
export function deleteTrip(id)          // filter out by id

export function getWishlist()           // returns array, default []
export function addToWishlist(item)     // only adds if id not already present
export function removeFromWishlist(id)  // filter out by id

export function getPrefs()              // returns object, default { tripsView: 'grid' }
export function setPrefs(prefs)         // overwrites prefs object
```

**Data shapes:**
```js
// Trip
{ id, city, country, continent, emoji, dateVisited, notes, rating }
// id = crypto.randomUUID()
// rating = 1–5 (number)
// dateVisited = 'YYYY-MM-DD' string

// Wishlist item
{ id, city, country, continent, emoji }
// id = crypto.randomUUID()

// Prefs
{ tripsView: 'grid' | 'list' }
```

---

### 2. `src/data/destinations.js` — **CREATE**

A hardcoded array of 20 curated destinations. No API needed.

```js
export const DESTINATIONS = [
  { id: 'd1',  city: 'Tokyo',         country: 'Japan',        continent: 'Asia',     emoji: '🗼' },
  { id: 'd2',  city: 'Kyoto',         country: 'Japan',        continent: 'Asia',     emoji: '⛩️' },
  { id: 'd3',  city: 'Bangkok',       country: 'Thailand',     continent: 'Asia',     emoji: '🛕' },
  { id: 'd4',  city: 'Bali',          country: 'Indonesia',    continent: 'Asia',     emoji: '🌺' },
  { id: 'd5',  city: 'Paris',         country: 'France',       continent: 'Europe',   emoji: '🗼' },
  { id: 'd6',  city: 'Rome',          country: 'Italy',        continent: 'Europe',   emoji: '🏛️' },
  { id: 'd7',  city: 'Barcelona',     country: 'Spain',        continent: 'Europe',   emoji: '🎨' },
  { id: 'd8',  city: 'Amsterdam',     country: 'Netherlands',  continent: 'Europe',   emoji: '🌷' },
  { id: 'd9',  city: 'New York',      country: 'USA',          continent: 'Americas', emoji: '🗽' },
  { id: 'd10', city: 'Mexico City',   country: 'Mexico',       continent: 'Americas', emoji: '🌮' },
  { id: 'd11', city: 'Buenos Aires',  country: 'Argentina',    continent: 'Americas', emoji: '💃' },
  { id: 'd12', city: 'Rio de Janeiro',country: 'Brazil',       continent: 'Americas', emoji: '🌴' },
  { id: 'd13', city: 'Nairobi',       country: 'Kenya',        continent: 'Africa',   emoji: '🦁' },
  { id: 'd14', city: 'Marrakech',     country: 'Morocco',      continent: 'Africa',   emoji: '🕌' },
  { id: 'd15', city: 'Cape Town',     country: 'South Africa', continent: 'Africa',   emoji: '🏔️' },
  { id: 'd16', city: 'Cairo',         country: 'Egypt',        continent: 'Africa',   emoji: '🐪' },
  { id: 'd17', city: 'Sydney',        country: 'Australia',    continent: 'Oceania',  emoji: '🦘' },
  { id: 'd18', city: 'Melbourne',     country: 'Australia',    continent: 'Oceania',  emoji: '☕' },
  { id: 'd19', city: 'Auckland',      country: 'New Zealand',  continent: 'Oceania',  emoji: '🌿' },
  { id: 'd20', city: 'Fiji',          country: 'Fiji',         continent: 'Oceania',  emoji: '🏝️' },
]

export const CONTINENTS = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania']
```

---

### 3. `src/pages/Destinations.jsx` — **REPLACE stub**

Two sections on one page:

**Section A — Explore Destinations**
- Filter buttons: All / Asia / Europe / Americas / Africa / Oceania
- Grid of destination cards (responsive: 2 cols mobile, 4 cols desktop)
- Each card shows emoji, city, country
- "Add to wishlist" button on each card (calls `addToWishlist`)
- If item is already in wishlist, show "✓ In wishlist" (disabled, different style)
- Read wishlist state from localStorage on mount with `useEffect`

**Section B — My Wishlist**
- Only render this section if wishlist has items
- Shows wishlist items as cards with a "Remove" button (calls `removeFromWishlist`)

Style to match existing app: cream background, navy text, orange accents, rounded-2xl cards, same padding as home page (`px-8 md:px-16`).

---

### 4. `src/pages/MyTrips.jsx` — **CREATE**

The main CRUD page. Three pieces:

**A — Controls bar** (top of page, responsive flex row → stack on mobile)
- Search input: filters trips list by city name (client-side, no storage)
- Sort dropdown: "Newest first" | "Oldest first" | "A–Z" | "Rating ↓"
- View toggle: grid icon / list icon buttons — reads/writes `rr_prefs` via `getPrefs`/`setPrefs`
- "Add Trip" button → opens the add form (toggle show/hide with `useState`)

**B — Add / Edit form** (shown/hidden via state)
Fields: City, Country, Continent (select), Emoji (text, optional), Date Visited (date input), Notes (textarea), Rating (1–5 number input or star buttons)
- On submit: call `saveTrip({ id: crypto.randomUUID(), ...formData, createdAt: new Date().toISOString() })` for new trips
- For editing: pre-fill form with existing trip data, call `saveTrip({ ...existingTrip, ...formData })` (same id = update)
- After submit: close form, refresh trips list from localStorage

**C — Trips list / grid**
- Read trips from `getTrips()` on mount and after any CRUD action
- Apply search filter and sort in the render (not in storage)
- Grid view: responsive card grid (1 col mobile, 2 col md, 3 col lg)
- List view: full-width stacked rows
- Each trip shows: emoji, city, country, date, rating (stars), notes snippet
- Each trip has Edit button (loads data into form, scrolls to form) and Delete button (calls `deleteTrip(id)`, refreshes list)
- If no trips: show empty state — "No trips yet. Add your first one!"

Style to match existing app.

---

### 5. `src/main.jsx` — **ADD one route**

Add this import and route:
```jsx
import MyTrips from './pages/MyTrips.jsx'
// inside <Routes> / <Route element={<Layout />}>:
<Route path="/my-trips" element={<MyTrips />} />
```

---

### 6. `src/components/Navbar.jsx` — **ADD nav link**

Add a "My Trips" nav link pointing to `/my-trips`, alongside the existing Destinations and About links. Use `useNavigate` (already imported).

---

## Responsive Requirements

Every page must use Tailwind responsive prefixes. Key breakpoints:
- Mobile-first — stack everything vertically by default
- `md:` — switch to horizontal layouts, multi-column grids
- `lg:` — wider grids (3+ columns)

---

## Style Guide (match existing pages)

- Page wrapper: `w-full px-8 md:px-16 py-12`
- Section headings: `text-4xl font-extrabold text-navy mb-4`
- Cards: `bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/80`
- Primary button: `bg-orange hover:bg-[#e07030] text-white font-semibold px-5 py-2.5 rounded-full transition-colors`
- Secondary button: `border-2 border-navy/20 hover:border-sky text-navy font-semibold px-5 py-2.5 rounded-full transition-colors`
- Input/select: `border border-navy/20 rounded-xl px-4 py-2.5 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-sky w-full`
- Danger button (delete): `text-red-500 hover:text-red-700 text-sm font-medium transition-colors`

---

## Auth (skip for now)

`src/pages/GetStarted.jsx` and `src/pages/SignIn.jsx` remain as stubs. The localStorage key `rr_user` is reserved for later. No auth logic is needed for any of the above features to work.
