function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-sage">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-heading text-3xl font-extrabold text-forest sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-3 text-pine/70">{text}</p>}
    </div>
  )
}

export default SectionHeading
