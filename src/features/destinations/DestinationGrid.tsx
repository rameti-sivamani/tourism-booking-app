import type { Destination } from '../../types'
import { DestinationCard } from './DestinationCard'
import styles from './DestinationGrid.module.css'

export function DestinationGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <ul className={styles.grid}>
      {destinations.map((destination) => (
        <li key={destination.id}>
          <DestinationCard destination={destination} />
        </li>
      ))}
    </ul>
  )
}
