import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import styles from './Footer.module.css'
import { NAV_LINKS } from './navigation'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.brand}>Tourism</p>
          <p className={styles.tagline}>
            Exploring the world with purpose — curated trips, trusted stays and local flavours.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className={styles.heading}>Explore</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/booking">Book a trip</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <ul>
            <li>
              <a href="tel:+918374262109">
                <Icon name="phone" size={16} /> +91 83742 62109
              </a>
            </li>
            <li>
              <a href="mailto:rametisivamani494@gmail.com">
                <Icon name="mail" size={16} /> rametisivamani494@gmail.com
              </a>
            </li>
            <li>
              <span>
                <Icon name="pin" size={16} /> Chittoor, Andhra Pradesh, India
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Tourism. A portfolio project by Rameti Sivamani.</p>
      </div>
    </footer>
  )
}
