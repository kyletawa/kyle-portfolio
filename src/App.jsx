import { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import TerminalPanel from './components/TerminalPanel'
import GraphView from './components/GraphView'
import StackScene from './components/StackScene'
import FieldNotes from './components/FieldNotes'
import Contact from './components/Contact'

const SECTIONS = {
  hero: { id: 'hero', label: 'About' },
  terminal: { id: 'terminal', label: 'Terminal' },
  projects: { id: 'projects', label: 'Projects' },
  graph: { id: 'graph', label: 'Graph' },
  stack: { id: 'stack', label: 'Stack' },
  insights: { id: 'insights', label: 'Insights' },
  contact: { id: 'contact', label: 'Contact' },
}

export default function App() {
  const [activeTab, setActiveTab] = useState('hero')
  const sectionRefs = useRef({})

  const scrollTo = (sectionId) => {
    const el = sectionRefs.current[sectionId]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveTab(sectionId)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.section
            if (id) setActiveTab(id)
          }
        })
      },
      { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el
  }

  return (
    <div className="min-h-screen relative">
      <Navbar
        sections={Object.values(SECTIONS)}
        activeTab={activeTab}
        onNavigate={scrollTo}
      />

      <main>
        <section ref={setRef('hero')} data-section="hero" id="hero">
          <Hero onNavigate={scrollTo} />
        </section>

        <section ref={setRef('terminal')} data-section="terminal" id="terminal" className="section-padding max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-xs font-mono text-[var(--cyan)] tracking-widest uppercase">~/Portfolio · Interactive Shell · Zsh</span>
            <h2 className="heading-serif text-4xl md:text-5xl text-white mt-2">Try the terminal.</h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl">
              A real shell. Click in and type <code className="text-[var(--cyan)]">help</code> — or try{' '}
              <code className="text-[var(--cyan)]">whoami</code>,{' '}
              <code className="text-[var(--cyan)]">projects</code>,{' '}
              <code className="text-[var(--cyan)]">skills</code>,{' '}
              <code className="text-[var(--cyan)]">certs</code>,{' '}
              <code className="text-[var(--cyan)]">matrix</code>. Tab completes. ↑/↓ history.
            </p>
          </div>
          <TerminalPanel />
        </section>

        <section ref={setRef('projects')} data-section="projects" id="projects" className="section-padding max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-mono text-[var(--gold)] tracking-widest uppercase">More Work · Open Source</span>
            <h2 className="heading-serif text-4xl md:text-5xl text-white mt-2">The rest of the shelf.</h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl">
              Every project is a live repository. Hover for details, click to open source on GitHub.
            </p>
          </div>
          <ProjectsGrid />
        </section>

        <section ref={setRef('graph')} data-section="graph" id="graph" className="section-padding max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-mono text-[var(--cyan)] tracking-widest uppercase">Repository Graph</span>
            <h2 className="heading-serif text-4xl md:text-5xl text-white mt-2">The whole constellation.</h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl">
              Every public repo, wired by theme — like an Obsidian vault. Drag a node, hover to trace its links, click to jump to GitHub.
            </p>
          </div>
          <GraphView />
        </section>

        <section ref={setRef('stack')} data-section="stack" id="stack" className="section-padding max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-mono text-[var(--cyan)] tracking-widest uppercase">Built With</span>
            <h2 className="heading-serif text-4xl md:text-5xl text-white mt-2">The tools I ship with. Nothing else.</h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl">
              Not a LinkedIn-endorsed list. Only what's in my actual repos. Hover the cluster — they react.
            </p>
          </div>
          <StackScene />
        </section>

        <section ref={setRef('insights')} data-section="insights" id="insights" className="section-padding max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-mono text-[var(--cyan)] tracking-widest uppercase">Field Notes · Updated June 2026</span>
            <h2 className="heading-serif text-4xl md:text-5xl text-white mt-2">Things I keep relearning.</h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl">
              Short notes from building the projects above — on how systems break, and what makes good ones hold.
            </p>
          </div>
          <FieldNotes />
        </section>

        <section ref={setRef('contact')} data-section="contact" id="contact" className="section-padding max-w-4xl mx-auto">
          <Contact />
        </section>
      </main>

      <footer className="text-center py-8 border-t border-[var(--border-subtle)]">
        <p className="text-sm text-[var(--text-muted)] font-mono">
          © 2026 Kyle.exe · Built in Cape Town, South Africa
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
          <span className="text-[var(--cyan)]">Timezone:</span> SAST (UTC+2)
        </p>
      </footer>
    </div>
  )
}