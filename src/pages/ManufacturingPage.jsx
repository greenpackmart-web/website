import PageHero from '../components/PageHero'
import { manufacturingSteps } from '../data/manufacturing'
import { site } from '../data/site'

function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="From farm fiber to export carton"
        text="A six-step process that turns natural plant material into tableware — with no chemicals, no coatings and no shortcuts."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturingSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-3xl border border-mist bg-cream p-6"
              >
                <p className="font-heading text-4xl font-extrabold text-mist">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-3 font-heading text-lg font-bold text-forest">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-pine/70">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-3xl bg-forest px-6 py-8 text-center sm:px-10">
            <p className="mx-auto max-w-2xl font-heading text-xl font-bold text-cream">
              The whole process uses no chemicals, no dyes and no plastic — at
              any step.
            </p>
            <p className="mt-4 text-sm text-cream/70">
              Have specific material or process questions for your market?{' '}
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  'Manufacturing question'
                )}`}
                className="font-semibold text-mist underline underline-offset-4 transition hover:text-cream"
              >
                Ask us directly
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ManufacturingPage
