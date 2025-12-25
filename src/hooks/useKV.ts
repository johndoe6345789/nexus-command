import { useState, useEffect, useCallback } from 'react'

/**
 * A hook for persistent key-value storage using localStorage
 * Replacement for @github/spark's useKV hook
 * 
 * @param key - The key to store the value under
 * @param defaultValue - The default value if no stored value exists
 * @returns A tuple of [value, setValue] similar to useState
 */
export function useKV<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  // Initialize state from localStorage or use default
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  })

  // Update localStorage when value changes
  const setStoredValue = useCallback((newValue: T) => {
    try {
      setValue(newValue)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key])

  // Listen for storage events from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [value, setStoredValue]
}
