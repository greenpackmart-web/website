import { Link } from 'react-router-dom'
import { productCategories } from '../../data/products'
import ProductImage from '../ProductImage'
import SectionHeading from '../SectionHeading'

function ProductCategories() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Product Range"
          title="One supplier, every eco product you need"
          text="Tableware and bags made from natural plant materials — all compostable, all export-grade."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/products/${category.slug}`}
              className="group rounded-3xl border border-mist bg-cream p-6 transition hover:-translate-y-1 hover:border-leaf/60 hover:shadow-lg hover:shadow-forest/5"
            >
              <ProductImage name={category.name} image={category.image} />
              <h3 className="mt-4 font-heading text-lg font-bold text-forest transition group-hover:text-leaf">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-pine/70">{category.blurb}</p>
              <p className="mt-4 text-sm font-semibold text-leaf">
                Explore →
              </p>
            </Link>
          ))}

          <Link
            to="/products"
            className="flex flex-col justify-between rounded-3xl bg-forest p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/20"
          >
            <div>
              <h3 className="font-heading text-lg font-bold text-cream">
                Full Catalogue
              </h3>
              <p className="mt-2 text-sm text-cream/70">
                Sizes, specs and packaging details for every category.
              </p>
            </div>
            <p className="mt-4 text-sm font-semibold text-mist">
              View all products →
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductCategories
