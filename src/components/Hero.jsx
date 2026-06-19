import { useEffect, useState } from 'react'

export default function Hero({ onNavigate }) {
  const [onlineTime, setOnlineTime] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000)
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0')
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
      const s = String(elapsed % 60).padStart(2, '0')
      setOnlineTime(`${h}:${m}:${s}`)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center section-padding relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--cyan)] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--gold)] blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Status line */}
        <div className="status-line flex items-center gap-4 mb-8">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
            Portfolio 2026
          </span>
          <span className="text-[var(--border-subtle)]">·</span>
          <span>Cape Town, South Africa</span>
        </div>

        {/* Name */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight">
          <span className="gradient-text">Kyle.exe</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-[var(--text-muted)] mt-4 max-w-3xl font-light leading-relaxed">
          <span className="text-white font-medium">Security</span> tools.{' '}
          <span className="text-white font-medium">Penetration</span> testing.{' '}
          <span className="text-white font-medium">AI-driven</span> automation.
        </p>

        {/* Bio */}
        <p className="text-base text-[var(--text-muted)] mt-6 max-w-2xl leading-relaxed">
          A cybersecurity practitioner from Cape Town, obsessed with how systems break —
          and how automation makes them unbreakable. IT support specialist turned penetration
          tester, building <span className="text-[var(--cyan)]">Selene OS</span>, an AI-driven
          pentest automation stack that autonomously rooted an HTB box end-to-end.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--cyan)] text-[var(--bg-deep)] font-semibold rounded-lg hover:bg-[var(--cyan)]/90 transition-all font-mono text-sm"
          >
            See the work
            <span className="text-lg">&#8594;</span>
          </button>
          <a
            href="https://github.com/kyletawa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg hover:border-[var(--cyan)] transition-all font-mono text-sm"
          >
            GitHub
            <span className="text-lg">&#8599;</span>
          </a>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 text-[var(--gold)] hover:text-white transition-all font-mono text-sm"
          >
            Contact
            <span className="text-lg">&#8594;</span>
          </button>
        </div>

        {/* Coordinates + Online time */}
        <div className="status-line flex items-center gap-6 mt-16 pt-8 border-t border-[var(--border-subtle)]">
          <span className="flex items-center gap-2">
            <span className="text-[var(--text-muted)]">Coordinates:</span>
            <span>33.9249° S</span>
            <span className="text-[var(--border-subtle)]">·</span>
            <span>18.4241° E</span>
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="text-[var(--text-muted)]">Online:</span>
            <span className="text-[var(--cyan)] font-mono">{onlineTime}</span>
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="text-[var(--text-muted)]">Status:</span>
            <span className="text-[var(--gold)]">Building</span>
          </span>
        </div>
      </div>
    </div>
  )
}