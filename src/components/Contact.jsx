import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'kylechihata@gmail.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const input = document.createElement('input')
      input.value = email
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="text-center">
      <h2 className="heading-serif text-4xl md:text-5xl text-white mb-4">
        Have a build that needs shipping?
      </h2>
      <p className="text-[var(--text-muted)] max-w-lg mx-auto mb-10">
        Open for internships, freelance security work, and collaborations.
        Based in Cape Town, available remotely.
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--cyan)] text-[var(--cyan)] rounded-lg hover:bg-[var(--cyan)]/10 transition-all font-mono text-sm group"
        >
          {copied ? (
            <>Copied! ✓</>
          ) : (
            <>
              <span className="text-base">📋</span>
              Copy email
            </>
          )}
        </button>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <a
            href="https://www.linkedin.com/in/tawandachihata/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-muted)] hover:border-[var(--cyan)] hover:text-white transition-all font-mono"
          >
            LinkedIn
            <span className="text-xs">&#8599;</span>
          </a>
          <a
            href="https://github.com/kyletawa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-muted)] hover:border-[var(--cyan)] hover:text-white transition-all font-mono"
          >
            GitHub
            <span className="text-xs">&#8599;</span>
          </a>
          <a
            href="https://x.com/KyleChihata"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-muted)] hover:border-[var(--cyan)] hover:text-white transition-all font-mono"
          >
            X / Twitter
            <span className="text-xs">&#8599;</span>
          </a>
          <a
            href="https://www.facebook.com/KyleChihata/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-muted)] hover:border-[var(--cyan)] hover:text-white transition-all font-mono"
          >
            Facebook
            <span className="text-xs">&#8599;</span>
          </a>
          <a
            href="https://www.reddit.com/user/blackkaiiser/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-muted)] hover:border-[var(--cyan)] hover:text-white transition-all font-mono"
          >
            Reddit
            <span className="text-xs">&#8599;</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] w-full max-w-md">
          <p className="text-sm text-[var(--text-muted)] font-mono">
            <span className="text-[var(--text-primary)]">Email:</span> {email}
          </p>
          <p className="text-sm text-[var(--text-muted)] font-mono mt-1">
            <span className="text-[var(--text-primary)]">Phone:</span> +27 69 850 9575
          </p>
          <p className="text-sm text-[var(--text-muted)] font-mono mt-1">
            <span className="text-[var(--text-primary)]">Location:</span> Cape Town, South Africa
          </p>
        </div>
      </div>
    </div>
  )
}