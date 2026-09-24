import { RouterProvider } from 'react-router-dom'
import { WishlistProvider } from '../features/wishlist/WishlistProvider'
import { createAppRouter } from './routes'

const router = createAppRouter()

export function App() {
  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  )
}
