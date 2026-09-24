import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readJson, writeJson } from '../../lib/storage'
import { WishlistContext, type WishlistValue } from './wishlistContext'

const STORAGE_KEY = 'tourism.wishlist'

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readJson<string[]>(STORAGE_KEY, []))

  useEffect(() => writeJson(STORAGE_KEY, ids), [ids])

  const toggle = useCallback((id: string) => {
    setIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))
  }, [])

  const value = useMemo<WishlistValue>(
    () => ({ ids, has: (id) => ids.includes(id), toggle }),
    [ids, toggle],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
