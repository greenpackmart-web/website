import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { companyLinks, site } from '../data/site'
import { productCategories } from '../data/products'

function Footer() {
  return (
    <footer className="bg-pine text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div>
          <img src={Logo} alt={`${site.name} logo`} className="h-12 w-12" />
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            {site.tagline}.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">
            Products
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {productCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/products/${category.slug}`}
                  className="text-cream/80 transition hover:text-cream"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {companyLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-cream/80 transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-cream/80 transition hover:text-cream"
              >
                {site.email}
              </a>
            </li>
            <li>
              <Link
                to="/get-quote"
                className="text-cream/80 transition hover:text-cream"
              >
                Get a Quote
              </Link>
            </li>
            <li>
              <Link
                to="/request-samples"
                className="text-cream/80 transition hover:text-cream"
              >
                Request Samples
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/60 sm:flex-row sm:px-6">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="transition hover:text-cream">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-cream">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
