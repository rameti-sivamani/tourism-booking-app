import borobudur from '../../assets/destinations/borobudur.webp'
import buckinghamPalace from '../../assets/destinations/buckingham-palace.webp'
import colosseum from '../../assets/destinations/colosseum.webp'
import grandCanyon from '../../assets/destinations/grand-canyon.webp'
import greatWall from '../../assets/destinations/great-wall.webp'
import machuPicchu from '../../assets/destinations/machu-picchu.webp'
import pyramids from '../../assets/destinations/pyramids-of-giza.webp'
import statueOfLiberty from '../../assets/destinations/statue-of-liberty.webp'
import tajMahal from '../../assets/destinations/taj-mahal.webp'
import type { Destination } from '../../types'

export const destinations: Destination[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    country: 'India',
    region: 'Asia',
    image: tajMahal,
    summary: 'The marble monument to love on the banks of the Yamuna.',
    description:
      'Built by Shah Jahan in memory of Mumtaz Mahal, the Taj Mahal changes colour from soft pink at dawn to glowing white at noon. Our package pairs a sunrise visit with a walk through the old lanes of Agra and a day trip to Fatehpur Sikri.',
    highlights: ['Sunrise entry to the Taj', 'Agra Fort guided tour', 'Fatehpur Sikri day trip'],
    rating: 4.9,
    price: 24999,
    discount: 0.2,
    durationDays: 3,
    bestSeason: 'October – March',
  },
  {
    id: 'great-wall',
    name: 'Great Wall of China',
    country: 'China',
    region: 'Asia',
    image: greatWall,
    summary: 'Hike restored and wild sections of the world’s longest wall.',
    description:
      'Stretching thousands of kilometres across northern China, the Great Wall is best experienced on foot. We take you to the quieter Mutianyu and Jinshanling sections, with a night in Beijing’s hutongs.',
    highlights: ['Mutianyu cable car', 'Jinshanling sunset hike', 'Beijing hutong stay'],
    rating: 4.7,
    price: 79999,
    discount: 0.3,
    durationDays: 5,
    bestSeason: 'April – May, September – October',
  },
  {
    id: 'borobudur',
    name: 'Borobudur',
    country: 'Indonesia',
    region: 'Asia',
    image: borobudur,
    summary: 'The world’s largest Buddhist temple, rising out of the jungle.',
    description:
      'Borobudur’s nine stacked platforms hold over 2,600 relief panels and 500 Buddha statues. Watch the sun rise over the Merapi volcano from the upper terraces, then explore Yogyakarta’s batik workshops.',
    highlights: [
      'Sunrise over Mount Merapi',
      'Prambanan temple visit',
      'Yogyakarta batik workshop',
    ],
    rating: 4.6,
    price: 54999,
    discount: 0.25,
    durationDays: 4,
    bestSeason: 'May – September',
  },
  {
    id: 'colosseum',
    name: 'Colosseum',
    country: 'Italy',
    region: 'Europe',
    image: colosseum,
    summary: 'Stand where gladiators fought in the heart of ancient Rome.',
    description:
      'The Colosseum once held 50,000 spectators. Our tour includes underground chambers usually closed to the public, the Roman Forum and Palatine Hill, and an evening food walk in Trastevere.',
    highlights: [
      'Underground chambers access',
      'Roman Forum & Palatine Hill',
      'Trastevere food walk',
    ],
    rating: 4.8,
    price: 119999,
    discount: 0.15,
    durationDays: 5,
    bestSeason: 'April – June, September – October',
  },
  {
    id: 'buckingham-palace',
    name: 'Buckingham Palace',
    country: 'United Kingdom',
    region: 'Europe',
    image: buckinghamPalace,
    summary: 'Royal London, from the Changing of the Guard to the State Rooms.',
    description:
      'See the Changing of the Guard, tour the State Rooms during the summer opening, and explore London’s royal parks, museums and markets at your own pace.',
    highlights: ['Changing of the Guard', 'State Rooms tour', 'Thames river cruise'],
    rating: 4.5,
    price: 129999,
    discount: 0.1,
    durationDays: 5,
    bestSeason: 'June – September',
  },
  {
    id: 'pyramids-of-giza',
    name: 'Pyramids of Giza',
    country: 'Egypt',
    region: 'Africa',
    image: pyramids,
    summary: 'The last standing wonder of the ancient world.',
    description:
      'Ride a camel across the Giza plateau, step inside the Great Pyramid and meet the Sphinx at golden hour. The trip ends with a felucca sail on the Nile.',
    highlights: ['Inside the Great Pyramid', 'Camel ride at sunset', 'Nile felucca sail'],
    rating: 4.7,
    price: 69999,
    discount: 0.2,
    durationDays: 4,
    bestSeason: 'October – April',
  },
  {
    id: 'grand-canyon',
    name: 'Grand Canyon',
    country: 'United States',
    region: 'Americas',
    image: grandCanyon,
    summary: 'A mile-deep canyon carved by the Colorado River.',
    description:
      'Take in the South Rim viewpoints, hike part of the Bright Angel Trail and watch the canyon walls turn red at sunset from Hopi Point.',
    highlights: ['South Rim viewpoints', 'Bright Angel Trail hike', 'Hopi Point sunset'],
    rating: 4.8,
    price: 139999,
    discount: 0.25,
    durationDays: 4,
    bestSeason: 'March – May, September – November',
  },
  {
    id: 'statue-of-liberty',
    name: 'Statue of Liberty',
    country: 'United States',
    region: 'Americas',
    image: statueOfLiberty,
    summary: 'New York’s symbol of freedom, with crown access.',
    description:
      'Ferry across the harbour to Liberty Island, climb to the crown and visit the Ellis Island immigration museum before exploring Manhattan.',
    highlights: ['Crown access tickets', 'Ellis Island museum', 'Manhattan walking tour'],
    rating: 4.5,
    price: 134999,
    discount: 0.1,
    durationDays: 4,
    bestSeason: 'April – June, September – November',
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'Americas',
    image: machuPicchu,
    summary: 'The Inca citadel hidden in the clouds of the Andes.',
    description:
      'Travel through the Sacred Valley by train, spend a night in Aguas Calientes and enter Machu Picchu at opening time before the crowds arrive.',
    highlights: ['Sacred Valley train', 'Early entry to the citadel', 'Huayna Picchu climb'],
    rating: 4.9,
    price: 159999,
    discount: 0.2,
    durationDays: 6,
    bestSeason: 'May – September',
  },
]

export function getDestination(id: string): Destination | undefined {
  return destinations.find((destination) => destination.id === id)
}
