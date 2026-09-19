import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import CtaBand from '../components/CtaBand'
import { about } from '../data/about'

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A business built around what happens after the meal"
        text="We make tableware and bags that do their job perfectly — then return to the earth instead of outliving it."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {about.story.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mb-6 leading-relaxed text-pine/80">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {about.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-3xl border border-mist bg-white p-6 text-center"
            >
              <p className="font-heading text-2xl font-extrabold text-forest">
                {fact.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-sage">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tint/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Four values we do not compromise on"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-mist/60 bg-white p-6"
              >
                <h3 className="font-heading text-lg font-bold text-forest">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-pine/70">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

export default AboutPage
