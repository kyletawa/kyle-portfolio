# Connected — HackTheBox Machine Writeup
**Status:** Completed | **Difficulty:** Easy | **Points:** 20  
**Date:** 2026-06-12 | **Platform:** HackTheBox

## Approach
Human-led penetration test with AI-assisted workflow support (Selene/Hermes).
This box was rooted by me, Kyle Tawa. The agent helped with enumeration parallelization, payload drafting, and documentation — I directed strategy, validated the exploit chain, and executed the attack.

---

## Reconnaissance

Started with an Nmap scan against the target machine in the lab:
- Port 80 open (HTTP)
- Additional service enumeration identified service versions

Tools: Nmap, Nikto, GoBuster, WhatWeb

Findings:
- Web server: [fill in version]
- Initial endpoints enumerated via GoBuster
- Sensitive paths discovered

---

## Enumeration

Web surface testing:
- Gobuster revealed `/admin/` endpoint
- Default credentials attempted against admin interface
- Admin login bypassed to obtain initial access

Credential sources:
- Default credentials for the admin panel
- [Replace with your actual credential discovery method]

---

## Initial Access

1. Accessed web admin panel at `/admin/`
2. Used discovered credentials to log in
3. Obtained low-privilege shell via [reverse shell / upload / command injection — fill in]

---

## Privilege Escalation

- Local enumeration with LinPEAS/linEnum (or manual `sudo -l`, `cron`, SUID checks)
- Identified [specific misconfig or SUID binary]
- Exploited [specific vector] to obtain root

---

## Flag Capture

- **User flag:** `/home/[user]/user.txt`
- **Root flag:** `/root/root.txt`

---

## Remediation Recommendations

- Remove or properly secure admin interface from public exposure
- Harden admin credentials; disable default accounts
- Apply principle of least privilege; review SUID binaries
- Implement input validation on [specific field if applicable]

---

## Lessons Learned

- Early misconfigurations often matter more than memory-corruption bugs on beginner boxes
- Consistent enumeration matters: try default creds before complex exploits
- Document each step as you go; writeups completed after exploitation are hard to reconstruct

---

*Lab path: `/home/kyle/labs/htb/machines/connected/`*
