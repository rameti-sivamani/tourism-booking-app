import { useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { DishCard } from '../features/dining/DishCard'
import { dishes } from '../features/dining/data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import styles from './DestinationsPage.module.css'
import page from './Page.module.css'

type DietFilter = 'all' | 'veg' | 'non-veg'

const FILTERS: Array<{ value: DietFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'veg', label: 'Vegetarian' },
  { value: 'non-veg', label: 'Non-vegetarian' },
]

export default function DiningPage() {
  useDocumentTitle('Dining')
  const [diet, setDiet] = useState<DietFilter>('all')
  const visible = dishes.filter((dish) => diet === 'all' || dish.vegetarian === (diet === 'veg'))

  return (
    <div className={`container ${page.page}`}>
      <SectionHeading
        as="h1"
        eyebrow="Dining"
        title="Eat like a local"
        description="Regional favourites served at our partner restaurants and included in many of our packages."
      />
      <div className={styles.toolbar}>
        <div className={styles.regions} role="group" aria-label="Filter by diet">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={styles.chip}
              aria-pressed={diet === filter.value}
              onClick={() => setDiet(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <ul className={page.grid}>
        {visible.map((dish) => (
          <li key={dish.id}>
            <DishCard dish={dish} />
          </li>
        ))}
      </ul>
    </div>
  )
}
