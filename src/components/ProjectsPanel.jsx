import { useState } from 'react'
import { useContent } from '../ContentContext'
import { GithubIcon, projectIcons } from './Icons'

const thumbGradients = [
  'from-[#2b2b2c] to-[#5c4a18]',
  'from-[#1a1a1a] to-[#8a7010]',
  'from-[#2b2b2c] to-[#ffdb70]/50',
]

export default function ProjectsPanel() {
  const { data } = useContent()
  const { projectFilters, projects } = data
  const [filter, setFilter] = useState('All')
  const visible =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <div>
      <h2 className="font-heading text-3xl font-bold text-ink">Projects</h2>
      <p className="mt-2 text-muted">A few things I have built and shipped.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {projectFilters.map((item) => {
          const isActive = item === filter
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                isActive
                    ? 'bg-gold text-sidebar'
                    : 'border border-line bg-inset text-muted hover:scale-[1.03] hover:text-ink'
              }`}
            >
              {item}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
        {visible.map((project, index) => {
          const Icon = projectIcons[project.category] || projectIcons.Web
          return (
            <article
              key={project.id}
              className="card-lift stagger-child overflow-hidden rounded-[14px] border border-line bg-inset"
              style={{ '--delay': `${index * 80}ms` }}
            >
              <div
                className={`flex h-32 items-center justify-center bg-gradient-to-br text-white ${
                  thumbGradients[index % thumbGradients.length]
                }`}
              >
                <Icon className="h-9 w-9" />
              </div>
              <div className="p-5">
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
                  {project.category}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  View on GitHub →
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
