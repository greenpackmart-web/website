import { useState } from 'react'
import { faqs } from '../data/faq'

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-mist bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="font-heading font-semibold text-forest">
          {question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-leaf transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <p className="px-6 pb-5 text-sm leading-relaxed text-pine/70">
          {answer}
        </p>
      )}
    </div>
  )
}

function FaqAccordion() {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  )
}

export default FaqAccordion
