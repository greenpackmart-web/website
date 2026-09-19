import Logo from './assets/logo.svg'

const palette = [
  { name: 'forest', hex: '#2d5832' },
  { name: 'pine', hex: '#213b23' },
  { name: 'leaf', hex: '#6ca857' },
  { name: 'sage', hex: '#a5b9a6' },
  { name: 'mist', hex: '#c8d8c8' },
  { name: 'cream', hex: '#f4fdea' },
  { name: 'tint', hex: '#e8f5d8' },
]

function App() {
  return (
    <main className="min-h-screen bg-cream px-6 py-16 font-body text-pine">
      <div className="mx-auto max-w-3xl text-center">
        <img
          src={Logo}
          alt="GreenPackMart logo"
          className="mx-auto h-40 w-40"
        />
        <h1 className="mt-8 font-heading text-4xl font-extrabold text-forest sm:text-5xl">
          GreenPackMart
        </h1>
        <p className="mt-4 text-lg text-pine/70">
          Eco-friendly biodegradable tableware and bags, exported from India to
          the world.
        </p>
        <a
          href="mailto:greenpackmart@gmail.com"
          className="mt-8 inline-block rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest"
        >
          Get in touch
        </a>

        <section className="mt-16">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">
            Design tokens
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {palette.map((color) => (
              <div
                key={color.name}
                className="flex items-center gap-2 rounded-2xl border border-mist bg-white px-3 py-2"
              >
                <span
                  className="h-6 w-6 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                <code className="text-xs text-forest">{color.name}</code>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
