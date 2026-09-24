import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import { heroContent } from '../../data/home'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-sage">
            {heroContent.eyebrow}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-forest sm:text-5xl lg:text-6xl">
            Eco-friendly tableware the world can{' '}
            <span className="text-leaf">compost</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pine/70">
            {heroContent.subtext}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={heroContent.primaryCta.to}
              className="rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest"
            >
              {heroContent.primaryCta.label}
            </Link>
            <Link
              to={heroContent.secondaryCta.to}
              className="rounded-full border-2 border-forest/15 bg-white px-8 py-3 font-heading font-semibold text-forest transition hover:border-forest/40"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto hidden h-72 w-[24rem] sm:block">
          <div className="absolute inset-0 rounded-full bg-tint blur-3xl" />
          <div className="absolute right-6 top-8 h-40 w-40 rounded-full bg-mist/60 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-36 items-center justify-center rounded-[2.5rem] bg-white px-10 shadow-xl shadow-forest/10">
              <img src={Logo} alt="GreenPackMart logo" className="h-16 w-auto" />
            </div>
          </div>
          <div className="absolute left-0 top-6 rounded-full border border-mist bg-white px-4 py-2 text-xs font-semibold text-forest shadow-md">
            100% Plastic-free
          </div>
          <div className="absolute bottom-6 right-0 rounded-full border border-mist bg-white px-4 py-2 text-xs font-semibold text-forest shadow-md">
            Composts in 90 days
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
