import { Link } from 'react-router-dom'

function CtaBand() {
  return (
    <section className="bg-pine">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
        <h2 className="max-w-2xl font-heading text-3xl font-extrabold text-cream sm:text-4xl">
          Ready to switch to packaging that disappears?
        </h2>
        <p className="max-w-xl text-cream/70">
          Tell us what you need — quantities, sizes, destination country — and
          we'll reply with a quote within one business day.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/get-quote"
            className="rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/20 transition hover:bg-cream hover:text-pine"
          >
            Get a Quote
          </Link>
          <Link
            to="/request-samples"
            className="rounded-full border-2 border-cream/30 px-8 py-3 font-heading font-semibold text-cream transition hover:border-cream"
          >
            Request Samples
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CtaBand
