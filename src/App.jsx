import { useState, useEffect } from 'react';
import { Terminal, Shield, Wrench, Code2, Download, Sun, Moon, Mail, Phone, MapPin, ChevronRight, Search, FolderGit, FlaskConical, Award, FileText, Bug, BookOpen, ExternalLink, Folder, Briefcase, Link } from 'lucide-react';

const PROFILE = {
  name: "Tawanda 'Kyle' Chihata",
  location: "Cape Town, South Africa",
  email: "kylechihata@gmail.com",
  phone: "+27 69 850 9575",
  tagline: "IT Support Specialist transitioning into Cybersecurity",
  summary:
    "3+ years resolving real problems for real users — now pointing that same troubleshooting instinct at attackers. I diagnose networks, harden endpoints, and I'm building offensive security skills through TryHackMe, HackTheBox, and PortSwigger Academy. Looking for a cybersecurity internship or SOC/security-support role where IT fundamentals are an asset, not a gap.",
};

// EDIT ME: replace these placeholder URLs with your real profile links.
const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/your-username', icon: 'Briefcase' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/your-profile', icon: 'Link' },
  { name: 'TryHackMe', url: 'https://tryhackme.com/p/your-username', icon: 'FlaskConical' },
  { name: 'HackTheBox', url: 'https://app.hackthebox.com/profile/your-id', icon: 'Bug' },
];

// EDIT ME: each entry is a downloadable/linkable proof artifact.
// status: 'available' (link works) | 'coming-soon' (greyed out placeholder)
const CERT_BADGES = [
  { name: 'Vulnerability Assessment Report', icon: 'FileText', status: 'coming-soon', note: 'SME Nmap/Nessus sample report (sanitised)' },
  { name: 'Security Audit Sample', icon: 'Shield', status: 'coming-soon', note: 'Endpoint hardening audit writeup' },
  { name: 'Professional Case Study', icon: 'Folder', status: 'coming-soon', note: 'Support-to-security incident case study' },
  { name: 'Security Writeup', icon: 'BookOpen', status: 'coming-soon', note: 'THM room walkthrough' },
  { name: 'GitHub Security Tool', icon: 'FolderGit', status: 'coming-soon', note: 'CipherNest vuln scanner repo' },
  { name: 'Security+ (SY0-701)', icon: 'Award', status: 'in-progress', note: 'Certification in progress' },
];

// EDIT ME: writeups — link these to your GitHub/blog once published.
const WRITEUPS = [
  {
    id: 'wu-01',
    title: 'Fowsniff CTF — Walkthrough',
    platform: 'TryHackMe',
    summary: 'Credential reuse via leaked mail server creds, enumeration through to full compromise.',
    tags: ['Enumeration', 'Cred Reuse', 'CTF'],
    url: '#',
  },
  {
    id: 'wu-02',
    title: 'Pickle Rick — Walkthrough',
    platform: 'TryHackMe',
    summary: 'Recon, hidden directory discovery, and command injection leading to root access.',
    tags: ['Recon', 'CMD Injection'],
    url: '#',
  },
  {
    id: 'wu-03',
    title: 'Nmap Enumeration Notes',
    platform: 'Personal Notes',
    summary: 'Reference cheatsheet for scan types, timing flags, and reading service/version output.',
    tags: ['Nmap', 'Recon'],
    url: '#',
  },
  {
    id: 'wu-04',
    title: 'Linux Privilege Escalation Cheatsheet',
    platform: 'Personal Notes',
    summary: 'Checklist of common PrivEsc vectors — SUID binaries, cron jobs, sudo misconfigs, kernel exploits.',
    tags: ['PrivEsc', 'Linux'],
    url: '#',
  },
];

