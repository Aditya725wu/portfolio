import { useState } from 'react'
import { profile } from '../content'

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  profile.mapQuery,
)}&z=12&output=embed`

export default function ContactPanel() {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setStatus(
      'Thanks — this form is a placeholder. Wire it up later with Formspree or EmailJS.',
    )
  }

  return (
    <div>
      <h2 className="font-heading text-3xl font-bold text-ink">Contact</h2>
      <p className="mt-2 text-muted">Say hello — the map is a placeholder for your city.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 nav:grid-cols-2">
        <div className="overflow-hidden rounded-[14px] border border-line bg-inset">
          <iframe
            title={`Map of ${profile.mapQuery}`}
            src={mapSrc}
            className="h-[320px] w-full border-0 nav:h-full nav:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[14px] border border-line bg-inset p-6"
        >
          <label className="block text-sm font-medium text-ink">
            Name
            <input
              required
              name="name"
              type="text"
              placeholder="Your name"
              className="mt-1.5 w-full rounded-[10px] border border-line bg-sidebar px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-gold"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Email
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-[10px] border border-line bg-sidebar px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-gold"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink">
            Message
            <textarea
              required
              name="message"
              rows={6}
              placeholder="What would you like to talk about?"
              className="mt-1.5 w-full resize-y rounded-[10px] border border-line bg-sidebar px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-gold"
            />
          </label>

          <button
            type="submit"
            className="mt-5 w-full rounded-[10px] bg-gold py-3 text-sm font-semibold text-sidebar"
          >
            Submit
          </button>

          {status ? (
            <p className="mt-4 rounded-[10px] bg-accent-soft px-3 py-2.5 text-sm text-accent">
              {status}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  )
}
