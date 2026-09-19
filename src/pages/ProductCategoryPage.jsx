import { Link, useParams } from 'react-router-dom'
import { productCategories } from '../data/products'
import { site } from '../data/site'
import ProductImage from '../components/ProductImage'
import NotFoundPage from './NotFoundPage'

function ProductCategoryPage() {
  const { slug } = useParams()
  const category = productCategories.find((item) => item.slug === slug)

  if (!category) {
    return <NotFoundPage />
  }

  const enquiry = {
    subject: encodeURIComponent(`Bulk enquiry: ${category.name}`),
    body: encodeURIComponent(
      `Hello ${site.name},\n\nI am interested in your ${category.name}.\n\nQuantity: \nSizes needed: \nDestination country: \n\nThank you.`
    ),
  }

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav className="text-xs font-medium text-sage">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link to="/" className="transition hover:text-forest">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/products" className="transition hover:text-forest">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-forest">{category.name}</li>
          </ol>
        </nav>

        <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="w-40 shrink-0 sm:w-52">
            <ProductImage name={category.name} image={category.image} />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-forest sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-2 max-w-2xl text-pine/70">{category.blurb}</p>
          </div>
        </header>

        <p className="mt-8 max-w-3xl leading-relaxed text-pine/80">
          {category.description}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr]">
          <section>
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">
              Features
            </h2>
            <ul className="mt-4 space-y-3">
              {category.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-leaf"
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
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-sage">
              Sizes & Specifications
            </h2>
            <table className="specs-table mt-4 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-mist text-xs uppercase tracking-wider text-sage">
                  <th className="py-3 pr-4 font-semibold">Variant</th>
                  <th className="py-3 pr-4 font-semibold">Packing</th>
                  <th className="py-3 font-semibold">MOQ</th>
                </tr>
              </thead>
              <tbody>
                {category.specs.map((spec) => (
                  <tr key={spec.variant} className="border-b border-mist/50">
                    <td
                      data-label="Variant"
                      className="py-3 pr-4 font-medium text-forest sm:table-cell"
                    >
                      {spec.variant}
                    </td>
                    <td
                      data-label="Packing"
                      className="py-3 pr-4 text-pine/80 sm:table-cell"
                    >
                      {spec.packing}
                    </td>
                    <td
                      data-label="MOQ"
                      className="py-3 text-pine/80 sm:table-cell"
                    >
                      {spec.moq}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <section className="mt-14 rounded-3xl bg-forest px-6 py-10 text-center sm:px-10">
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-extrabold text-cream sm:text-3xl">
            Need bulk pricing for {category.name}?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-cream/70">
            Email us your quantity, sizes and destination country — we reply
            with a quote within one business day.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${site.email}?subject=${enquiry.subject}&body=${enquiry.body}`}
              className="rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/20 transition hover:bg-cream hover:text-pine"
            >
              Email us about {category.name}
            </a>
            <Link
              to="/get-quote"
              className="rounded-full border-2 border-cream/30 px-8 py-3 font-heading font-semibold text-cream transition hover:border-cream"
            >
              Use the quote form
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}

export default ProductCategoryPage
