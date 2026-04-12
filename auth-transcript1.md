# Auth Implementation Transcript — Firebase Auth
**Project:** Roaming Records (travel-diary)
**Date:** 2026-04-11

---

## Overview
Added user authentication to the Roaming Records app using Firebase Auth (Email/Password). The implementation was kept lightweight — auth only, no database migration.

---

## Conversation Log

**User:** I want to use user authentication to this project using either firebase or supabase. I also want this to be a lightweight add, keep it simple. analyze the project structure and provide an outline of steps so we can proceed. I am a student, so while I want this to be efficient, I also want to learn throughout the process.

**Assistant:** Analyzed the project — React 19 + Vite + React Router v7 + Tailwind CSS, 100% localStorage, no backend. Recommended Firebase Auth over Supabase for a lightweight add (auth-only, no DB needed). Outlined 5 phases: Setup, Auth Context, Auth Pages, Protected Routes, Navbar polish.

---

**User:** We're going with Firebase.

**Assistant:** Reviewed `DarkModeContext.jsx`, `main.jsx`, `package.json`, and `Navbar.jsx` to understand the existing patterns before writing any code.

---

## Step 1 — Install Firebase

```bash
npm install firebase
```

Adds the Firebase JS SDK. Only the `auth` module is imported, keeping the bundle small.

---

## Step 2 — Firebase Console Setup

1. Created Firebase project at console.firebase.google.com
2. Registered a web app (`</>` icon on Project Overview)
3. Enabled Email/Password auth under Build → Authentication → Sign-in providers

---

## Step 3 — Environment Variables

Added `.env` and `.env.local` to `.gitignore`.

Created `.env` at project root:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

**Why `VITE_` prefix:** Vite only exposes env variables to the browser if they start with `VITE_`. Everything else stays server-side only.

**Why `.env` + `.gitignore`:** Builds the habit of never committing secrets. Firebase auth keys are technically public (bundled into frontend JS), but real projects will have genuinely secret keys (DB passwords, Stripe keys) that must never be committed.

---

## Step 4 — `src/firebase.js`

```js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
```

`import.meta.env.VITE_*` is Vite's syntax for reading `.env` variables.

---

## Step 5 — `src/context/AuthContext.jsx`

Mirrors the existing `DarkModeContext` pattern. Uses `onAuthStateChanged` — a Firebase listener that fires automatically on login, logout, and page refresh.

```jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
```

**Key concepts:**
- `loading` prevents flashing the login page for already-authenticated users on refresh
- `unsubscribe` returned from `useEffect` cleans up the listener on unmount (prevents memory leaks)
- `signup`, `login`, `logout` return Promises — used with `async/await` in the pages

---

## Step 6 — Wire `AuthProvider` into `main.jsx`

Wrapped the app with `<AuthProvider>` outside `<DarkModeProvider>`:

```jsx
<AuthProvider>
  <DarkModeProvider>
    <BrowserRouter>
      ...
    </BrowserRouter>
  </DarkModeProvider>
</AuthProvider>
```

---

## Step 7 — `src/pages/Login.jsx` and `src/pages/Signup.jsx`

Both pages use `async/await` with `try/catch/finally`:
- `try` — attempts the Firebase call
- `catch` — shows a friendly error message instead of crashing
- `finally` — always re-enables the submit button regardless of outcome

Signup collects a **username** field and saves it to Firebase's built-in `displayName` via `updateProfile`:

```js
await signup(email, password)
await updateProfile(auth.currentUser, { displayName: username })
```

---

## Step 8 — `src/components/ProtectedRoute.jsx`

```jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

**`replace` prop:** Replaces history entry instead of pushing, so the back button doesn't send unauthenticated users back to the protected page.

Applied to `/my-trips` and `/wishlist` in `main.jsx`:
```jsx
<Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
<Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
```

---

## Step 9 — Navbar Updates

- Added **Log In** button (sky blue) when no user is logged in
- Shows **username + Log Out** button when logged in
- `currentUser.displayName || currentUser.email` fallback for accounts created before username was added
- Login/Signup routes moved inside `<Layout />` so navbar appears on both pages

```jsx
const { currentUser, logout } = useAuth()

async function handleLogout() {
  await logout()
  navigate('/')
}
```

---

## Deployment — Vercel

Added all four env variables in Vercel under Settings → Environment Variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`

Marked as **sensitive** (hides values in dashboard UI, still available to all environments).
Applied to **Production**, **Preview**, and **Development**.

Also added the Vercel deployment URL to Firebase → Authentication → Settings → Authorized domains.

---

## What's NOT included (future work)

- Data (trips, wishlist) is still stored in `localStorage` — tied to the browser, not the user account
- Moving to Firestore would allow per-user data that persists across devices
- No Google/OAuth sign-in (could be added via `signInWithPopup`)

---

## Files Created/Modified

| File | Action |
|------|--------|
| `.gitignore` | Added `.env` and `.env.local` |
| `.env` | Created with Firebase config vars |
| `src/firebase.js` | Created — initializes Firebase app and exports `auth` |
| `src/context/AuthContext.jsx` | Created — auth state, login, signup, logout |
| `src/main.jsx` | Added `AuthProvider`, imported auth pages and `ProtectedRoute` |
| `src/pages/Login.jsx` | Created |
| `src/pages/Signup.jsx` | Created — includes username field |
| `src/components/ProtectedRoute.jsx` | Created |
| `src/components/Navbar.jsx` | Added Log In / Log Out / username display |
