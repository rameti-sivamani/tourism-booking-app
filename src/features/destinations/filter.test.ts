import { discountedPrice } from '../../lib/format'
import { destinations } from './data'
import { filterDestinations } from './filter'

const names = (list: { name: string }[]) => list.map((d) => d.name)

describe('filterDestinations', () => {
  it('returns everything for empty filters', () => {
    expect(
      filterDestinations(destinations, { query: '', region: 'All', sort: 'popular' }),
    ).toHaveLength(destinations.length)
  })

  it('matches name or country case-insensitively', () => {
    expect(
      names(
        filterDestinations(destinations, {
          query: 'united states',
          region: 'All',
          sort: 'popular',
        }),
      ),
    ).toEqual(['Grand Canyon', 'Statue of Liberty'])
    expect(
      names(filterDestinations(destinations, { query: ' TAJ ', region: 'All', sort: 'popular' })),
    ).toEqual(['Taj Mahal'])
  })

  it('filters by region', () => {
    const europe = filterDestinations(destinations, {
      query: '',
      region: 'Europe',
      sort: 'popular',
    })
    expect(europe.every((d) => d.region === 'Europe')).toBe(true)
    expect(europe).toHaveLength(2)
  })

  it('sorts by discounted price in both directions', () => {
    const asc = filterDestinations(destinations, { query: '', region: 'All', sort: 'price-asc' })
    const desc = filterDestinations(destinations, { query: '', region: 'All', sort: 'price-desc' })
    expect(asc[0].name).toBe('Taj Mahal')
    expect(desc[0].name).toBe('Machu Picchu')
    const prices = asc.map((d) => discountedPrice(d.price, d.discount))
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
  })

  it('does not mutate the input list', () => {
    const copy = [...destinations]
    filterDestinations(destinations, { query: '', region: 'All', sort: 'price-asc' })
    expect(destinations).toEqual(copy)
  })
})
