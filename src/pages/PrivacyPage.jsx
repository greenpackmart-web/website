import PageHero from '../components/PageHero'
import { site } from '../data/site'

const sections = [
  {
    title: 'What we collect',
    text: 'When you contact us by email or through our enquiry forms, we receive the details you choose to share — typically your name, email address, company and the content of your message.',
  },
  {
    title: 'How we use it',
    text: 'We use your information only to respond to your enquiry, prepare quotes and fulfil orders. We do not sell, rent or share your information with third parties for marketing purposes.',
  },
  {
    title: 'Cookies and tracking',
    text: 'This website is informational. We do not run advertising trackers or analytics that identify you personally.',
  },
  {
    title: 'Data retention',
    text: 'Enquiry correspondence is retained for as long as needed to serve you and to meet record-keeping obligations. You may ask us to delete your correspondence at any time.',
  },
  {
    title: 'Contact',
    text: `For any privacy question or request, email us at ${site.email}.`,
  },
]

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        text="How we handle the information you share with us. Plain language, no surprises."
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

export default PrivacyPage
