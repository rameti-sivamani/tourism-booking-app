import { SectionHeading } from '../components/ui/SectionHeading'
import { StayCard } from '../features/stays/StayCard'
import { stays } from '../features/stays/data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import page from './Page.module.css'

export default function StaysPage() {
  useDocumentTitle('Stays')
  return (
    <div className={`container ${page.page}`}>
      <SectionHeading
        as="h1"
        eyebrow="Stays"
        title="Places to rest your head"
        description="Hotels, resorts and homestays across India, each visited and rated by our team."
      />
      <ul className={page.grid}>
        {stays.map((stay) => (
          <li key={stay.id}>
            <StayCard stay={stay} />
          </li>
        ))}
      </ul>
    </div>
  )
}
