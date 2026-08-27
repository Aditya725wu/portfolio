import { useRef, useState } from 'react'
import AboutPanel from './components/AboutPanel'
import ContactPanel from './components/ContactPanel'
import Navbar from './components/Navbar'
import ProjectsPanel from './components/ProjectsPanel'
import ResumePanel from './components/ResumePanel'
import Sidebar from './components/Sidebar'

const panels = {
  about: AboutPanel,
  resume: ResumePanel,
  projects: ProjectsPanel,
  contact: ContactPanel,
}

export default function App() {
  const [activePanel, setActivePanel] = useState('about')
  const contentRef = useRef(null)
  const Panel = panels[activePanel]

  function handleNavigate(id) {
    setActivePanel(id)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-page font-sans nav:h-screen nav:overflow-hidden">
      <Sidebar />
      <main
        ref={contentRef}
        className="min-h-screen p-4 sm:p-6 nav:ml-[300px] nav:h-screen nav:overflow-y-auto nav:p-8"
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_16px_50px_rgba(0,0,0,0.35)]">
          <Navbar activePanel={activePanel} onNavigate={handleNavigate} />
          <div key={activePanel} className="animate-fade-in px-5 py-8 sm:px-8 nav:px-10 nav:py-10">
            <Panel />
          </div>
        </div>
      </main>
    </div>
  )
}
