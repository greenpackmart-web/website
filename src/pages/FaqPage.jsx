import PageHero from '../components/PageHero'
import FaqAccordion from '../components/FaqAccordion'
import { site } from '../data/site'

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions buyers ask us"
        text="The practical answers — MOQs, samples, branding, shipping and ordering."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <FaqAccordion />
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-extrabold text-forest">
            Still have questions?
          </h2>
          <p className="mt-3 text-pine/70">
            Email us anything — we answer within one business day.
          </p>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent('Question about GreenpackMart')}`}
            className="mt-6 inline-block rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest"
          >
            {site.email}
          </a>
        </div>
      </section>
    </>
  )
}

export default FaqPage
