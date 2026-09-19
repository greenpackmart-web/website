import PageHero from '../components/PageHero'
import CtaBand from '../components/CtaBand'

const orderSteps = [
  {
    title: 'Enquiry',
    text: 'Tell us your products, quantities, sizes and destination country.',
  },
  {
    title: 'Quote',
    text: 'We reply with pricing and lead time within one business day.',
  },
  {
    title: 'Samples',
    text: 'A sample kit ships to you so quality is confirmed before you commit.',
  },
  {
    title: 'Production',
    text: 'Your order is manufactured and inspected at our facility.',
  },
  {
    title: 'Shipping',
    text: 'Container dispatch with full export documentation, sea or air.',
  },
]

const regions = [
  'North America',
  'Europe',
  'United Kingdom',
  'Middle East',
  'Asia-Pacific',
  'Africa',
]

function ExportPage() {
  return (
    <>
      <PageHero
        eyebrow="Export"
        title="Ordering from India, made simple"
        text="We handle production, packing and paperwork — you handle your market. Here is exactly how it works."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {orderSteps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-mist bg-cream p-6">
                <p className="font-heading text-3xl font-extrabold text-mist">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-3 font-heading text-base font-bold text-forest">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-pine/70">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-tint/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-extrabold text-forest">
            Regions we serve
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {regions.map((region) => (
              <span
                key={region}
                className="rounded-full border border-mist bg-white px-5 py-2 text-sm font-medium text-forest"
              >
                {region}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-pine/70">
            Minimum order quantities apply per product and are listed on each
            product page. Mixed-category container orders are welcome — many
            buyers fill one container across several product lines.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default ExportPage
