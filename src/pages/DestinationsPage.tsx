import { useSearchParams } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'
import { EmptyState } from '../components/ui/EmptyState'
import { SectionHeading } from '../components/ui/SectionHeading'
import { DestinationGrid } from '../features/destinations/DestinationGrid'
import { destinations } from '../features/destinations/data'
import {
  filterDestinations,
  REGIONS,
  type DestinationFilters,
  type SortOption,
} from '../features/destinations/filter'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { Region } from '../types'
import styles from './DestinationsPage.module.css'
import page from './Page.module.css'

const SORT_LABELS: Record<SortOption, string> = {
  popular: 'Top rated',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
}

function readFilters(params: URLSearchParams): DestinationFilters {
  const region = params.get('region') as Region | null
  const sort = params.get('sort') as SortOption | null
  return {
    query: params.get('q') ?? '',
    region: region && REGIONS.includes(region) ? region : 'All',
    sort: sort && sort in SORT_LABELS ? sort : 'popular',
  }
}

export default function DestinationsPage() {
  useDocumentTitle('Destinations')
  // Filters live in the URL so results can be bookmarked and shared.
  const [params, setParams] = useSearchParams()
  const filters = readFilters(params)
  const results = filterDestinations(destinations, filters)

  function setFilter(key: 'q' | 'region' | 'sort', value: string, defaultValue: string) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (value === defaultValue) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  }

  return (
    <div className={`container ${page.page}`}>
      <SectionHeading
        as="h1"
        eyebrow="Destinations"
        title="Find your next wonder"
        description="All-inclusive packages to the world’s most iconic places. Prices are per person."
      />

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <Icon name="search" />
          <label htmlFor="destination-search" className="visually-hidden">
            Search by place or country
          </label>
          <input
            id="destination-search"
            type="search"
            placeholder="Search by place or country"
            value={filters.query}
            onChange={(event) => setFilter('q', event.target.value, '')}
          />
        </div>

        <div className={styles.regions} role="group" aria-label="Filter by region">
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              className={styles.chip}
              aria-pressed={filters.region === region}
              onClick={() => setFilter('region', region, 'All')}
            >
              {region}
            </button>
          ))}
        </div>

        <label className={styles.sort}>
          <span className="visually-hidden">Sort by</span>
          <select
            value={filters.sort}
            onChange={(event) => setFilter('sort', event.target.value, 'popular')}
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className={styles.count} aria-live="polite">
        {results.length} {results.length === 1 ? 'destination' : 'destinations'}
      </p>

      {results.length > 0 ? (
        <DestinationGrid destinations={results} />
      ) : (
        <EmptyState icon="compass" title="No destinations match your search">
          <button type="button" className={styles.reset} onClick={() => setParams({})}>
            Clear filters
          </button>
        </EmptyState>
      )}
    </div>
  )
}
