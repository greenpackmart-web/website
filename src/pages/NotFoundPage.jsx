import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="font-heading text-sm font-bold uppercase tracking-widest text-sage">
        404
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-forest sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 text-pine/60">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest"
      >
        Back to home
      </Link>
    </section>
  )
}

export default NotFoundPage
