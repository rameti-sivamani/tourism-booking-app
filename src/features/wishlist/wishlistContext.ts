import { createContext } from 'react'

export interface WishlistValue {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
}

export const WishlistContext = createContext<WishlistValue | null>(null)
