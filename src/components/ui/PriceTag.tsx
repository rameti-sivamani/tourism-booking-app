import { discountedPrice, formatPrice } from '../../lib/format'
import styles from './PriceTag.module.css'

interface PriceTagProps {
  price: number
  discount?: number
  unit?: string
}

export function PriceTag({ price, discount = 0, unit }: PriceTagProps) {
  const final = discountedPrice(price, discount)
  return (
    <div className={styles.price}>
      <span className={styles.final}>{formatPrice(final)}</span>
      {unit && <span className={styles.unit}>/ {unit}</span>}
      {discount > 0 && (
        <>
          <s className={styles.original}>
            <span className="visually-hidden">Original price </span>
            {formatPrice(price)}
          </s>
          <span className={styles.badge}>{Math.round(discount * 100)}% off</span>
        </>
      )}
    </div>
  )
}
