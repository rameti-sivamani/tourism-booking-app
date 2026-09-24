import { ButtonLink } from '../components/ui/Button'
import { Icon, type IconName } from '../components/ui/Icon'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import styles from './AboutPage.module.css'
import page from './Page.module.css'

const VALUES: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: 'compass',
    title: 'Curiosity',
    text: 'We look past the postcard views to the stories, people and food that make a place unique.',
  },
  {
    icon: 'shield',
    title: 'Integrity',
    text: 'Clear prices, honest reviews and no hidden charges — what you see is what you pay.',
  },
  {
    icon: 'leaf',
    title: 'Respect',
    text: 'We partner with local guides and family-run stays so tourism supports the communities you visit.',
  },
  {
    icon: 'users',
    title: 'Care',
    text: 'From your first question to your flight home, a real person is there to help.',
  },
]

export default function AboutPage() {
  useDocumentTitle('About')
  return (
    <div className={`container ${page.page}`}>
      <section className={styles.intro}>
        <SectionHeading as="h1" eyebrow="About us" title="Exploring the world with purpose" />
        <p className={styles.lead}>
          At Tourism, we believe travel is more than visiting new places — it’s about creating
          meaningful connections. We help travellers discover the world in a way that is authentic,
          comfortable and sustainable, and we turn travel plans into reality.
        </p>
      </section>

      <section className={page.section}>
        <SectionHeading title="What sets us apart" />
        <ul className={page.grid}>
          {VALUES.map((value) => (
            <li key={value.title} className={styles.value}>
              <Icon name={value.icon} size={24} className={styles.icon} />
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.contact}>
        <h2>Questions? Let’s talk.</h2>
        <p>Call us or drop a line — we usually reply within a few hours.</p>
        <div className={styles.contactActions}>
          <a className={styles.contactLink} href="tel:+918374262109">
            <Icon name="phone" size={18} /> Call us
          </a>
          <a className={styles.contactLink} href="mailto:rametisivamani494@gmail.com">
            <Icon name="mail" size={18} /> Email us
          </a>
          <ButtonLink to="/booking">Book a trip</ButtonLink>
        </div>
      </section>
    </div>
  )
}
