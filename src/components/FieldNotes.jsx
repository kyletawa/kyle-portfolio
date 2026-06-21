const notes = [
  {
    title: 'The bug lives in the assumption.',
    content: 'Most breaches I read about aren\'t clever — they\'re a trusted input nobody re-validated. Now I write the assumption next to every boundary: who can reach this, and what happens when they lie?',
    tags: ['Threat Modeling', 'Security', 'Assumptions'],
  },
  {
    title: 'Normal is the hard part.',
    content: 'The exploit is the easy 20%. The other 80% is defining "normal" precisely enough that a real anomaly can\'t slip in wearing a sloppy baseline as a disguise. This applies to both detection engineering and life.',
    tags: ['Detection', 'Baseline', 'Discipline'],
  },
  {
    title: 'Latency is a material.',
    content: 'A 60fps interaction isn\'t decoration — it\'s trust. I budget motion the same way I budget memory. Every millisecond you save compounds into perceived reliability. The user\'s brain silently adjusts the baseline until they can\'t imagine it any other way.',
    tags: ['Performance', 'UX', 'Trust'],
  },
  {
    title: 'Automation compounds trust.',
    content: 'The first time Selene OS helped structure a lab workflow, I checked every step manually. Over time, I learned where automation helps most: recon organization, repeatable checks, documentation, and keeping human judgment in control.',
    tags: ['Automation', 'AI', 'Trust'],
  },
  {
    title: 'The recon is the exploit.',
    content: 'I\'ve never found a clever 0-day in a CTF. Every root came from a service version, a default credential, or a misconfiguration that showed up in the nmap output. The answer is always in the enumeration you almost skipped.',
    tags: ['Recon', 'Methodology', 'OSINT'],
  },
]

export default function FieldNotes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note, i) => (
        <div
          key={i}
          className={`note-card ${i === 0 ? 'md:col-span-2' : ''}`}
        >
          <div className="flex flex-wrap gap-1.5 mb-3">
            {note.tags.map((tag) => (
              <span key={tag} className="tag-pill text-[10px]">{tag}</span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-white heading-serif mb-3">
            {note.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  )
}