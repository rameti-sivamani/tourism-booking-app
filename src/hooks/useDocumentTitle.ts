import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · Tourism` : 'Tourism — Explore the World'
  }, [title])
}
