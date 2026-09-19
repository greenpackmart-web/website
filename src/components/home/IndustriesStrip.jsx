import { Link } from 'react-router-dom'
import { industries } from '../../data/industries'
import SectionHeading from '../SectionHeading'

function IndustriesStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Trusted across every food-first business"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry.name}
              className="rounded-full border border-mist bg-cream px-5 py-2 text-sm font-medium text-forest"
            >
              {industry.name}
            </span>
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link
            to="/industries"
            className="font-heading font-semibold text-leaf transition hover:text-forest"
          >
            See how we serve each industry →
          </Link>
        </p>
      </div>
    </section>
  )
}

export default IndustriesStrip
