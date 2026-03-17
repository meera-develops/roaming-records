# Chat History 1 — Roaming Records Landing Page
**Date:** 2026-03-11

---

## Summary
Built and deployed a landing page for the Roaming Records travel diary app.

---

## What Was Built

### Landing Page (`travel-diary/src/App.jsx`)
- Full-width responsive layout using Tailwind CSS v4
- Custom color palette: Record Orange `#FF8A3D`, Sky Blue `#2F6BFF`, Cream `#FFF6EE`, Deep Navy `#1E2A44`, Accent Teal `#2EC4B6`
- Vinyl/travel theme with:
  - Animated spinning vinyl SVG component
  - Dotted flight path SVG with animated plane
  - Floating location badges in hero section

### Sections
1. **Navbar** — sticky, spinning vinyl logo, nav links, Sign In + Get Started buttons
2. **Hero** — headline, CTAs, large spinning vinyl with floating badges
3. **Flight Path Divider** — animated dotted SVG arc
4. **Features Grid** — 4 cards: Travel Log, Wishlist, User Profiles, Filter by Continent
5. **Destinations Showcase** — dark navy section, continent filter buttons, city cards with hover reveal
6. **How It Works** — 3-step flow with gradient connector line
7. **CTA Banner** — blue-to-navy gradient with spinning vinyl
8. **Footer** — links, tech stack

---

## Setup

### Tailwind CSS v4 Installation
```bash
npm install tailwindcss @tailwindcss/vite
```

**`vite.config.js`** — added Tailwind plugin:
```js
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
```

**`src/index.css`** — replaced default styles with:
```css
@import "tailwindcss";

@theme {
  --color-orange: #FF8A3D;
  --color-sky: #2F6BFF;
  --color-cream: #FFF6EE;
  --color-navy: #1E2A44;
  --color-teal: #2EC4B6;
}
/* + custom keyframe animations */
```

---

## Vercel Deployment Fixes

### Problem 1: `vite: command not found` (exit 127)
- **Cause:** Vite was in `devDependencies`, Vercel skips those in production installs
- **Fix:** Moved `vite` and `@vitejs/plugin-react` to `dependencies` in `package.json`

### Problem 2: `npm install && npm run build` still failing
- **Cause:** Vercel dashboard had a hardcoded build command overriding `vercel.json`
- **Fix:** Updated Build Command in Vercel dashboard to `npm install && npm run build`

### Problem 3: `package.json` not found (`ENOENT`)
- **Cause:** Vercel's Root Directory was set to `./` (repo root), but `package.json` is inside the `travel-diary/` subdirectory (git root is `midterm/`)
- **Fix:** Set Root Directory in Vercel → Settings → General to `travel-diary`

### `vercel.json` added
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

## Key Commands
```bash
npm run dev        # local dev server
npm run build      # production build → outputs to /dist
npm run preview    # preview production build locally
npx serve -s dist  # alternative local preview
```
