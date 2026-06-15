# kyle-portfolio

Personal terminal-themed portfolio for **Tawanda "Kyle" Chihata** — IT Support Specialist pivoting into cybersecurity and offensive security.

## What this is

A React + Vite single-page app styled like a `kyle.exe` command-line session. Sections read like filesystem commands:

- `whoami`
- `career_log --follow`
- `skills --verbose`
- `ls ./projects`
- `lab_progress --recent`
- `cat ./writeups/*.md`
- `certifications && education`
- `currently_seeking`

Dark mode default. Light mode toggle included. No external hosting dependencies beyond GitHub Pages.

## Tech stack

- React 19
- Vite 8
- Tailwind CSS v3
- lucide-react 1.x

## Structure

```
src/App.jsx          # main UI + data
writeups/            # lab walkthroughs
labs/                # backing notes / recon files from /home/kyle/labs
dist/                # static build output
```

## Run locally

```bash
npm install
npm run build
npm run preview
```

Open `http://localhost:4173`.

## Deployment

Built for GitHub Pages with source set to `main` branch, `/dist` folder. After enabling Pages in repo settings, the live URL becomes:

`https://<USERNAME>.github.io/kyle-portfolio`

Replace `<USERNAME>` with the actual GitHub account that owns the repo.

## Live writeups included

- [`writeups/mr-robot.md`](writeups/mr-robot.md) — TryHackMe
- [`writeups/guided-pentest-infra.md`](writeups/guided-pentest-infra.md) — TryHackMe
- [`writeups/htb-connected.md`](writeups/htb-connected.md) — HackTheBox

## Contact

Email: `kylechihata@gmail.com`
Phone: `+27 69 850 9575`
Location: Cape Town, South Africa
