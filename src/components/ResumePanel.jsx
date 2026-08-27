import { achievements, education, experience, skillGroups } from '../content'
import { AwardIcon } from './Icons'

function Timeline({ items }) {
  return (
    <ol className="relative ml-2 border-l border-line pl-6">
      {items.map((entry) => (
        <li key={entry.id} className="relative pb-8 last:pb-0">
          <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-inset" />
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {entry.dates}
          </p>
          <h4 className="mt-1 font-heading text-base font-semibold text-ink">
            {entry.title}
          </h4>
          <p className="text-sm text-muted">{entry.company}</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-ink/75">
            {entry.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

export default function ResumePanel() {
  return (
    <div>
      <h2 className="font-heading text-3xl font-bold text-ink">Resume</h2>
      <p className="mt-2 text-muted">Experience, education, and the tools I use day to day.</p>

      <div className="mt-10 grid grid-cols-1 gap-12 nav:grid-cols-2">
        <section>
          <h3 className="mb-6 font-heading text-xl font-semibold text-ink">
            Experience
          </h3>
          <Timeline items={experience} />
        </section>

        <div>
          <section>
            <h3 className="mb-6 font-heading text-xl font-semibold text-ink">
              Education
            </h3>
            <Timeline items={education} />
          </section>

          <section className="mt-10">
            <h3 className="mb-5 font-heading text-xl font-semibold text-ink">
              Achievements
            </h3>
            <ul className="space-y-3">
              {achievements.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-[12px] border border-line bg-inset p-3.5 text-sm leading-relaxed text-ink/80"
                >
                  <span className="mt-0.5 shrink-0 text-accent">
                    <AwardIcon className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-12">
        <h3 className="font-heading text-xl font-semibold text-ink">Skills</h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.id}
              className="rounded-[14px] border border-line bg-inset p-5"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                <h4 className="font-heading text-sm font-semibold tracking-wide text-gold">
                  {group.title}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-line bg-sidebar px-2.5 py-1 text-[13px] font-medium text-ink/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
