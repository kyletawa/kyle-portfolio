export default function Navbar({ sections, activeTab, onNavigate }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[var(--bg-deep)]/80 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 text-white font-bold font-mono hover:text-[var(--cyan)] transition-colors"
        >
          <span className="text-[var(--cyan)] text-lg">~</span>
          <span className="hidden sm:inline">Kyle.exe</span>
        </button>

        <div className="flex items-center gap-1">
          {sections.filter(s => s.id !== 'hero').map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`nav-tab text-xs sm:text-sm ${
                activeTab === section.id ? 'active' : ''
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[var(--cyan)] text-[var(--cyan)] text-xs font-mono hover:bg-[var(--cyan)]/10 transition-all"
        >
          Say hello
          <span className="text-base">&#8599;</span>
        </button>
      </div>
    </nav>
  )
}