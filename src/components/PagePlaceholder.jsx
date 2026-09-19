function PagePlaceholder({ title, phase }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-3xl font-extrabold text-forest sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-pine/60">Coming in {phase}.</p>
    </section>
  )
}

export default PagePlaceholder
