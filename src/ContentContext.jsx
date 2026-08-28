import { createContext, useContext, useMemo, useState } from 'react'
import { cloneDefaults, DEFAULT_ADMIN_PIN } from './content'

const STORAGE_KEY = 'aditya-portfolio-content'
const PIN_KEY = 'aditya-portfolio-pin'
const SESSION_KEY = 'aditya-portfolio-admin'

const ContentContext = createContext(null)

function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return cloneDefaults()
    return { ...cloneDefaults(), ...JSON.parse(raw) }
  } catch {
    return cloneDefaults()
  }
}

function getPin() {
  return localStorage.getItem(PIN_KEY) || DEFAULT_ADMIN_PIN
}

export function ContentProvider({ children }) {
  const [data, setData] = useState(loadContent)

  const api = useMemo(
    () => ({
      data,
      save(next) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setData(next)
      },
      reset() {
        localStorage.removeItem(STORAGE_KEY)
        setData(cloneDefaults())
      },
      checkPin(pin) {
        return pin === getPin()
      },
      setPin(pin) {
        localStorage.setItem(PIN_KEY, pin)
      },
      isUnlocked() {
        return sessionStorage.getItem(SESSION_KEY) === '1'
      },
      unlock() {
        sessionStorage.setItem(SESSION_KEY, '1')
      },
      lock() {
        sessionStorage.removeItem(SESSION_KEY)
      },
    }),
    [data],
  )

  return <ContentContext.Provider value={api}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
