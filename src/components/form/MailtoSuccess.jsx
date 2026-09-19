import { useState } from 'react'

function MailtoSuccess({ mailtoHref, messageText, onReset, resetLabel }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(messageText)
    setCopied(true)
  }

  return (
    <div className="rounded-3xl border border-mist bg-cream p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tint">
        <svg
          className="h-7 w-7 text-forest"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="mt-4 font-heading text-2xl font-extrabold text-forest">
        Your email app should have opened
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-pine/70">
        All your details are pre-filled — just press send. Using webmail or no
        mail app opened? Copy the message below and send it to us yourself.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <a
          href={mailtoHref}
          className="rounded-full bg-leaf px-8 py-3 font-heading font-semibold text-white shadow-lg shadow-leaf/30 transition hover:bg-forest"
        >
          Open the email again
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border-2 border-forest/15 bg-white px-8 py-3 font-heading font-semibold text-forest transition hover:border-forest/40"
        >
          {copied ? 'Copied ✓' : 'Copy message text'}
        </button>
      </div>
      <div className="mt-6 rounded-2xl border border-mist bg-white p-4 text-left">
        <p className="whitespace-pre-line text-xs leading-relaxed text-pine/70">
          {messageText}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 block w-full text-sm font-medium text-sage transition hover:text-forest"
      >
        {resetLabel}
      </button>
    </div>
  )
}

export default MailtoSuccess
