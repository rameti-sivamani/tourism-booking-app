import { Icon } from '../../components/ui/Icon'
import { useWishlist } from './useWishlist'
import styles from './WishlistButton.module.css'

export function WishlistButton({ id, name }: { id: string; name: string }) {
  const { has, toggle } = useWishlist()
  const saved = has(id)
  return (
    <button
      type="button"
      className={`${styles.button} ${saved ? styles.saved : ''}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      onClick={() => toggle(id)}
    >
      <Icon name="heart" size={18} filled={saved} />
    </button>
  )
}
