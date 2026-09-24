import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import heroLarge from '../assets/hero/beach-1920.webp'
import heroSmall from '../assets/hero/beach-960.webp'
import { ButtonLink } from '../components/ui/Button'
import { Icon, type IconName } from '../components/ui/Icon'
import { SectionHeading } from '../components/ui/SectionHeading'
import { DishCard } from '../features/dining/DishCard'
import { dishes } from '../features/dining/data'
import { DestinationGrid } from '../features/destinations/DestinationGrid'
import { destinations } from '../features/destinations/data'
import { filterDestinations } from '../features/destinations/filter'
import { StayCard } from '../features/stays/StayCard'
import { stays } from '../features/stays/data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import styles from './HomePage.module.css'
import page from './Page.module.css'

const FEATURES: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: 'compass',
    title: 'Curated itineraries',
    text: 'Every trip is planned by travellers who have been there, with time to actually enjoy each place.',
  },
  {
    icon: 'bed',
    title: 'Trusted stays',
    text: 'Handpicked hotels, resorts and homestays, rated by real guests.',
  },
  {
    icon: 'utensils',
    title: 'Local food',
    text: 'From Hyderabadi biryani to Kerala fish curry, taste the region you are visiting.',
  },
  {
    icon: 'shield',
    title: 'Flexible booking',
    text: 'Free cancellation up to 7 days before departure, and support whenever you need it.',
  },
]

const STATS = [
  { value: `${destinations.length}+`, label: 'World wonders' },
  { value: '12k', label: 'Happy travellers' },
  { value: '4.8', label: 'Average rating' },
]

export default function HomePage() {
  useDocumentTitle('')
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const featured = filterDestinations(destinations, {
    query: '',
    region: 'All',
    sort: 'popular',
  }).slice(0, 3)

  function search(event: FormEvent) {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/destinations?q=${encodeURIComponent(q)}` : '/destinations')
  }

  return (
    <>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src={heroLarge}
          srcSet={`${heroSmall} 960w, ${heroLarge} 1920w`}
          sizes="100vw"
          alt=""
          fetchPriority="high"
        />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.kicker}>Explore the world with purpose</p>
          <h1 className={styles.heroTitle}>Your next great journey starts here.</h1>
          <p className={styles.heroText}>
            Discover world wonders, stay somewhere memorable and eat like a local — all booked in
            minutes.
          </p>
          <form className={styles.search} role="search" onSubmit={search}>
            <label htmlFor="hero-search" className="visually-hidden">
              Search destinations
            </label>
            <Icon name="search" className={styles.searchIcon} />
            <input
              id="hero-search"
              type="search"
              placeholder="Where do you want to go?"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <dl className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`container ${page.section}`}>
        <SectionHeading
          eyebrow="Top picks"
          title="Most-loved destinations"
          description="The places our travellers rate the highest, with packages that include guides, entry and transfers."
          action={
            <ButtonLink to="/destinations" variant="secondary">
              View all <Icon name="arrowRight" size={16} />
            </ButtonLink>
          }
        />
        <DestinationGrid destinations={featured} />
      </section>

      <section className={styles.features}>
        <div className={`container ${page.section}`}>
          <SectionHeading eyebrow="Why Tourism" title="Travel made simple" />
          <ul className={`${page.grid} ${styles.featureGrid}`}>
            {FEATURES.map((feature) => (
              <li key={feature.title} className={styles.feature}>
                <span className={styles.featureIcon}>
                  <Icon name={feature.icon} size={24} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`container ${page.section}`}>
        <SectionHeading
          eyebrow="Where to stay"
          title="Handpicked stays"
          action={
            <ButtonLink to="/stays" variant="secondary">
              All stays <Icon name="arrowRight" size={16} />
            </ButtonLink>
          }
        />
        <ul className={page.grid}>
          {stays.slice(0, 3).map((stay) => (
            <li key={stay.id}>
              <StayCard stay={stay} />
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${page.section}`}>
        <SectionHeading
          eyebrow="Taste of India"
          title="Local favourites"
          action={
            <ButtonLink to="/dining" variant="secondary">
              Full menu <Icon name="arrowRight" size={16} />
            </ButtonLink>
          }
        />
        <ul className={page.grid}>
          {dishes.slice(0, 3).map((dish) => (
            <li key={dish.id}>
              <DishCard dish={dish} />
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <div className={styles.cta}>
          <div>
            <h2>Ready when you are.</h2>
            <p>Pick a destination, choose your dates and we will handle the rest.</p>
          </div>
          <ButtonLink to="/booking" size="lg" className={styles.ctaButton}>
            Plan my trip <Icon name="arrowRight" size={18} />
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
