import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import CtaBand from '../components/CtaBand'
import { industries } from '../data/industries'

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Built for every food-first business"
        text="Different industries need different things from eco packaging. Here is how we serve each one."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="rounded-3xl border border-mist bg-cream p-6"
              >
                <h2 className="font-heading text-lg font-bold text-forest">
                  {industry.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-pine/70">
                  {industry.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <SectionHeading
            title="Don't see your industry?"
            text="If you serve food or package goods, we most likely have a product range for you. Tell us what you do and we'll suggest the right products."
          />
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default IndustriesPage
