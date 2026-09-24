import { useContext } from 'react'
import { WishlistContext, type WishlistValue } from './wishlistContext'

export function useWishlist(): WishlistValue {
  const value = useContext(WishlistContext)
  if (!value) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return value
}
