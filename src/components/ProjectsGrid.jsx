const projects = [
  {
    title: 'Pentest Toolkit',
    category: 'SECURITY · AUTOMATION',
    description: 'Recon scripts, reverse shell generators, and utilities I reach for on every box. Fully automated nmap → enumeration → exploitation pipeline.',
    tags: ['Bash', 'Nmap', 'Automation'],
    github: 'https://github.com/kyletawa/pentest-toolkit',
    snippet: 'autorecon.sh 10.10.123.45 MyRoom --quick',
  },
  {
    title: 'HTB Connected',
    category: 'PENTEST · CVE EXPLOIT',
    description: 'Autonomous root via CVE-2025-57819: FreePBX SQLi → cron webshell → incron privesc. Zero manual intervention from Selene OS agent.',
    tags: ['SQLi', 'FreePBX', 'Privesc'],
    github: 'https://github.com/kyletawa/kyletawa/tree/main/ctf-writeups/htb-connected.md',
    snippet: 'CVE-2025-57819 · fcafee4eede9 (user) · 7ca047107ebb (root)',
  },
  {
    title: 'Bug Bounty — Code.org',
    category: 'BUG BOUNTY · WEB',
    description: 'First live Bugcrowd P3 submission. Admin route enumeration and Rails debug-mode disclosure via config.consider_all_requests_local.',
    tags: ['Rails', 'Bugcrowd', 'Disclosure'],
    github: 'https://bugcrowd.com/',
    snippet: 'P3 · config.consider_all_requests_local = true',
  },
  {
    title: 'Social Engineering Toolkit',
    category: 'AWARENESS · TRAINING',
    description: '16-scenario single-file HTML awareness tool covering phishing, pretexting, baiting, tailgating, and prevention tips.',
    tags: ['HTML', 'Security', 'Training'],
    github: 'https://github.com/kyletawa/kyletawa/blob/main/social-engineering-toolkit.html',
    snippet: '5 attack categories · 16 scenarios · 8 prevention tips',
  },
  {
    title: 'CTF Write-Up Portfolio',
    category: 'DOCUMENTATION',
    description: 'Professional walkthroughs across 6 rooms: All In One, Pickle Rick, Fowsniff, Takeover, Mr. Robot, and HTB Connected.',
    tags: ['Writeups', 'THM', 'HTB'],
    github: 'https://github.com/kyletawa/kyletawa/tree/main/ctf-writeups',
    snippet: '6 rooms · 70KB+ of documented walkthroughs',
  },
  {
    title: 'Selene OS',
    category: 'AI · AUTOMATION',
    description: 'Jarvis-style AI ops hub: Telegram bot, Hermes agent, wake-word voice, UFW automation, and authorized lab workflow support.',
    tags: ['AI', 'Python', 'Automation'],
    github: 'https://github.com/kyletawa',
    snippet: '754 cybersec skills · assisted lab workflow',
  },
  {
    title: 'Gordon\'s Sweets',
    category: 'FREELANCE · WEB DEV',
    description: 'Full design-to-deploy client project for a Cape Town candy manufacturer. React-based portfolio with product showcase.',
    tags: ['React', 'Vite', 'Freelance'],
    github: '#',
    snippet: 'Client project · Cape Town · React + Vite',
  },
  {
    title: 'kyle-portfolio',
    category: 'WEB · REACT',
    description: 'This portfolio site. Terminal-themed, dark mode, interactive graph, and real shell emulator — built with React + Vite.',
    tags: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/kyletawa/kyle-portfolio',
    snippet: 'React 19 · Vite 8 · Interactive terminal',
  },
  {
    title: '@kyletawa',
    category: 'PROFILE · README',
    description: 'GitHub profile README with animated banner, contribution snake, and live project links. Kyle.exe branding throughout.',
    tags: ['Markdown', 'GitHub', 'Branding'],
    github: 'https://github.com/kyletawa/kyletawa',
    snippet: '6 CTF writeups · animated SVG banner · 66+ hrs',
  },
]

export default function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, i) => (
        <a
          key={i}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 flex flex-col"
        >
          <span className="text-xs font-mono text-[var(--gold)] tracking-wider mb-2">
            {project.category}
          </span>
          <h3 className="text-lg font-semibold text-white group-hover:text-[var(--cyan)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mt-2 flex-1 leading-relaxed">
            {project.description}
          </p>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill text-[10px]">{tag}</span>
              ))}
            </div>
            {project.snippet && (
              <code className="text-xs text-[var(--cyan)]/70 font-mono block truncate">
                $ {project.snippet}
              </code>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}