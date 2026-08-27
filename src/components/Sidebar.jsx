import { useState } from 'react'
import { contacts, profile, socials } from '../content'
import {
  ChevronIcon,
  contactIcons,
  DownloadIcon,
  socialIcons,
} from './Icons'

export default function Sidebar() {
  const [contactsOpen, setContactsOpen] = useState(false)

  return (
    <aside className="flex w-full flex-col bg-sidebar px-6 py-8 text-cream nav:fixed nav:inset-y-0 nav:left-0 nav:h-screen nav:w-[300px] nav:overflow-y-auto">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-gradient-to-br from-gold via-[#f0c14b] to-[#8a7010] p-[3px]">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-inset font-heading text-3xl font-semibold tracking-wide">
              {profile.initials}
            </div>
          )}
        </div>

        <h1 className="mt-5 font-heading text-[1.65rem] font-bold leading-tight">
          {profile.name}
        </h1>
        <span className="mt-2 rounded-full bg-inset px-3 py-1 text-xs font-medium tracking-wide text-accent">
          {profile.title}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setContactsOpen((open) => !open)}
        className="mt-6 flex w-full items-center justify-between rounded-[10px] bg-inset px-4 py-3 text-sm font-medium text-cream/90"
        aria-expanded={contactsOpen}
      >
        Show Contacts
        <ChevronIcon open={contactsOpen} />
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          contactsOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <ul className="mt-3 space-y-2">
          {contacts.map((item) => {
            const Icon = contactIcons[item.id]
            const inner = (
              <>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-inset text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-[11px] uppercase tracking-wider text-cream/45">
                    {item.label}
                  </span>
                  <span className="block truncate text-sm text-cream/90">
                    {item.value}
                  </span>
                </span>
              </>
            )

            return (
              <li key={item.id}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-[10px] bg-inset/60 px-3 py-2.5"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-[10px] bg-inset/60 px-3 py-2.5">
                    {inner}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <a
        href={profile.resumeUrl}
        download
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold px-4 py-3 text-sm font-semibold text-sidebar"
      >
        <DownloadIcon className="h-4 w-4" />
        Download Resume
      </a>

      <div className="mt-5 flex items-center justify-center gap-3">
        {socials.map((item) => {
          const Icon = socialIcons[item.id]
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-inset text-cream/75 transition-colors hover:bg-gold hover:text-sidebar"
            >
              <Icon className="h-4 w-4" />
            </a>
          )
        })}
      </div>

    </aside>
  )
}
