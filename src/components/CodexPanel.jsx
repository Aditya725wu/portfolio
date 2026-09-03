import { useState } from 'react'
import { useContent } from '../ContentContext'
import { gadgetIcons, GamepadIcon } from './Icons'

const statusTone = {
  'In rotation': 'text-gold bg-accent-soft',
  Next: 'text-ink bg-sidebar border border-line',
  Queued: 'text-muted bg-sidebar border border-line',
}

function Overview() {
  const { data } = useContent()
  const { pulse } = data
  return (
    <div className="animate-fade-in">
      <p className="text-sm font-medium tracking-wide text-gold">Personal OS</p>
      <h2 className="mt-2 font-heading text-3xl font-bold text-ink">Codex</h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/80">
        This is the second layer of the site — not the resume. It is the log of how I actually
        work: daily notes, DSA, system design, tools, and the off-hours that keep me sharp.
        Use the inner sidebar to move around. Nothing here is a certificate wall.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { k: 'Daily', v: 'Work notes, not a blog' },
          { k: 'Craft', v: 'DSA + design in public' },
          { k: 'Person', v: 'Cricket, games, IoT' },
        ].map((item) => (
          <div key={item.k} className="rounded-[14px] border border-line bg-inset p-4">
            <p className="font-heading text-sm font-semibold text-gold">{item.k}</p>
            <p className="mt-1 text-sm text-muted">{item.v}</p>
          </div>
        ))}
      </div>
      <ul className="mt-8 space-y-2">
        {pulse.values.map((value) => (
          <li
            key={value}
            className="rounded-[12px] border border-line bg-inset px-4 py-3 text-sm text-ink/85"
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Daily() {
  const { data } = useContent()
  const { dailyLog } = data
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-2xl font-bold text-ink">Daily log</h2>
      <p className="mt-2 text-sm text-muted">
        What I did, not what I plan to pretend I did. Newest first.
      </p>
      <ol className="mt-8 space-y-5">
        {dailyLog.map((entry) => (
          <li key={entry.date + entry.title} className="rounded-[14px] border border-line bg-inset p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-gold">
                {entry.date}
              </span>
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-2 font-heading text-base font-semibold text-ink">{entry.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{entry.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Dsa() {
  const { data } = useContent()
  const { dsaTrack, socials } = data
  const leetcode = socials.find((item) => item.id === 'leetcode')
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-2xl font-bold text-ink">DSA path</h2>
      <p className="mt-2 text-sm text-muted">
        Tracked on{' '}
        <a
          href={leetcode?.href || 'https://leetcode.com/u/adityakharade576/'}
          className="font-medium text-gold"
          target="_blank"
          rel="noreferrer"
        >
          LeetCode
        </a>
        . Status is honest — queued means I have not lived it yet.
      </p>
      <div className="mt-8 space-y-3">
        {dsaTrack.map((row) => (
          <article
            key={row.topic}
            className="flex flex-col gap-2 rounded-[14px] border border-line bg-inset p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-heading text-sm font-semibold text-ink">{row.topic}</h3>
              <p className="mt-1 text-sm text-muted">{row.note}</p>
            </div>
            <span
              className={`w-fit shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusTone[row.status] || 'text-muted bg-sidebar border border-line'}`}
            >
              {row.status}
            </span>
          </article>
        ))}
      </div>
    </div>
  )
}

function Design() {
  const { data } = useContent()
  const { designNotes } = data
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-2xl font-bold text-ink">System design</h2>
      <p className="mt-2 text-sm text-muted">
        Notes from intern APIs, AWS dashboards, and the diagrams I redraw until they are boring.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {designNotes.map((note) => (
          <article key={note.title} className="rounded-[14px] border border-line bg-inset p-5">
            <h3 className="font-heading text-base font-semibold text-ink">{note.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{note.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function Assets() {
  const { data } = useContent()
  const { workAssets, gadgets } = data
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-2xl font-bold text-ink">Assets</h2>
      <p className="mt-2 text-sm text-muted">
        Software and platforms I actually open for work — not a tool graveyard.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {workAssets.map((item) => (
          <article key={item.name} className="rounded-[14px] border border-line bg-inset p-4">
            <h3 className="font-heading text-sm font-semibold text-gold">{item.name}</h3>
            <p className="mt-1 text-sm text-ink/75">{item.use}</p>
          </article>
        ))}
      </div>
      <h3 className="mt-10 font-heading text-lg font-semibold text-ink">Hardware</h3>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {gadgets.map((item) => {
          const Icon = gadgetIcons[item.kind]
          return (
            <article key={item.id} className="rounded-[14px] border border-line bg-inset p-4">
              {Icon ? <Icon className="h-5 w-5 text-gold" /> : null}
              <h4 className="mt-2 font-heading text-sm font-semibold text-ink">{item.name}</h4>
              <p className="mt-1 text-xs text-muted">{item.detail}</p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Notes() {
  const { data } = useContent()
  const { longNotes } = data
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-2xl font-bold text-ink">Notes</h2>
      <p className="mt-2 text-sm text-muted">Longer thinking that does not belong on the resume.</p>
      <div className="mt-8 space-y-5">
        {longNotes.map((note) => (
          <article key={note.title} className="rounded-[14px] border border-line bg-inset p-5">
            <h3 className="font-heading text-base font-semibold text-ink">{note.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/75">{note.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function SecondBrain() {
  const { data } = useContent()
  const concepts = data.secondBrain || []
  const [filter, setFilter] = useState('all')
  const tags = [...new Set(concepts.flatMap((item) => item.tags))].sort()

  const visible =
    filter === 'all' ? concepts : concepts.filter((item) => item.tags.includes(filter))

  function goRelated(item) {
    if (!item.targetId) return
    const target = concepts.find((c) => c.id === item.targetId)
    if (target) {
      const match = target.tags.includes(filter) || filter === 'all'
      if (!match) setFilter('all')
      window.requestAnimationFrame(() => {
        document.getElementById(`brain-${item.targetId}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      })
    } else {
      setFilter(item.label)
    }
  }

  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-2xl font-bold text-ink">Second Brain</h2>
      <p className="mt-2 text-sm text-muted">
        Concepts I keep explaining to myself. Filter by tag. Related links jump to another card.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {['all', ...tags].map((tag) => {
          const isActive = filter === tag
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                isActive
                  ? 'bg-sidebar text-gold'
                  : 'border border-line bg-inset text-muted hover:text-ink'
              }`}
            >
              {tag === 'all' ? 'All' : `#${tag}`}
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 nav:grid-cols-2">
        {visible.map((concept) => (
          <article
            id={`brain-${concept.id}`}
            key={concept.id}
            className="flex flex-col rounded-[14px] border border-line bg-inset p-5"
          >
            <h3 className="font-heading text-base font-semibold text-ink">{concept.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/75">{concept.body}</p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
              <span className="font-medium text-gold">Related</span>
              {(concept.related || []).map((link) => (
                <button
                  key={`${link.kind}-${link.label}`}
                  type="button"
                  onClick={() => goRelated(link)}
                  className="text-left text-muted hover:text-gold"
                >
                  → {link.kind}: {link.label}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function Pulse() {
  const { data } = useContent()
  const { pulse, games } = data
  return (
    <div className="animate-fade-in">
      <h2 className="font-heading text-2xl font-bold text-ink">Off hours</h2>
      <p className="mt-2 text-sm text-muted">
        The rest of the personality — still mine, just not the hiring packet.
      </p>
      <div className="mt-8 space-y-4">
        <article className="rounded-[14px] border border-line bg-inset p-5">
          <h3 className="font-heading text-sm font-semibold text-gold">Cricket</h3>
          <p className="mt-2 text-sm text-ink/75">{pulse.sports}</p>
        </article>
        <article className="rounded-[14px] border border-line bg-inset p-5">
          <h3 className="font-heading text-sm font-semibold text-gold">Tinkering</h3>
          <p className="mt-2 text-sm text-ink/75">{pulse.tinkering}</p>
        </article>
      </div>
      <h3 className="mt-10 font-heading text-lg font-semibold text-ink">Games I play</h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {games.map((game) => (
          <article key={game.id} className="rounded-[14px] border border-line bg-inset p-4">
            <div className="flex items-center gap-2 text-gold">
              <GamepadIcon className="h-4 w-4" />
              <h4 className="font-heading text-sm font-semibold text-ink">{game.name}</h4>
            </div>
            <p className="mt-2 text-xs text-muted">
              {game.platform} · {game.genre}
            </p>
            <p className="mt-3 font-mono text-xs text-gold/90">{game.playerId}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

const views = {
  overview: Overview,
  daily: Daily,
  dsa: Dsa,
  design: Design,
  assets: Assets,
  notes: Notes,
  brain: SecondBrain,
  pulse: Pulse,
}

export default function CodexPanel() {
  const { data } = useContent()
  const { codexNav } = data
  const [section, setSection] = useState('overview')
  const View = views[section] || Overview

  return (
    <div className="-mx-5 -mb-8 flex min-h-[70vh] flex-col border-t border-line sm:-mx-8 nav:-mx-10 nav:-mb-10 nav:flex-row">
      <aside className="shrink-0 border-b border-line bg-inset/80 px-3 py-4 nav:w-[220px] nav:border-b-0 nav:border-r">
        <p className="px-3 pb-3 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Codex
        </p>
        <nav aria-label="Codex sections">
          <ul className="flex gap-1 overflow-x-auto nav:flex-col nav:overflow-visible">
            {codexNav.map((item) => {
              const isActive = item.id === section
              return (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sidebar text-gold'
                        : 'text-muted hover:bg-sidebar hover:text-ink'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? 'bg-gold' : 'bg-line'
                      }`}
                    />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <div key={section} className="min-w-0 flex-1 px-5 py-8 sm:px-8">
        <View />
      </div>
    </div>
  )
}
