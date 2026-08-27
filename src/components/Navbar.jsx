import { navItems } from '../content'

export default function Navbar({ activePanel, onNavigate }) {
  return (
    <nav
      className="sticky top-0 z-20 flex items-center justify-end overflow-x-auto rounded-bl-[20px] rounded-tr-[20px] bg-navbar px-2 sm:px-4"
      aria-label="Primary"
    >
      <ul className="flex min-w-max items-stretch">
        {navItems.map((item) => {
          const isActive = item.id === activePanel
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-5 py-4 font-heading text-sm font-medium tracking-wide transition-colors sm:px-7 ${
                  isActive
                    ? 'text-gold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
