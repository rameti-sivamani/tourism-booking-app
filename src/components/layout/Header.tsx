import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useWishlist } from '../../features/wishlist/useWishlist'
import { useTheme } from '../../hooks/useTheme'
import { ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import styles from './Header.module.css'
import { NAV_LINKS } from './navigation'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { ids } = useWishlist()
  const { pathname } = useLocation()
  // The mobile menu remembers which page it was opened on, so navigating to
  // another page closes it without an extra effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null)
  const menuOpen = openOnPath === pathname

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <Icon name="compass" size={20} />
          </span>
          Tourism
        </Link>

        <nav
          id="main-nav"
          aria-label="Main"
          className={`${styles.nav} ${menuOpen ? styles.open : ''}`}
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink to="/booking" className={styles.mobileCta}>
            Book a trip
          </ButtonLink>
        </nav>

        <div className={styles.actions}>
          <Link
            to="/wishlist"
            className={styles.iconButton}
            aria-label={`Wishlist, ${ids.length} saved`}
          >
            <Icon name="heart" />
            {ids.length > 0 && <span className={styles.count}>{ids.length}</span>}
          </Link>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <ButtonLink to="/booking" className={styles.cta}>
            Book a trip
          </ButtonLink>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setOpenOnPath(menuOpen ? null : pathname)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
