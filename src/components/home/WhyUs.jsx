import { valueProps } from '../../data/home'
import SectionHeading from '../SectionHeading'

function WhyUs() {
  return (
    <section className="bg-tint/50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Why GreenPackMart"
          title="Built for buyers who care what happens after the meal"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="rounded-3xl border border-mist/60 bg-white p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tint">
                <svg
                  className="h-5 w-5 text-forest"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-forest">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm text-pine/70">{prop.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
