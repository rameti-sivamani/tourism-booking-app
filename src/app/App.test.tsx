import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { WishlistProvider } from '../features/wishlist/WishlistProvider'
import { routes } from './routes'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>,
  )
  return router
}

beforeEach(() => localStorage.clear())

describe('app routes', () => {
  it('renders the home page', async () => {
    renderAt('/')
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Your next great journey',
    )
  })

  it('searches from the hero into the destinations page', async () => {
    const router = renderAt('/')
    await userEvent.type(screen.getByLabelText('Search destinations'), 'peru{Enter}')
    expect(router.state.location.search).toBe('?q=peru')
    expect(await screen.findByText('1 destination')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Machu Picchu' })).toBeInTheDocument()
  })

  it('shows a not-found page for unknown routes and destinations', async () => {
    renderAt('/nowhere')
    expect(await screen.findByText('Looks like you’re off the map')).toBeInTheDocument()
  })

  it('saves destinations to the wishlist', async () => {
    renderAt('/destinations/taj-mahal')
    await userEvent.click(await screen.findByRole('button', { name: 'Save Taj Mahal to wishlist' }))
    expect(screen.getByRole('link', { name: 'Wishlist, 1 saved' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('tourism.wishlist')!)).toEqual(['taj-mahal'])
  })
})

describe('booking flow', () => {
  it('shows validation errors and does not submit an empty form', async () => {
    renderAt('/booking')
    await userEvent.click(await screen.findByRole('button', { name: 'Confirm booking' }))
    expect(screen.getByText('Choose a destination.')).toBeInTheDocument()
    expect(screen.getByLabelText('Destination')).toHaveFocus()
    expect(localStorage.getItem('tourism.bookings')).toBeNull()
  })

  it('books a trip and shows the confirmation', async () => {
    const user = userEvent.setup()
    const router = renderAt('/booking?destination=taj-mahal')

    expect(await screen.findByLabelText('Destination')).toHaveValue('taj-mahal')
    await user.type(screen.getByLabelText('Start date'), '2099-01-15')
    await user.type(screen.getByLabelText('First name'), 'Asha')
    await user.type(screen.getByLabelText('Last name'), 'Rao')
    await user.type(screen.getByLabelText('Email address'), 'asha@example.com')
    await user.type(screen.getByLabelText('Mobile number'), '9876543210')
    await user.click(screen.getByRole('button', { name: 'Confirm booking' }))

    expect(
      await screen.findByRole('heading', { name: 'You’re going to Taj Mahal!' }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toMatch(/^\/booking\/TRV-/)
    expect(screen.getByText('₹39,998')).toBeInTheDocument()
  })
})
