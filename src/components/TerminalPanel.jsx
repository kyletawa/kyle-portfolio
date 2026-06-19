import { useState, useRef, useEffect, useCallback } from 'react'

const COMMANDS = {
  help: {
    desc: 'Available commands',
    output: () => {
      const cmds = Object.entries(COMMANDS).filter(([k]) => k !== 'help' && k !== '_default')
      return cmds.map(([name, data]) =>
        `  ${name.padEnd(12)} ${data.desc}`
      ).join('\n')
    }
  },
  whoami: {
    desc: 'About Kyle',
    output: `Tawanda "Kyle" Chihata\n  Role: IT Support → Penetration Tester\n  Location: Cape Town, South Africa\n  Focus: Cybersecurity, Bug Bounty, AI Automation\n  Current Build: Selene OS — AI-driven pentest stack`
  },
  projects: {
    desc: 'List featured projects',
    output: `  pentest-toolkit      — Recon scripts & reverse shell generators\n  kyletawa/kyletawa     — GitHub profile README\n  kyle-portfolio       — This very site (React + Vite)\n  social-eng-toolkit   — Phishing & awareness training\n  gorden-sweets        — Freelance client project\n  ctf-writeups         — 6 documented walkthroughs`
  },
  skills: {
    desc: 'Technical skillset',
    output: `  Linux/Ubuntu          Nmap              Python\n  Bash/Zsh              Burp Suite         JavaScript\n  Web Exploitation      Metasploit         React\n  Active Directory      Wireshark          Git\n  Privilege Escalation  Tailscale          Networking (Cisco)`
  },
  certs: {
    desc: 'Certifications roadmap',
    output: `  [in progress]  CompTIA Security+ (SY0-701)\n  [in progress]  (ISC)² Certified in Cybersecurity (CC)\n  [planned]      eJPT (after Security+)\n  [working]      PortSwigger Web Security Academy`
  },
  matrix: {
    desc: 'Activate the Matrix',
    output: () => {
      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
      let rain = ''
      for (let i = 0; i < 10; i++) {
        let row = ''
        for (let j = 0; j < 40; j++) {
          row += chars[Math.floor(Math.random() * chars.length)] + ' '
        }
        rain += row + '\n'
      }
      return rain
    }
  },
  clear: {
    desc: 'Clear terminal',
    output: '__CLEAR__'
  },
  contact: {
    desc: 'Contact information',
    output: `  LinkedIn   → https://linkedin.com/in/tawandachihata\n  GitHub     → https://github.com/kyletawa\n  X/Twitter  → https://x.com/KyleChihata\n  Email      → kylechihata@gmail.com\n  Phone      → +27 69 850 9575`
  },
  ls: {
    desc: 'List sections',
    output: `  about/      terminal/   projects/   graph/\n  stack/      insights/   contact/`
  },
  date: {
    desc: 'Current date & time',
    output: () => new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }) + ' SAST'
  },
  github: {
    desc: 'Open GitHub profile',
    output: 'Opening https://github.com/kyletawa ...'
  },
}

COMMANDS._default = {
  desc: 'Command not found',
  output: (cmd) => `zsh: command not found: ${cmd}\nType 'help' for available commands.`
}

export default function TerminalPanel() {
  const [history, setHistory] = useState([
    { text: 'Last login: ' + new Date().toLocaleDateString('en-ZA') + ' on ttys000', type: 'output' },
    { text: 'Welcome to kyle.exe', type: 'output' },
    { text: "Type 'help' to begin.", type: 'output' },
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setCommandHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const cmdObj = COMMANDS[trimmed]
    let output

    if (trimmed === 'clear') {
      setHistory([])
      return
    }

    if (cmdObj) {
      output = typeof cmdObj.output === 'function' ? cmdObj.output() : cmdObj.output
      if (trimmed === 'github') {
        window.open('https://github.com/kyletawa', '_blank')
      }
    } else {
      output = COMMANDS._default.output(trimmed)
    }

    setHistory((prev) => [
      ...prev,
      { text: `kyle@exe ~ % ${trimmed}`, type: 'input' },
      ...output.split('\n').map((line) => ({ text: line, type: 'output' })),
    ])
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input)
      setInput('')
      setSuggestions([])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length > 0) {
        setInput(suggestions[0])
        setSuggestions([])
      }
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)

    if (value.length > 0) {
      const matches = Object.keys(COMMANDS).filter(
        (k) => k !== '_default' && k.startsWith(value.toLowerCase())
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  return (
    <div
      className="terminal-window w-full cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="text-xs text-[var(--text-muted)] ml-2 font-mono">kyle@exe — -zsh</span>
      </div>

      <div ref={terminalRef} className="terminal-body" style={{ minHeight: '320px' }}>
        {history.map((line, i) => (
          <div
            key={i}
            className={`terminal-line ${line.type === 'input' ? 'text-[var(--cyan)]' : 'text-[var(--text-muted)]'}`}
          >
            {line.text}
          </div>
        ))}

        <div className="terminal-prompt">
          <span className="text-[var(--cyan)] shrink-0">kyle@exe</span>
          <span className="text-[var(--text-muted)] shrink-0"> % </span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="terminal-input w-full"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
            {suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 mb-1 bg-[#161b22] border border-[var(--border-subtle)] rounded-lg py-1 px-2 text-xs text-[var(--text-muted)]">
                Tab: {suggestions[0]}
                {suggestions.length > 1 && ` (+${suggestions.length - 1} more)`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}