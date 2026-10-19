import { site } from '../../data/site'

function EnquiryFallback({ subject }) {
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
        <span className="font-semibold text-forest/60">WhatsApp coming soon</span>
      </div>
    </div>
  )
}

export default EnquiryFallback