const BOOT_LOG = [
  {
    id: 'log-01',
    time: '2016 – 2018',
    tag: 'INIT',
    tagColor: 'neutral',
    host: 'makakavhule-clinic',
    title: 'Data Entry Clerk',
    org: 'Makakavhule Clinic',
    lines: [
      'mounted patient records database',
      'cross-referenced demographic data against physical forms',
      'generated weekly admin reports via MS Office',
    ],
  },
  {
    id: 'log-02',
    time: '2022 – 2024',
    tag: 'SUPPORT',
    tagColor: 'amber',
    host: 'individual-zone-solutions',
    title: 'Junior IT Support Technician',
    org: 'Individual Zone Solutions',
    lines: [
      'resolved first-line hardware / software / network tickets',
      'configured VPN tunnels and basic firewall rulesets',
      'hardened endpoints for secure remote access',
      'WARN: security tasks increasing as % of ticket volume',
    ],
  },
  {
    id: 'log-03',
    time: '2024 – 2025',
    tag: 'SUPPORT+',
    tagColor: 'amber',
    host: 'lbb-foods',
    title: 'IT Helpdesk Technician',
    org: 'LBB Foods',
    lines: [
      'resolved desktop incidents — OS reinstalls, driver conflicts, peripherals',
      'configured Wi-Fi routers, TCP/IP, DNS/DHCP, LAN topology',
      'nmap -sV scan across client subnet — flagged outdated services',
      'delivered low-cost security consultations off scan findings',
      'migrated client data to Google Drive / OneDrive with backup policy',
    ],
  },
  {
    id: 'log-04',
    time: '2025 – present',
    tag: 'SEC',
    tagColor: 'green',
    host: 'kyle-freelance',
    title: 'IT Support Consultant (Freelance)',
    org: 'Self-employed',
    lines: [
      'remote support via AnyDesk / TeamViewer for SME clients',
      'resolved IP conflicts, DNS/DHCP faults, cable/port isolation',
      'nmap + nessus vulnerability assessments for SME clients',
      'report: exposed services, outdated software, misconfigurations',
      'STATUS: pivot to offensive security in progress — see /labs',
    ],
  },
];

const SKILLS = [
  {
    category: 'IT Support & Networking',
    icon: 'Wrench',
    color: 'amber',
    items: [
      { name: 'Windows & Linux Administration', level: 90 },
      { name: 'Remote Troubleshooting (AnyDesk, TeamViewer)', level: 90 },
      { name: 'TCP/IP, DNS, DHCP, VPNs, Firewalls', level: 85 },
      { name: 'Hardware Diagnostics & Repair', level: 85 },
    ],
  },
  {
    category: 'Security Tooling',
    icon: 'Shield',
    color: 'green',
    items: [
      { name: 'Nmap (recon & vuln scanning)', level: 75 },
      { name: 'Nessus (vulnerability assessment)', level: 65 },
      { name: 'Burp Suite / PortSwigger labs', level: 55 },
      { name: 'Metasploit (guided exploitation)', level: 50 },
      { name: 'Linux privilege escalation', level: 50 },
    ],
  },
  {
    category: 'Development',
    icon: 'Code2',
    color: 'blue',
    items: [
      { name: 'Python', level: 65 },
      { name: 'JavaScript / React', level: 60 },
      { name: 'C++ / Visual Basic .NET', level: 55 },
      { name: 'HTML / CSS / Node.js', level: 60 },
    ],
  },
];

const PROJECTS = [
  {
    id: 'proj-01',
    title: 'Kyle.exe — Cyberpunk Portfolio',
    type: 'WEB DEV',
    status: 'live',
    description:
      'Personal brand site built with React and TailwindCSS — animated terminal UI and project showcase. The site you might be looking at right now.',
    stack: ['React', 'TailwindCSS', 'Vite'],
    githubUrl: 'https://github.com/your-username/kyle-exe-portfolio',
    demoUrl: '#',
  },
  {
    id: 'proj-02',
    title: 'CipherNest — Vuln Scanner Dashboard',
    type: 'SECURITY + DEV',
    status: 'in progress',
    description:
      'Cybersecurity-themed platform pairing a Node.js vulnerability scanner backend with a React dashboard for visualizing exposed ports, outdated services, and misconfigurations.',
    stack: ['Node.js', 'React', 'Nmap'],
    githubUrl: 'https://github.com/your-username/ciphernest',
    demoUrl: '#',
  },
  {
    id: 'proj-03',
    title: 'SME Vulnerability Audits',
    type: 'FIELD WORK',
    status: 'ongoing',
    description:
      'Freelance security consultations for small businesses — Nmap/Nessus sweeps translated into plain-language risk reports and remediation steps for non-technical owners.',
    stack: ['Nmap', 'Nessus', 'Reporting'],
    githubUrl: null,
    demoUrl: null,
  },
];

