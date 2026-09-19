import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { navLinks, site } from '../data/site'

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-tint text-forest'
      : 'text-pine/70 hover:bg-tint/60 hover:text-forest'
  }`

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-mist/60 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src={Logo} alt={`${site.name} logo`} className="h-9 w-auto" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/get-quote"
            className="ml-2 rounded-full bg-leaf px-5 py-2 text-sm font-semibold text-white shadow-md shadow-leaf/30 transition hover:bg-forest"
          >
            Get Quote
          </NavLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-forest md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-mist/60 bg-cream px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/get-quote"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-leaf px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-forest"
            >
              Get Quote
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
