function PageHero({ eyebrow, title, text }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-sage">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-extrabold text-forest sm:text-5xl">
          {title}
        </h1>
        {text && <p className="mt-4 text-lg text-pine/70">{text}</p>}
      </div>
    </section>
  )
}

export default PageHero
