'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface FavoritesContextType {
  favorites: string[]
  addFavorite: (href: string) => void
  removeFavorite: (href: string) => void
  isFavorite: (href: string) => boolean
  toggleFavorite: (href: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('careconnect-favorites')
      if (saved) {
        try {
          setFavorites(JSON.parse(saved))
        } catch (e) {
          console.error('Error loading favorites:', e)
        }
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careconnect-favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const addFavorite = (href: string) => {
    if (!favorites.includes(href)) {
      setFavorites([...favorites, href])
    }
  }

  const removeFavorite = (href: string) => {
    setFavorites(favorites.filter(f => f !== href))
  }

  const isFavorite = (href: string) => {
    return favorites.includes(href)
  }

  const toggleFavorite = (href: string) => {
    if (isFavorite(href)) {
      removeFavorite(href)
    } else {
      addFavorite(href)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

