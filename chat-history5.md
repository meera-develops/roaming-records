# Chat History 5 — Bug Fixes & Navbar Update
**Date:** 2026-03-17

---

## User
Can you temporarily hide About from the navbar? Don't delete it yet because it may be added in but remove it for now since there's nothing there and it makes the site look broken

## Assistant
Commented out the About button in `src/components/Navbar.jsx` (line 43) so it's hidden from the navbar but easy to restore later.

```jsx
// Before
<button onClick={() => navigate('/about')} className="hover:text-orange transition-colors cursor-pointer">About</button>

// After
{/* <button onClick={() => navigate('/about')} className="hover:text-orange transition-colors cursor-pointer">About</button> */}
```

---

## User
If wishlist is empty and I click on destinations (when deployed on Vercel), the site breaks

## Assistant
**Root cause:** Classic Vercel SPA routing problem. The app uses `BrowserRouter` (HTML5 history API), so routes like `/destinations` only exist client-side. When Vercel receives a request for `/destinations` (on page load, refresh, or direct link), it looks for an actual file at that path, finds nothing, and returns a 404.

The wishlist being empty was a red herring — the issue happens on any route when accessed directly on Vercel.

**Fix applied in `travel-diary/vercel.json`:**
```json
// Before
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}

// After
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

The rewrite rule tells Vercel to serve `index.html` for every path, letting React Router handle all routing client-side.

---
