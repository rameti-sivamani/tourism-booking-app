export type Region = 'Asia' | 'Europe' | 'Americas' | 'Africa'

export interface Destination {
  id: string
  name: string
  country: string
  region: Region
  image: string
  summary: string
  description: string
  highlights: string[]
  rating: number
  /** Package price per person in INR, before discount. */
  price: number
  /** Discount as a fraction between 0 and 1. */
  discount: number
  durationDays: number
  bestSeason: string
}

export interface Stay {
  id: string
  name: string
  city: string
  type: 'Hotel' | 'Resort' | 'Homestay'
  rating: number
  /** Price per night in INR. */
  pricePerNight: number
  amenities: string[]
}

export interface Dish {
  id: string
  name: string
  cuisine: string
  vegetarian: boolean
  rating: number
  price: number
  description: string
}

export type ContactMethod = 'phone' | 'email'
export type ContactTime = 'morning' | 'afternoon' | 'evening' | 'any'

export interface BookingRequest {
  destinationId: string
  startDate: string
  travellers: number
  firstName: string
  lastName: string
  email: string
  phone: string
  contactMethod: ContactMethod
  contactTime: ContactTime
  notes: string
}

export interface Booking extends BookingRequest {
  reference: string
  createdAt: string
  totalPrice: number
}
