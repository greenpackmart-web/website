import { site } from '../../data/site'

function EnquiryFallback({ subject }) {
  const message = encodeURIComponent(
    'Hello GreenPackMart, I would like to discuss an order.'
  )

  return (
    <div className="rounded-2xl border border-mist bg-cream px-6 py-5 text-center text-sm text-pine/70">
      Prefer another channel?
      <div className="mt-3 flex flex-wrap justify-center gap-4">
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}`}
          className="font-semibold text-forest underline underline-offset-4 transition hover:text-leaf"
        >
          Email us directly
        </a>
        <span aria-hidden="true">·</span>
        <a
          href={`https://wa.me/${site.whatsapp}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-forest underline underline-offset-4 transition hover:text-leaf"
        >
          WhatsApp us
        </a>
      </div>
    </div>
  )
}

export default EnquiryFallback
