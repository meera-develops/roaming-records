import { createContext, useContext, useState, useEffect } from 'react'
import { getPrefs, setPrefs } from '../utils/storage'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(() => getPrefs().dark ?? false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  function toggle() {
    const next = !dark
    setDark(next)
    setPrefs({ ...getPrefs(), dark: next })
  }

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  return useContext(DarkModeContext)
}
