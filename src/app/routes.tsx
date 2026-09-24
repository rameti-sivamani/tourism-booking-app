import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import HomePage from '../pages/HomePage'

// Every page except the home page is code-split into its own chunk, so the
// first visit downloads only what it needs.
const DestinationsPage = lazy(() => import('../pages/DestinationsPage'))
const DestinationDetailPage = lazy(() => import('../pages/DestinationDetailPage'))
const StaysPage = lazy(() => import('../pages/StaysPage'))
const DiningPage = lazy(() => import('../pages/DiningPage'))
const BookingPage = lazy(() => import('../pages/BookingPage'))
const BookingConfirmationPage = lazy(() => import('../pages/BookingConfirmationPage'))
const WishlistPage = lazy(() => import('../pages/WishlistPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'destinations', element: <DestinationsPage /> },
      { path: 'destinations/:id', element: <DestinationDetailPage /> },
      { path: 'stays', element: <StaysPage /> },
      { path: 'dining', element: <DiningPage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'booking/:reference', element: <BookingConfirmationPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export function createAppRouter() {
  return createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })
}
