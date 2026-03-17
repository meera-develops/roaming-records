## Tech Stack
- React + Vite
- Tailwind CSS v4
- React Router v7
- localStorage (persistence for now, Firebase planned)

## Key Files

```
src/
├── main.jsx                  # Entry point — mounts app, defines all routes
├── App.jsx                   # Home page (landing page content)
│
├── components/
│   ├── Layout.jsx            # Shared wrapper — renders Navbar + <Outlet> + Footer on every page
│   ├── Navbar.jsx            # Sticky top nav with links and Sign In / Get Started buttons
│   ├── Footer.jsx            # Site footer, shared across all pages
│   └── Vinyl.jsx             # Decorative SVG vinyl disc, reused in Navbar, Footer, and App
│
└── pages/
    ├── SignIn.jsx            # /sign-in
    ├── GetStarted.jsx        # /get-started
    ├── Destinations.jsx      # /destinations
    └── About.jsx             # /about
```

## Routing

All routes are nested under `Layout`, so every page gets the shared Navbar and Footer automatically.

| Path | Component |
|---|---|
| `/` | `App` (landing page) |
| `/sign-in` | `SignIn` |
| `/get-started` | `GetStarted` |
| `/destinations` | `Destinations` |
| `/about` | `About` |

## Data Model

Planned data shapes for localStorage (and eventually Firebase):

**User**
```json
{
  "id": "string",
  "name": "string",
  "email": "string"
}
```

**Trip (travel log entry)**
```json
{
  "id": "string",
  "city": "string",
  "country": "string",
  "continent": "string",
  "visitedAt": "YYYY-MM-DD",
  "notes": "string",
  "photos": ["url"]
}
```

**Wishlist Item**
```json
{
  "id": "string",
  "city": "string",
  "country": "string",
  "continent": "string"
}
```