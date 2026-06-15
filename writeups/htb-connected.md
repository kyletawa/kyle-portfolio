# Connected — HackTheBox Machine Writeup

## Status

Started 2026-06-12. Full exploitation pending.

## Reconnaissance Plan

- Identify exposed services and versions.
- Check banner data against known CVEs.
- Focus on the web surface first; HTB beginner machines very often have a web foothold.

## Vulnerability Analysis

From the notes file, the target was in the recon phase when work was paused. Typical next steps:
- Web directory brute force
- Version-specific searches via searchsploit
- Credential checks against any exposed admin interfaces

## Exploitation Notes

Will be updated once the initial access path is confirmed.

## Privilege Escalation Notes

Will be updated once a shell is obtained.

## Lessons Learned So Far

- Re-check old HTB writeups only after completing the box yourself — they spoil the methodology shift you’re supposed to learn.
- Early misconfigurations are usually more useful than memory-corruption exploits on easy-rated boxes.

Lab files: `/home/kyle/labs/HackTheBox/Connected/`
