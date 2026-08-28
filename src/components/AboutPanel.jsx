import { useContent } from '../ContentContext'
import { serviceIcons } from './Icons'

export default function AboutPanel() {
  const { data } = useContent()
  const { companies, hobbies, profile, services } = data
  return (
    <div>
      <p className="text-sm font-medium tracking-wide text-accent">👋 Hello!</p>
      <h2 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
        A bit about me
      </h2>
      <p className="mt-2 text-muted">{profile.subtitle}</p>

      <div className="mt-6 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink/80">
        {profile.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <h3 className="mt-12 font-heading text-xl font-semibold text-ink">
        What I&apos;m Doing
      </h3>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.id]
          return (
            <article
              key={service.id}
              className="card-lift stagger-child rounded-[14px] border border-line bg-inset p-5"
              style={{ '--delay': `${index * 80}ms` }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h4 className="mt-3 font-heading text-base font-semibold text-ink">
                {service.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          )
        })}
      </div>

      <h3 className="mt-12 font-heading text-xl font-semibold text-ink">
        Worked With
      </h3>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {companies.map((name) => (
          <span
            key={name}
            className="rounded-full border border-line bg-inset px-4 py-2 text-sm font-medium text-ink/80 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
          >
            {name}
          </span>
        ))}
      </div>

      <h3 className="mt-12 font-heading text-xl font-semibold text-ink">
        Hobbies & Interests
      </h3>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {hobbies.map((name) => (
          <span
            key={name}
            className="rounded-full border border-line bg-inset px-4 py-2 text-sm font-medium text-ink/80 transition-colors duration-300 hover:border-gold/40 hover:text-gold"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
