import { Link } from 'react-router-dom'
import { productCategories } from '../data/products'
import ProductImage from '../components/ProductImage'
import SectionHeading from '../components/SectionHeading'

function ProductsPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Product Range"
          title="Every eco product your business needs"
          text="Seven categories, all made from natural plant materials, all export-grade. Click any category for sizes, specs and minimum order quantities."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/products/${category.slug}`}
              className="group rounded-3xl border border-mist bg-cream p-6 transition hover:-translate-y-1 hover:border-leaf/60 hover:shadow-lg hover:shadow-forest/5"
            >
              <ProductImage name={category.name} image={category.image} />
              <h2 className="mt-4 font-heading text-lg font-bold text-forest transition group-hover:text-leaf">
                {category.name}
              </h2>
              <p className="mt-2 text-sm text-pine/70">{category.blurb}</p>
              <p className="mt-4 text-sm font-semibold text-leaf">
                View specs →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
