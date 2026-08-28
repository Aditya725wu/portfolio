import { useEffect, useRef, useState } from 'react'
import AboutPanel from './components/AboutPanel'
import AdminPanel from './components/AdminPanel'
import CodexPanel from './components/CodexPanel'
import ContactPanel from './components/ContactPanel'
import Navbar from './components/Navbar'
import ProjectsPanel from './components/ProjectsPanel'
import ResumePanel from './components/ResumePanel'
import Sidebar from './components/Sidebar'

const panels = {
  about: AboutPanel,
  resume: ResumePanel,
  projects: ProjectsPanel,
  codex: CodexPanel,
  contact: ContactPanel,
}

export default function App() {
  const [activePanel, setActivePanel] = useState('about')
  const [adminOpen, setAdminOpen] = useState(() => window.location.hash === '#admin')
  const contentRef = useRef(null)
  const Panel = panels[activePanel]
  const isCodex = activePanel === 'codex'

  useEffect(() => {
    function onHash() {
      setAdminOpen(window.location.hash === '#admin')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function handleNavigate(id) {
    setActivePanel(id)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openAdmin() {
    window.location.hash = 'admin'
    setAdminOpen(true)
  }

  function closeAdmin() {
    window.location.hash = ''
    setAdminOpen(false)
  }

  if (adminOpen) {
    return <AdminPanel onClose={closeAdmin} />
  }

  return (
    <div className="min-h-screen bg-page font-sans nav:h-screen nav:overflow-hidden">
      <Sidebar onOpenAdmin={openAdmin} />
      <main
        ref={contentRef}
        className="min-h-screen p-4 sm:p-6 nav:ml-[300px] nav:h-screen nav:overflow-y-auto nav:p-8"
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_16px_50px_rgba(0,0,0,0.35)] animate-rise">
          <Navbar activePanel={activePanel} onNavigate={handleNavigate} />
          <div
            key={activePanel}
            className={
              isCodex
                ? 'animate-fade-in px-5 pt-0 sm:px-8 nav:px-10'
                : 'animate-fade-in px-5 py-8 sm:px-8 nav:px-10 nav:py-10'
            }
          >
            <Panel />
          </div>
        </div>
      </main>
    </div>
  )
}
