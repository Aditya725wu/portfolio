import { useContent } from '../ContentContext'

export default function Navbar({ activePanel, onNavigate }) {
  const { data } = useContent()
  const { navItems } = data
  return (
    <nav
      className="sticky top-0 z-20 flex items-center justify-end overflow-x-auto rounded-bl-[20px] rounded-tr-[20px] bg-navbar px-1 sm:px-3"
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
                className={`relative px-3.5 py-4 font-heading text-sm font-medium tracking-wide transition-colors duration-300 sm:px-5 ${
                  isActive
                    ? 'text-gold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-2 left-3.5 right-3.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300 sm:left-5 sm:right-5 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
