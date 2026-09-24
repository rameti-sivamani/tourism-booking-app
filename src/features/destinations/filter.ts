import type { Destination, Region } from '../../types'
import { discountedPrice } from '../../lib/format'

export type SortOption = 'popular' | 'price-asc' | 'price-desc'

export interface DestinationFilters {
  query: string
  region: Region | 'All'
  sort: SortOption
}

export const REGIONS: Array<Region | 'All'> = ['All', 'Asia', 'Europe', 'Americas', 'Africa']

export function filterDestinations(
  list: Destination[],
  { query, region, sort }: DestinationFilters,
): Destination[] {
  const needle = query.trim().toLowerCase()
  const matches = list.filter(
    (destination) =>
      (region === 'All' || destination.region === region) &&
      (!needle ||
        destination.name.toLowerCase().includes(needle) ||
        destination.country.toLowerCase().includes(needle)),
  )

  const price = (destination: Destination) =>
    discountedPrice(destination.price, destination.discount)
  const compare: Record<SortOption, (a: Destination, b: Destination) => number> = {
    popular: (a, b) => b.rating - a.rating,
    'price-asc': (a, b) => price(a) - price(b),
    'price-desc': (a, b) => price(b) - price(a),
  }
  return [...matches].sort(compare[sort])
}
