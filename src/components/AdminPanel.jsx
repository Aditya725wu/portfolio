import { useState } from 'react'
import { cloneDefaults } from '../content'
import { useContent } from '../ContentContext'

const sections = [
  { id: 'profile', label: 'Profile', hint: 'Name, photo, bio' },
  { id: 'contact', label: 'Contacts', hint: 'Email, socials' },
  { id: 'about', label: 'About', hint: 'Skills, companies' },
  { id: 'resume', label: 'Resume', hint: 'Jobs, school, skills' },
  { id: 'projects', label: 'Projects', hint: 'Add repos' },
  { id: 'codex', label: 'Codex', hint: 'Logs, DSA, notes' },
  { id: 'play', label: 'Off hours', hint: 'Games, gadgets' },
  { id: 'backup', label: 'Backup', hint: 'Export / PIN' },
]

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`
}

function Field({ label, value, onChange, textarea, type = 'text', placeholder = '' }) {
  const cls =
    'mt-1.5 w-full rounded-xl border border-line bg-[#16171c] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-white/25 focus:border-gold'
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
      {label}
      {textarea ? (
        <textarea
          className={`${cls} min-h-28 resize-y`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={cls}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
}

function AddButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gold/35 bg-gold/5 px-4 py-4 font-heading text-sm font-semibold text-gold transition-all hover:border-gold hover:bg-gold/10"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-base text-sidebar">
        +
      </span>
      {children}
    </button>
  )
}

function EditorCard({ title, subtitle, onRemove, children, startOpen = false }) {
  const [open, setOpen] = useState(startOpen)
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex items-center gap-3 px-4 py-3">
        <button type="button" onClick={() => setOpen((v) => !v)} className="min-w-0 flex-1 text-left">
          <p className="truncate font-heading text-sm font-semibold text-ink">{title || 'Untitled'}</p>
          {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-xs font-medium text-gold"
        >
          {open ? 'Close' : 'Edit'}
        </button>
        {onRemove ? (
          <button type="button" onClick={onRemove} className="text-xs text-muted hover:text-red-400">
            Delete
          </button>
        ) : null}
      </div>
      {open ? <div className="grid gap-3 border-t border-line p-4">{children}</div> : null}
    </article>
  )
}

function ChipEditor({ label, items, onChange, placeholder }) {
  const [value, setValue] = useState('')
  function add() {
    const next = value.trim()
    if (!next) return
    onChange([...items, next])
    setValue('')
  }
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-inset px-3 py-1 text-sm text-ink"
          >
            {item}
            <button
              type="button"
              className="text-muted hover:text-gold"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          className="flex-1 rounded-xl border border-line bg-[#16171c] px-3.5 py-2.5 text-sm outline-none placeholder:text-white/25 focus:border-gold"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-xl bg-gold px-4 text-sm font-semibold text-sidebar"
        >
          Add
        </button>
      </div>
    </div>
  )
}

function SectionHead({ title, copy }) {
  return (
    <div className="mb-6">
      <h2 className="font-heading text-2xl font-bold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-muted">{copy}</p>
    </div>
  )
}

export default function AdminPanel({ onClose }) {
  const { data, save, reset, checkPin, setPin, isUnlocked, unlock, lock } = useContent()
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(data)))
  const [section, setSection] = useState('profile')
  const [pin, setPinInput] = useState('')
  const [authed, setAuthed] = useState(isUnlocked())
  const [message, setMessage] = useState('')
  const [newPin, setNewPin] = useState('')
  const [openId, setOpenId] = useState('')

  function patch(path, value) {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let cur = next
      for (let i = 0; i < keys.length - 1; i += 1) cur = cur[keys[i]]
      cur[keys[keys.length - 1]] = value
      return next
    })
  }

  function insert(key, item, atStart = true) {
    setDraft((prev) => {
      const current = Array.isArray(prev[key]) ? prev[key] : []
      const list = atStart ? [item, ...current] : [...current, item]
      return { ...prev, [key]: list }
    })
    setOpenId(item.id || item.title || item.topic || item.name)
    setMessage('')
  }

  function persist() {
    save(draft)
    setMessage('Saved — the live site in this browser is updated.')
  }

  function handleLogin(event) {
    event.preventDefault()
    if (checkPin(pin)) {
      unlock()
      setAuthed(true)
      setPinInput('')
      setMessage('')
    } else {
      setMessage('Wrong PIN.')
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-line bg-card p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Studio</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-ink">Admin</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Default PIN <span className="text-gold">ak725</span>. Change it after login. This only hides the
            editor from casual visitors.
          </p>
          <input
            className="mt-6 w-full rounded-xl border border-line bg-[#16171c] px-4 py-3 text-sm outline-none focus:border-gold"
            type="password"
            value={pin}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="Enter PIN"
          />
          <button type="submit" className="mt-4 w-full rounded-xl bg-gold py-3 text-sm font-semibold text-sidebar">
            Unlock
          </button>
          <button type="button" onClick={onClose} className="mt-3 w-full text-sm text-muted">
            Back to site
          </button>
          {message ? <p className="mt-3 text-sm text-gold">{message}</p> : null}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page text-ink nav:h-screen nav:overflow-hidden">
      <div className="flex flex-col nav:h-screen nav:flex-row">
        <aside className="flex shrink-0 flex-col border-b border-line bg-[#16171c] px-3 py-5 nav:w-[240px] nav:border-b-0 nav:border-r">
          <p className="px-3 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Content studio
          </p>
          <p className="px-3 pb-4 pt-1 text-xs text-muted">Insert anything. Then Save.</p>
          <ul className="flex gap-1 overflow-x-auto nav:flex-1 nav:flex-col nav:overflow-y-auto">
            {sections.map((item) => (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`w-full rounded-xl px-3 py-2.5 text-left ${
                    section === item.id ? 'bg-inset' : 'hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`block text-sm font-medium ${
                      section === item.id ? 'text-gold' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="hidden text-[11px] text-muted nav:block">{item.hint}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 px-1">
            <button
              type="button"
              onClick={persist}
              className="w-full rounded-xl bg-gold py-2.5 text-sm font-semibold text-sidebar"
            >
              Save changes
            </button>
            <button type="button" onClick={onClose} className="w-full py-1 text-sm text-muted hover:text-ink">
              View live site
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1 overflow-y-auto p-5 nav:p-10">
          <div className="mx-auto max-w-2xl">
            {message ? (
              <p className="mb-5 rounded-xl bg-accent-soft px-4 py-3 text-sm text-gold">{message}</p>
            ) : null}

            {section === 'profile' ? (
              <div className="space-y-4">
                <SectionHead title="Profile" copy="Who shows up in the sidebar and hero copy." />
                <div className="grid gap-4 rounded-2xl border border-line bg-card p-5">
                  <Field label="Name" value={draft.profile.name} onChange={(v) => patch('profile.name', v)} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Initials" value={draft.profile.initials} onChange={(v) => patch('profile.initials', v)} />
                    <Field label="Title" value={draft.profile.title} onChange={(v) => patch('profile.title', v)} />
                  </div>
                  <Field label="Subtitle" value={draft.profile.subtitle} onChange={(v) => patch('profile.subtitle', v)} />
                  <Field
                    label="Avatar URL"
                    placeholder="/avatar.png"
                    value={draft.profile.avatarUrl}
                    onChange={(v) => patch('profile.avatarUrl', v)}
                  />
                  <Field
                    label="Resume URL"
                    placeholder="/resume.pdf"
                    value={draft.profile.resumeUrl}
                    onChange={(v) => patch('profile.resumeUrl', v)}
                  />
                  <Field label="Map city" value={draft.profile.mapQuery} onChange={(v) => patch('profile.mapQuery', v)} />
                  <ChipEditor
                    label="Bio paragraphs"
                    items={draft.profile.bio}
                    placeholder="Type a paragraph, then Add"
                    onChange={(items) => patch('profile.bio', items)}
                  />
                </div>
              </div>
            ) : null}

            {section === 'contact' ? (
              <div className="space-y-4">
                <SectionHead title="Contacts" copy="Add a new phone, email, or social — not only the defaults." />
                <AddButton
                  onClick={() =>
                    insert('contacts', { id: uid('c'), label: 'New contact', value: '', href: '' })
                  }
                >
                  Add contact
                </AddButton>
                {draft.contacts.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.label || 'Contact'}
                    subtitle={item.value}
                    startOpen={openId === item.id}
                    onRemove={() => patch('contacts', draft.contacts.filter((_, i) => i !== index))}
                  >
                    <Field label="Label" value={item.label} onChange={(v) => patch(`contacts.${index}.label`, v)} />
                    <Field label="Value" value={item.value} onChange={(v) => patch(`contacts.${index}.value`, v)} />
                    <Field
                      label="Link"
                      placeholder="mailto: or tel:"
                      value={item.href || ''}
                      onChange={(v) => patch(`contacts.${index}.href`, v || null)}
                    />
                  </EditorCard>
                ))}
                <AddButton
                  onClick={() =>
                    insert('socials', { id: uid('s'), label: 'New link', href: 'https://' })
                  }
                >
                  Add social / link
                </AddButton>
                {draft.socials.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.label || item.id}
                    subtitle={item.href}
                    startOpen={openId === item.id}
                    onRemove={() => patch('socials', draft.socials.filter((_, i) => i !== index))}
                  >
                    <Field label="Label" value={item.label} onChange={(v) => patch(`socials.${index}.label`, v)} />
                    <Field label="URL" value={item.href} onChange={(v) => patch(`socials.${index}.href`, v)} />
                  </EditorCard>
                ))}
              </div>
            ) : null}

            {section === 'about' ? (
              <div className="space-y-4">
                <SectionHead title="About" copy="Add service cards, companies, and hobbies as new chips." />
                <AddButton
                  onClick={() =>
                    insert('services', {
                      id: uid('svc'),
                      title: 'New skill',
                      description: 'One line about what you do.',
                    })
                  }
                >
                  Add “What I’m doing” card
                </AddButton>
                {draft.services.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.title}
                    subtitle={item.description}
                    startOpen={openId === item.id}
                    onRemove={() => patch('services', draft.services.filter((_, i) => i !== index))}
                  >
                    <Field label="Title" value={item.title} onChange={(v) => patch(`services.${index}.title`, v)} />
                    <Field
                      textarea
                      label="Description"
                      value={item.description}
                      onChange={(v) => patch(`services.${index}.description`, v)}
                    />
                  </EditorCard>
                ))}
                <div className="rounded-2xl border border-line bg-card p-5">
                  <ChipEditor
                    label="Worked with"
                    items={draft.companies}
                    placeholder="Company or school name"
                    onChange={(items) => patch('companies', items)}
                  />
                </div>
                <div className="rounded-2xl border border-line bg-card p-5">
                  <ChipEditor
                    label="Hobbies"
                    items={draft.hobbies}
                    placeholder="e.g. Cricket"
                    onChange={(items) => patch('hobbies', items)}
                  />
                </div>
              </div>
            ) : null}

            {section === 'resume' ? (
              <div className="space-y-5">
                <SectionHead title="Resume" copy="Drop in a new job, degree, highlight, or skill group anytime." />
                <AddButton
                  onClick={() =>
                    insert('experience', {
                      id: uid('exp'),
                      dates: 'Year — Year',
                      title: 'New role',
                      company: 'Company',
                      achievements: ['What you did.'],
                    })
                  }
                >
                  Add experience
                </AddButton>
                {draft.experience.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.title}
                    subtitle={`${item.company} · ${item.dates}`}
                    startOpen={openId === item.id}
                    onRemove={() => patch('experience', draft.experience.filter((_, i) => i !== index))}
                  >
                    <Field label="Dates" value={item.dates} onChange={(v) => patch(`experience.${index}.dates`, v)} />
                    <Field label="Title" value={item.title} onChange={(v) => patch(`experience.${index}.title`, v)} />
                    <Field label="Company" value={item.company} onChange={(v) => patch(`experience.${index}.company`, v)} />
                    <ChipEditor
                      label="Achievements"
                      items={item.achievements}
                      placeholder="One bullet, then Add"
                      onChange={(items) => patch(`experience.${index}.achievements`, items)}
                    />
                  </EditorCard>
                ))}

                <AddButton
                  onClick={() =>
                    insert('education', {
                      id: uid('edu'),
                      dates: 'Year — Year',
                      title: 'New degree',
                      company: 'School',
                      achievements: ['Note'],
                    })
                  }
                >
                  Add education
                </AddButton>
                {draft.education.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.title}
                    subtitle={`${item.company} · ${item.dates}`}
                    startOpen={openId === item.id}
                    onRemove={() => patch('education', draft.education.filter((_, i) => i !== index))}
                  >
                    <Field label="Dates" value={item.dates} onChange={(v) => patch(`education.${index}.dates`, v)} />
                    <Field label="Title" value={item.title} onChange={(v) => patch(`education.${index}.title`, v)} />
                    <Field label="School" value={item.company} onChange={(v) => patch(`education.${index}.company`, v)} />
                    <ChipEditor
                      label="Notes"
                      items={item.achievements}
                      placeholder="One line, then Add"
                      onChange={(items) => patch(`education.${index}.achievements`, items)}
                    />
                  </EditorCard>
                ))}

                <div className="rounded-2xl border border-line bg-card p-5">
                  <ChipEditor
                    label="Achievement list"
                    items={draft.achievements}
                    placeholder="New highlight"
                    onChange={(items) => patch('achievements', items)}
                  />
                </div>

                <AddButton
                  onClick={() =>
                    insert('skillGroups', {
                      id: uid('sk'),
                      title: 'New group',
                      items: ['Skill'],
                    })
                  }
                >
                  Add skill group
                </AddButton>
                {draft.skillGroups.map((group, index) => (
                  <EditorCard
                    key={group.id}
                    title={group.title}
                    subtitle={`${group.items.length} skills`}
                    startOpen={openId === group.id}
                    onRemove={() => patch('skillGroups', draft.skillGroups.filter((_, i) => i !== index))}
                  >
                    <Field label="Group name" value={group.title} onChange={(v) => patch(`skillGroups.${index}.title`, v)} />
                    <ChipEditor
                      label="Skills"
                      items={group.items}
                      placeholder="e.g. React"
                      onChange={(items) => patch(`skillGroups.${index}.items`, items)}
                    />
                  </EditorCard>
                ))}
              </div>
            ) : null}

            {section === 'projects' ? (
              <div className="space-y-4">
                <SectionHead title="Projects" copy="Add a new repo card. Filters update from the category you type." />
                <AddButton
                  onClick={() =>
                    insert('projects', {
                      id: uid('proj'),
                      title: 'New project',
                      category: 'Web',
                      description: 'One line about it.',
                      github: 'https://github.com/Aditya725wu',
                    })
                  }
                >
                  Add project
                </AddButton>
                <div className="rounded-2xl border border-line bg-card p-5">
                  <ChipEditor
                    label="Filter buttons"
                    items={draft.projectFilters}
                    placeholder="e.g. All or Web"
                    onChange={(items) => patch('projectFilters', items)}
                  />
                </div>
                {draft.projects.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.title}
                    subtitle={item.category}
                    startOpen={openId === item.id}
                    onRemove={() => patch('projects', draft.projects.filter((_, i) => i !== index))}
                  >
                    <Field label="Title" value={item.title} onChange={(v) => patch(`projects.${index}.title`, v)} />
                    <Field
                      label="Category"
                      placeholder="Web, Cloud, AI…"
                      value={item.category}
                      onChange={(v) => patch(`projects.${index}.category`, v)}
                    />
                    <Field
                      textarea
                      label="Description"
                      value={item.description}
                      onChange={(v) => patch(`projects.${index}.description`, v)}
                    />
                    <Field label="GitHub URL" value={item.github} onChange={(v) => patch(`projects.${index}.github`, v)} />
                  </EditorCard>
                ))}
              </div>
            ) : null}

            {section === 'codex' ? (
              <div className="space-y-5">
                <SectionHead title="Codex" copy="New daily notes, DSA topics, design cards, tools, and long notes." />
                <AddButton
                  onClick={() =>
                    insert('dailyLog', {
                      id: uid('log'),
                      date: new Date().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }),
                      title: 'New log',
                      tags: ['Work'],
                      body: '',
                    })
                  }
                >
                  Add daily log
                </AddButton>
                {draft.dailyLog.map((item, index) => (
                  <EditorCard
                    key={item.id || `${item.date}-${index}`}
                    title={item.title}
                    subtitle={item.date}
                    startOpen={openId === item.id}
                    onRemove={() => patch('dailyLog', draft.dailyLog.filter((_, i) => i !== index))}
                  >
                    <Field label="Date" value={item.date} onChange={(v) => patch(`dailyLog.${index}.date`, v)} />
                    <Field label="Title" value={item.title} onChange={(v) => patch(`dailyLog.${index}.title`, v)} />
                    <ChipEditor
                      label="Tags"
                      items={item.tags}
                      placeholder="DSA"
                      onChange={(items) => patch(`dailyLog.${index}.tags`, items)}
                    />
                    <Field textarea label="Note" value={item.body} onChange={(v) => patch(`dailyLog.${index}.body`, v)} />
                  </EditorCard>
                ))}

                <AddButton
                  onClick={() =>
                    insert('dsaTrack', {
                      id: uid('dsa'),
                      topic: 'New topic',
                      status: 'Queued',
                      note: '',
                    })
                  }
                >
                  Add DSA topic
                </AddButton>
                {draft.dsaTrack.map((item, index) => (
                  <EditorCard
                    key={item.id || item.topic}
                    title={item.topic}
                    subtitle={item.status}
                    startOpen={openId === item.id}
                    onRemove={() => patch('dsaTrack', draft.dsaTrack.filter((_, i) => i !== index))}
                  >
                    <Field label="Topic" value={item.topic} onChange={(v) => patch(`dsaTrack.${index}.topic`, v)} />
                    <Field
                      label="Status"
                      placeholder="In rotation / Next / Queued"
                      value={item.status}
                      onChange={(v) => patch(`dsaTrack.${index}.status`, v)}
                    />
                    <Field label="Note" value={item.note} onChange={(v) => patch(`dsaTrack.${index}.note`, v)} />
                  </EditorCard>
                ))}

                <AddButton
                  onClick={() =>
                    insert('designNotes', { id: uid('ds'), title: 'New design note', body: '' })
                  }
                >
                  Add system-design note
                </AddButton>
                {draft.designNotes.map((item, index) => (
                  <EditorCard
                    key={item.id || item.title}
                    title={item.title}
                    startOpen={openId === item.id}
                    onRemove={() => patch('designNotes', draft.designNotes.filter((_, i) => i !== index))}
                  >
                    <Field label="Title" value={item.title} onChange={(v) => patch(`designNotes.${index}.title`, v)} />
                    <Field textarea label="Body" value={item.body} onChange={(v) => patch(`designNotes.${index}.body`, v)} />
                  </EditorCard>
                ))}

                <AddButton
                  onClick={() => insert('workAssets', { id: uid('as'), name: 'New tool', use: '' })}
                >
                  Add tool / asset
                </AddButton>
                {draft.workAssets.map((item, index) => (
                  <EditorCard
                    key={item.id || item.name}
                    title={item.name}
                    subtitle={item.use}
                    startOpen={openId === item.id}
                    onRemove={() => patch('workAssets', draft.workAssets.filter((_, i) => i !== index))}
                  >
                    <Field label="Name" value={item.name} onChange={(v) => patch(`workAssets.${index}.name`, v)} />
                    <Field label="How you use it" value={item.use} onChange={(v) => patch(`workAssets.${index}.use`, v)} />
                  </EditorCard>
                ))}

                <AddButton
                  onClick={() => insert('longNotes', { id: uid('nt'), title: 'New note', body: '' })}
                >
                  Add long note
                </AddButton>
                {draft.longNotes.map((item, index) => (
                  <EditorCard
                    key={item.id || item.title}
                    title={item.title}
                    startOpen={openId === item.id}
                    onRemove={() => patch('longNotes', draft.longNotes.filter((_, i) => i !== index))}
                  >
                    <Field label="Title" value={item.title} onChange={(v) => patch(`longNotes.${index}.title`, v)} />
                    <Field textarea label="Body" value={item.body} onChange={(v) => patch(`longNotes.${index}.body`, v)} />
                  </EditorCard>
                ))}

                <AddButton
                  onClick={() =>
                    insert('secondBrain', {
                      id: uid('br'),
                      title: 'New concept',
                      tags: ['tools'],
                      body: 'Explain it to yourself in two or three sentences.',
                      related: [{ kind: 'see also', label: '', targetId: '' }],
                    })
                  }
                >
                  Add Second Brain concept
                </AddButton>
                {(draft.secondBrain || []).map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.title}
                    subtitle={(item.tags || []).map((t) => `#${t}`).join(' ')}
                    startOpen={openId === item.id}
                    onRemove={() =>
                      patch(
                        'secondBrain',
                        draft.secondBrain.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <Field label="Title" value={item.title} onChange={(v) => patch(`secondBrain.${index}.title`, v)} />
                    <ChipEditor
                      label="Tags"
                      items={item.tags || []}
                      placeholder="dsa"
                      onChange={(items) => patch(`secondBrain.${index}.tags`, items)}
                    />
                    <Field
                      textarea
                      label="Body"
                      value={item.body}
                      onChange={(v) => patch(`secondBrain.${index}.body`, v)}
                    />
                    <Field
                      label="Related (one per line: kind | label | target-id)"
                      textarea
                      value={(item.related || [])
                        .map((r) => `${r.kind} | ${r.label} | ${r.targetId || ''}`)
                        .join('\n')}
                      onChange={(v) =>
                        patch(
                          `secondBrain.${index}.related`,
                          v
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line) => {
                              const [kind = 'see also', label = '', targetId = ''] = line
                                .split('|')
                                .map((s) => s.trim())
                              return { kind, label, targetId }
                            }),
                        )
                      }
                    />
                  </EditorCard>
                ))}

                <div className="rounded-2xl border border-line bg-card p-5">
                  <ChipEditor
                    label="Values"
                    items={draft.pulse.values}
                    placeholder="A principle"
                    onChange={(items) => patch('pulse.values', items)}
                  />
                  <div className="mt-4 grid gap-3">
                    <Field textarea label="Sports" value={draft.pulse.sports} onChange={(v) => patch('pulse.sports', v)} />
                    <Field
                      textarea
                      label="Tinkering"
                      value={draft.pulse.tinkering}
                      onChange={(v) => patch('pulse.tinkering', v)}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {section === 'play' ? (
              <div className="space-y-4">
                <SectionHead title="Off hours" copy="Add a game with its ID, or a gadget with the model you own." />
                <AddButton
                  onClick={() =>
                    insert('games', {
                      id: uid('g'),
                      name: 'New game',
                      platform: 'PC',
                      genre: '',
                      playerId: '',
                    })
                  }
                >
                  Add game
                </AddButton>
                {draft.games.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.name}
                    subtitle={item.playerId}
                    startOpen={openId === item.id}
                    onRemove={() => patch('games', draft.games.filter((_, i) => i !== index))}
                  >
                    <Field label="Game" value={item.name} onChange={(v) => patch(`games.${index}.name`, v)} />
                    <Field label="Platform" value={item.platform} onChange={(v) => patch(`games.${index}.platform`, v)} />
                    <Field label="Genre" value={item.genre} onChange={(v) => patch(`games.${index}.genre`, v)} />
                    <Field label="Player ID" value={item.playerId} onChange={(v) => patch(`games.${index}.playerId`, v)} />
                  </EditorCard>
                ))}
                <AddButton
                  onClick={() =>
                    insert('gadgets', {
                      id: uid('gd'),
                      name: 'New gadget',
                      detail: 'Model',
                      kind: 'laptop',
                    })
                  }
                >
                  Add gadget
                </AddButton>
                {draft.gadgets.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.name}
                    subtitle={item.detail}
                    startOpen={openId === item.id}
                    onRemove={() => patch('gadgets', draft.gadgets.filter((_, i) => i !== index))}
                  >
                    <Field label="Name" value={item.name} onChange={(v) => patch(`gadgets.${index}.name`, v)} />
                    <Field label="Model / detail" value={item.detail} onChange={(v) => patch(`gadgets.${index}.detail`, v)} />
                    <Field
                      label="Icon kind"
                      placeholder="laptop, mouse, keyboard, headset, phone, earbuds"
                      value={item.kind}
                      onChange={(v) => patch(`gadgets.${index}.kind`, v)}
                    />
                  </EditorCard>
                ))}
              </div>
            ) : null}

            {section === 'backup' ? (
              <div className="space-y-4">
                <SectionHead
                  title="Backup"
                  copy="This browser stores your edits. Export JSON if you want a file copy."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="rounded-2xl bg-gold px-4 py-4 text-sm font-semibold text-sidebar"
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'portfolio-content.json'
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                  >
                    Export JSON
                  </button>
                  <label className="rounded-2xl border border-line bg-card px-4 py-4 text-sm text-muted">
                    Import JSON
                    <input
                      type="file"
                      accept="application/json"
                      className="mt-2 block w-full text-xs text-ink"
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = () => {
                          try {
                            const parsed = JSON.parse(String(reader.result))
                            const merged = { ...cloneDefaults(), ...parsed }
                            setDraft(merged)
                            save(merged)
                            setMessage('Imported and saved.')
                          } catch {
                            setMessage('That file is not valid JSON.')
                          }
                        }
                        reader.readAsText(file)
                      }}
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-muted hover:text-gold"
                  onClick={() => {
                    reset()
                    setDraft(cloneDefaults())
                    setMessage('Reset to original built-in content.')
                  }}
                >
                  Reset to original
                </button>
                <div className="rounded-2xl border border-line bg-card p-5">
                  <Field label="New PIN" value={newPin} onChange={setNewPin} type="password" />
                  <button
                    type="button"
                    className="mt-3 text-sm font-semibold text-gold"
                    onClick={() => {
                      if (newPin.length < 4) {
                        setMessage('PIN should be at least 4 characters.')
                        return
                      }
                      setPin(newPin)
                      setNewPin('')
                      setMessage('PIN updated.')
                    }}
                  >
                    Change PIN
                  </button>
                </div>
                <button
                  type="button"
                  className="text-sm text-muted"
                  onClick={() => {
                    lock()
                    setAuthed(false)
                  }}
                >
                  Lock admin
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
