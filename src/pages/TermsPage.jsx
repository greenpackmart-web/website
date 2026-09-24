import PageHero from '../components/PageHero'
import { site } from '../data/site'

const sections = [
  {
    title: 'About these terms',
    text: 'These terms govern your use of this website. By browsing it, you accept them. They do not replace the specific terms of any quote or order confirmation we agree on by email.',
  },
  {
    title: 'Products and ordering',
    text: 'This website is informational — orders are placed and confirmed by email. Prices, MOQs, lead times and specifications on this site are indicative and finalized in your written quote.',
  },
  {
    title: 'Product information',
    text: 'We describe our products as accurately as we can. Sizes, packing and specifications may vary by production batch; your quote confirms the exact details for your order.',
  },
  {
    title: 'Intellectual property',
    text: 'All content on this website — text, logo and design — belongs to GreenpackMart and may not be copied for commercial use without permission.',
  },
  {
    title: 'Limitation of liability',
    text: 'This website is provided as-is. We are not liable for decisions made solely on the basis of website content without a confirmed order or quote.',
  },
  {
    title: 'Contact',
    text: `Questions about these terms? Email ${site.email}.`,
  },
]

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        text="The ground rules for using this website and ordering from us."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          {sections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="font-heading text-lg font-bold text-forest">
                {section.title}
              </h2>
              <p className="mt-2 leading-relaxed text-pine/70">{section.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default TermsPage