const LABS = [
  {
    id: 'lab-01',
    platform: 'TryHackMe',
    room: 'Guided Pentest: Web',
    summary: 'Full attack chain: enumeration → LFI → RCE → privilege escalation, on a guided box.',
    skills: ['LFI', 'Web Shells', 'PrivEsc'],
  },
  {
    id: 'lab-02',
    platform: 'TryHackMe',
    room: 'Pickle Rick',
    summary: 'Classic CTF-style room — recon, hidden directories, command injection to root.',
    skills: ['Recon', 'CMD Injection'],
  },
  {
    id: 'lab-03',
    platform: 'TryHackMe',
    room: 'Fowsniff CTF',
    summary: 'Credential reuse and mail server enumeration leading to full compromise.',
    skills: ['Enumeration', 'Cred Reuse'],
  },
  {
    id: 'lab-04',
    platform: 'PortSwigger',
    room: 'Web Security Academy — Server-Side',
    summary: 'Working through SSRF, server-side template injection, and request smuggling labs.',
    skills: ['SSRF', 'SSTI'],
  },
  {
    id: 'lab-05',
    platform: 'Hacker101',
    room: 'CTF',
    summary: 'Bug bounty fundamentals — building toward live program participation.',
    skills: ['Bug Bounty', 'Web App Sec'],
  },
  {
    id: 'lab-06',
    platform: 'HackTheBox',
    room: 'Retired Easy (queued)',
    summary: 'Next step in the roadmap — TJ Null list, with Ippsec walkthroughs as backup.',
    skills: ['Next Up'],
  },
];

const CERTS = [
  { name: 'CompTIA Security+ (SY0-701)', status: 'In Progress', note: 'Primary near-term target — Professor Messer + Jason Dion practice exams', priority: true },
  { name: 'eJPT', status: 'Planned', note: 'Following Security+, after more HTB reps', priority: true },
  { name: 'CompTIA A+ Core 1', status: 'In Progress', note: 'Foundational hardware/OS cert' },
  { name: '(ISC)² Certified in Cybersecurity (CC)', status: 'In Progress', note: 'Free entry-level security cert' },
  { name: 'ITIL Foundation V3', status: 'Working Knowledge', note: 'Service management fundamentals' },
];

const EDUCATION = [
  { school: 'Mutare Polytechnic', program: 'National Diploma in Information Technology', note: '(incomplete — ND1 complete)', date: 'May 2021' },
  { school: 'Mutare Polytechnic', program: 'National Certificate in Information Technology', note: '', date: 'November 2019' },
];

const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
};

const tagColorMap = {
  neutral: { dark: 'text-slate-400 border-slate-600 bg-slate-800/50', light: 'text-slate-500 border-slate-300 bg-slate-100' },
  amber: { dark: 'text-amber-400 border-amber-500/40 bg-amber-500/10', light: 'text-amber-700 border-amber-300 bg-amber-50' },
  green: { dark: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10', light: 'text-emerald-700 border-emerald-300 bg-emerald-50' },
  blue: { dark: 'text-sky-400 border-sky-500/40 bg-sky-500/10', light: 'text-sky-700 border-sky-300 bg-sky-50' },
};

function Tag({ color, theme, children }) {
  const c = tagColorMap[color] || tagColorMap.neutral;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border font-mono text-[11px] tracking-wide ${c[theme]}`}>
      {children}
    </span>
  );
}

function SectionHeading({ index, label, theme }) {
  return (
    <div className="flex items-baseline gap-3 mb-8">
      <span className={`font-mono text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{index}</span>
      <h2 className={`font-mono text-xl sm:text-2xl tracking-tight font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
        {label}
      </h2>
      <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />
    </div>
  );
}

function Hero({ theme, onDownload }) {
  const [bootLines, setBootLines] = useState([]);

  useEffect(() => {
    const fullLines = [
      `kyle@portfolio:~$ whoami`,
      PROFILE.name,
      `kyle@portfolio:~$ cat role.status`,
      `[SUPPORT] -> [SUPPORT+SEC] -> [SEC] ... transition: 62% complete`,
      `kyle@portfolio:~$ ./load_profile.sh`,
      `loading summary...`,
      `done.`,
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullLines.length) {
        setBootLines((prev) => [...prev, fullLines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 220);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 max-w-4xl mx-auto px-6">
      <div className={`rounded-lg border ${theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'} shadow-xl overflow-hidden`}>
        <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className={`ml-2 font-mono text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>kyle@portfolio — bash</span>
        </div>
        <div className="p-5 sm:p-8 font-mono text-sm leading-relaxed min-h-55">
          {bootLines.map((line, idx) => {
            const text = String(line);
            const isPrompt = text.startsWith('kyle@portfolio');
            const isStatus = text.startsWith('[SUPPORT]');
            return (
              <div key={idx} className={`mb-1 ${
                isPrompt
                  ? (theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600')
                  : isStatus
                    ? (theme === 'dark' ? 'text-amber-400' : 'text-amber-600')
                    : (theme === 'dark' ? 'text-slate-300' : 'text-slate-700')
              }`}>
                {line}
              </div>
            );
          })}
          <span className={`inline-block w-2 h-4 align-middle animate-pulse ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
        </div>
      </div>

      <div className="mt-10">
        <h1 className={`font-mono text-3xl sm:text-5xl font-bold tracking-tight ${theme === 'dark' ? 'text-slate-50' : 'text-slate-900'}`}>
          {PROFILE.name}
        </h1>
        <p className={`mt-3 text-lg sm:text-xl font-medium ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
          {PROFILE.tagline}
        </p>
        <p className={`mt-5 max-w-2xl text-base leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {PROFILE.summary}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onDownload}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm font-medium border transition-colors ${
              theme === 'dark'
                ? 'bg-emerald-500 text-slate-950 border-emerald-500 hover:bg-emerald-400'
                : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500'
            }`}
          >
            <Download size={16} /> Download résumé
          </button>
          <a
            href={`mailto:${PROFILE.email}`}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-sm font-medium border transition-colors ${
              theme === 'dark'
                ? 'border-slate-700 text-slate-200 hover:border-emerald-500 hover:text-emerald-400'
                : 'border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600'
            }`}
          >
            <Mail size={16} /> Contact
          </a>
        </div>

        <div className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
          <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {PROFILE.location}</span>
          <span className="inline-flex items-center gap-1.5"><Mail size={14} /> {PROFILE.email}</span>
          <span className="inline-flex items-center gap-1.5"><Phone size={14} /> {PROFILE.phone}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((link) => {
            const Icon = socialIconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-sm border transition-colors ${
                  theme === 'dark'
                    ? 'border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 bg-slate-900/40'
                    : 'border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 bg-white'
                }`}
              >
                <Icon size={15} /> {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TransitionTrack({ theme }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="01" label="career_log --follow" theme={theme} />
      <p className={`mb-10 text-sm max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        Each entry below is a real role from the résumé, written as a system log. Watch the tag
        column — it tracks the shift from pure support toward security work, without ever
        dropping the support skill set.
      </p>

      <div className="relative">
        <div className={`absolute left-1.75 top-2 bottom-2 w-px ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />

        <div className="space-y-8">
          {BOOT_LOG.map((entry) => (
            <div key={entry.id} className="relative pl-8">
              <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                entry.tagColor === 'green'
                  ? (theme === 'dark' ? 'bg-emerald-400 border-emerald-400' : 'bg-emerald-500 border-emerald-500')
                  : entry.tagColor === 'amber'
                    ? (theme === 'dark' ? 'bg-amber-400 border-amber-400' : 'bg-amber-500 border-amber-500')
                    : (theme === 'dark' ? 'bg-slate-600 border-slate-600' : 'bg-slate-300 border-slate-300')
              }`} />

              <div className={`rounded-lg border p-4 sm:p-5 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Tag color={entry.tagColor} theme={theme}>{entry.tag}</Tag>
                  <span className={`font-mono text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{entry.time}</span>
                  <span className={`font-mono text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>@{entry.host}</span>
                </div>
                <h3 className={`font-semibold text-base ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                  {entry.title} <span className={`font-normal ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>— {entry.org}</span>
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {entry.lines.map((line, i) => {
                    const isWarn = line.startsWith('WARN');
                    const isStatus = line.startsWith('STATUS');
                    return (
                      <li key={i} className={`font-mono text-[13px] flex items-start gap-2 ${
                        isWarn
                          ? (theme === 'dark' ? 'text-amber-400' : 'text-amber-600')
                          : isStatus
                            ? (theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600')
                            : (theme === 'dark' ? 'text-slate-400' : 'text-slate-600')
                      }`}>
                        <ChevronRight size={13} className="mt-0.5 shrink-0 opacity-50" />
                        <span>{line}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const iconMap = { Wrench, Shield, Code2 };
const socialIconMap = { Briefcase, Link, FlaskConical, Bug };
const badgeIconMap = { FileText, Shield, Folder, BookOpen, FolderGit, Award };

function SkillBar({ name, level, theme, color }) {
  const barColor = {
    amber: theme === 'dark' ? 'bg-amber-400' : 'bg-amber-500',
    green: theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-500',
    blue: theme === 'dark' ? 'bg-sky-400' : 'bg-sky-500',
  }[color];

  return (
    <div className="mb-3.5">
      <div className="flex justify-between mb-1.5">
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{name}</span>
        <span className={`font-mono text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{level}%</span>
      </div>
      <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
        <div className={`h-full rounded-full ${barColor} transition-all duration-1000`} style={{ width: `${level}%` }} />
      </div>
    </div>
  );
}

function Skills({ theme }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="02" label="skills --verbose" theme={theme} />
      <div className="grid sm:grid-cols-3 gap-5">
        {SKILLS.map((group) => {
          const Icon = iconMap[group.icon];
          const headerColor = {
            amber: theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
            green: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
            blue: theme === 'dark' ? 'text-sky-400' : 'text-sky-600',
          }[group.color];
          return (
            <div key={group.category} className={`rounded-lg border p-5 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
              <div className={`flex items-center gap-2 mb-4 ${headerColor}`}>
                <Icon size={18} />
                <h3 className="font-mono text-sm font-semibold tracking-wide">{group.category}</h3>
              </div>
              {group.items.map((item) => (
                <SkillBar key={item.name} {...item} theme={theme} color={group.color} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Projects({ theme }) {
  const statusColor = {
    live: theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600',
    'in progress': theme === 'dark' ? 'text-amber-400' : 'text-amber-600',
    ongoing: theme === 'dark' ? 'text-sky-400' : 'text-sky-600',
  };
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="03" label="ls ./projects" theme={theme} />
      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <div key={p.id} className={`rounded-lg border p-5 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className={`font-semibold text-base ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{p.title}</h3>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[11px] uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{p.type}</span>
                <span className={`font-mono text-[11px] ${statusColor[p.status]}`}>● {p.status}</span>
              </div>
            </div>
            <p className={`text-sm leading-relaxed mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{p.description}</p>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {p.stack.map((s) => (
                <Tag key={s} color="neutral" theme={theme}>{s}</Tag>
              ))}
            </div>
            {(p.githubUrl || p.demoUrl) && (
              <div className={`flex flex-wrap gap-3 pt-2 border-t border-dashed ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 mt-2 font-mono text-xs ${theme === 'dark' ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>
                    <FolderGit size={13} /> Source <ExternalLink size={11} />
                  </a>
                )}
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 mt-2 font-mono text-xs ${theme === 'dark' ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'}`}>
                    <ExternalLink size={13} /> Live demo
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Labs({ theme }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="04" label="lab_progress --recent" theme={theme} />
      <p className={`mb-8 text-sm max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        Hands-on offensive security practice — the proof-of-work behind the certifications below.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {LABS.map((lab) => (
          <div key={lab.id} className={`rounded-lg border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-mono text-[11px] uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{lab.platform}</span>
            </div>
            <h3 className={`font-semibold text-sm mb-1.5 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{lab.room}</h3>
            <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{lab.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {lab.skills.map((s) => (
                <Tag key={s} color="green" theme={theme}>{s}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CertsEducation({ theme }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="05" label="certifications && education" theme={theme} />
      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <h3 className={`font-mono text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Certifications</h3>
          <div className="space-y-3">
            {CERTS.map((c) => (
              <div key={c.name} className={`rounded-lg border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'} ${c.priority ? (theme === 'dark' ? 'ring-1 ring-emerald-500/30' : 'ring-1 ring-emerald-500/20') : ''}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className={`font-medium text-sm ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{c.name}</span>
                  <Tag color={c.status === 'In Progress' ? 'amber' : c.status === 'Planned' ? 'blue' : 'neutral'} theme={theme}>{c.status}</Tag>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{c.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className={`font-mono text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Education</h3>
          <div className="space-y-3">
            {EDUCATION.map((e) => (
              <div key={e.program} className={`rounded-lg border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className={`font-medium text-sm ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{e.program}</span>
                  <span className={`font-mono text-[11px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{e.date}</span>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{e.school} {e.note}</p>
              </div>
            ))}
          </div>

          <div className={`mt-5 rounded-lg border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
            <h4 className={`font-mono text-xs font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              <Search size={14} /> Self-study
            </h4>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              Penetration testing, vulnerability analysis, and bug bounty research —
              ongoing alongside formal certifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofBadges({ theme }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="06" label="proof_of_work --badges" theme={theme} />
      <p className={`mb-8 text-sm max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        Tangible artifacts backing up the skills above. Items marked "coming soon" are
        placeholders — swap in real links as reports and writeups get published.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {CERT_BADGES.map((b) => {
          const Icon = badgeIconMap[b.icon];
          const isAvailable = b.status === 'available';
          const isInProgress = b.status === 'in-progress';
          return (
            <div
              key={b.name}
              className={`rounded-lg border p-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'} ${!isAvailable && !isInProgress ? 'opacity-60' : ''}`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${
                isInProgress
                  ? (theme === 'dark' ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600')
                  : (theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
              }`}>
                <Icon size={18} />
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{b.name}</h3>
              <p className={`text-xs leading-relaxed mb-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{b.note}</p>
              <Tag color={isInProgress ? 'amber' : isAvailable ? 'green' : 'neutral'} theme={theme}>
                {isInProgress ? 'In Progress' : isAvailable ? 'View' : 'Coming Soon'}
              </Tag>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Writeups({ theme }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="07" label="cat ./writeups/*.md" theme={theme} />
      <p className={`mb-8 text-sm max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        Notes and walkthroughs from lab work — flags and sensitive details omitted,
        focused on methodology and what was learned.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {WRITEUPS.map((w) => (
          <a
            key={w.id}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-lg border p-4 transition-colors block ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40 hover:border-emerald-500/50' : 'border-slate-200 bg-white hover:border-emerald-500/50'}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-mono text-[11px] uppercase tracking-wider ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{w.platform}</span>
              <ExternalLink size={13} className={theme === 'dark' ? 'text-slate-600 group-hover:text-emerald-400' : 'text-slate-400 group-hover:text-emerald-600'} />
            </div>
            <h3 className={`font-semibold text-sm mb-1.5 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
              <BookOpen size={14} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />
              {w.title}
            </h3>
            <p className={`text-xs leading-relaxed mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{w.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {w.tags.map((t) => (
                <Tag key={t} color="blue" theme={theme}>{t}</Tag>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function LookingFor({ theme }) {
  const items = [
    { icon: Shield, title: 'Cybersecurity Internships', desc: 'SOC analyst, security operations support, vulnerability management — roles that build on existing IT support skills.' },
    { icon: Wrench, title: 'IT Support with Security Scope', desc: 'Helpdesk or junior technician roles where I can keep growing toward security responsibilities.' },
    { icon: Code2, title: 'Remote / Cape Town-based', desc: 'Open to remote work and on-site roles across Cape Town and the wider South African market.' },
  ];
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeading index="08" label="currently_seeking" theme={theme} />
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.title} className={`rounded-lg border p-5 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
            <item.icon size={20} className={theme === 'dark' ? 'text-emerald-400 mb-3' : 'text-emerald-600 mb-3'} />
            <h3 className={`font-semibold text-sm mb-1.5 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{item.title}</h3>
            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer({ theme, onDownload }) {
  return (
    <footer className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h2 className={`font-mono text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
              ./contact.sh
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Open to opportunities — let's talk.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${PROFILE.email}`} className={`inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-sm border transition-colors ${theme === 'dark' ? 'border-slate-700 text-slate-200 hover:border-emerald-500 hover:text-emerald-400' : 'border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600'}`}>
              <Mail size={15} /> Email
            </a>
            <button onClick={onDownload} className={`inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-sm border transition-colors ${theme === 'dark' ? 'border-slate-700 text-slate-200 hover:border-emerald-500 hover:text-emerald-400' : 'border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600'}`}>
              <Download size={15} /> Résumé
            </button>
          </div>
        </div>
        <div className={`mt-8 pt-6 border-t font-mono text-xs ${theme === 'dark' ? 'border-slate-800 text-slate-600' : 'border-slate-200 text-slate-400'}`}>
          kyle.exe — {PROFILE.location} — exit code 0
        </div>
      </div>
    </footer>
  );
}

function Nav({ theme, toggleTheme }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${theme === 'dark' ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className={`flex items-center gap-2 font-mono text-sm font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
          <Terminal size={16} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />
          kyle.exe
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs border transition-colors ${theme === 'dark' ? 'border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-400' : 'border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'}`}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {theme === 'dark' ? 'light' : 'dark'}
        </button>
      </div>
    </nav>
  );
}

const RESUME_TEXT = `TAWANDA CHIHATA
3 Starck Road, Goodwood, Cape Town 7460
+27 69 850 9575 | kylechihata@gmail.com

PROFILE
IT Support Specialist with 3+ years' experience delivering high-quality technical support,
network troubleshooting, and system administration. Expertise includes Windows OS support,
remote assistance, network diagnostics, vulnerability scanning, and cloud backup solutions.
Currently transitioning toward cybersecurity through hands-on labs (TryHackMe, HackTheBox,
PortSwigger Academy) and Security+ / eJPT certification study, while continuing to deliver
support and basic security consulting for clients.

EXPERIENCE

IT Support Consultant | Freelance | September 2025 - Present
- Managed end-user support requests via remote access tools (AnyDesk, TeamViewer), handling
  OS troubleshooting, application errors, and user account issues for Windows environments.
- Maintained clear client communication throughout support engagements, documenting issues
  and resolutions to build a repeatable knowledge base.
- Performed network diagnostics including IP conflict resolution, DNS and DHCP
  troubleshooting, and cable/port fault isolation.
- Conducted vulnerability assessments using Nmap and Nessus for SME clients, identifying
  exposed services, outdated software, and misconfigured systems.

IT Helpdesk Technician | LBB Foods | April 2024 - August 2025
- Diagnosed and resolved desktop issues including OS reinstalls, driver conflicts,
  peripheral setup, and software compatibility problems, minimising client downtime.
- Configured and troubleshot office networks covering Wi-Fi routers, TCP/IP, DNS/DHCP,
  port forwarding, and LAN setups.
- Conducted vulnerability scans using Nmap and delivered affordable cybersecurity
  consultations to reduce common client risks.
- Assisted clients with cloud migrations and backup solutions across Google Drive and
  OneDrive.

Junior IT Support Technician | Individual Zone Solutions | August 2022 - February 2024
- Provided first-line desktop and IT support, resolving hardware, software, and network
  connectivity issues to minimise operational downtime.
- Supported users with Office 365, printers, peripherals, and general software, delivering
  clear technical guidance.
- Configured and troubleshot VPN connections, basic firewall rules, and endpoint security
  measures to ensure secure remote access.

Data Entry Clerk | Makakavhule Clinic | June 2016 - March 2018
- Accurately entered and managed sensitive patient records, demographic data, and
  appointment schedules into clinic database systems.
- Collaborated with clinical staff to verify records against physical forms and resolve
  discrepancies.
- Utilised Microsoft Office and clinic management software for reporting and weekly
  administrative summaries.

TECHNICAL SKILLS
Languages: Python, C++, Visual Basic .NET, JavaScript, HTML, CSS, Java (learning)
Frameworks: React (learning), React Native (learning), Node.js (learning)
Dev Concepts: SDLC, Feasibility Analysis, OOP principles
Cloud & Tools: Google Cloud, Docker, Git/GitHub
Cybersecurity: Vulnerability Scanning (Nmap, Nessus), Endpoint Hardening, Security
Awareness, Burp Suite (learning), Metasploit (guided), Linux Privilege Escalation
IT Support: Windows & Linux, Remote Troubleshooting, Networking (VPNs, Firewalls,
Routers), Hardware Support

HANDS-ON SECURITY PRACTICE
- TryHackMe: Guided Pentest: Web, Pickle Rick, Fowsniff CTF, All in One, Takeover
  (enumeration, LFI, web shells, reverse shells, Metasploit, privilege escalation)
- PortSwigger Web Security Academy: Server-side vulnerabilities path (SSRF, SSTI)
- Hacker101 CTF: in progress
- Next: HackTheBox retired Easy machines (TJ Null list, Ippsec walkthroughs)

EDUCATION
National Diploma in Information Technology (incomplete - ND1 complete)
Mutare Polytechnic | May 2021

National Certificate in Information Technology
Mutare Polytechnic | November 2019

CERTIFICATIONS & PROFESSIONAL DEVELOPMENT
- CompTIA Security+ (SY0-701) - In Progress (primary near-term target)
- eJPT - Planned
- CompTIA A+ Core 1 - In Progress
- (ISC)2 Certified in Cybersecurity (CC) - In Progress
- ITIL Foundation V3 - Working knowledge
- Self-study: Penetration testing, vulnerability analysis, bug bounty research
`;

function downloadResume() {
  const blob = new Blob([RESUME_TEXT], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Tawanda_Chihata_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function Portfolio() {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} onDownload={downloadResume} />
      <TransitionTrack theme={theme} />
      <Skills theme={theme} />
      <Projects theme={theme} />
      <Labs theme={theme} />
      <CertsEducation theme={theme} />
      <ProofBadges theme={theme} />
      <Writeups theme={theme} />
      <LookingFor theme={theme} />
      <Footer theme={theme} onDownload={downloadResume} />
    </div>
  );
}