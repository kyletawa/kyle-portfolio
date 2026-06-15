# Connected — HackTheBox Machine Writeup

> Machine: Connected  
> Platform: HackTheBox  
> Status: Started, work in progress  
> Tags: `recon` `vulnerability-analysis` `initial-access` `privilege-escalation`

## Summary

Connected is a HackTheBox machine. It’s currently tracked as started rather than complete. This writeup documents the methodology and gaps identified so far; detailed exploitation path will be added as the box progresses.

## Known Context

- Started: 2026-06-12
- Notes directory: `/home/kyle/labs/HackTheBox/Connected/`
- Terminal log available for reference and timestamp lineage

## Methodology

### Recon
- Identify exposed services and versions
- Enumerate service-specific inputs and default credentials
- Search for known CVEs affecting discovered versions

### Vulnerability Analysis
- Map recon findings to exploitability
- Check patch status and affected versions
- Identify low-hanging fruit first (web, SMB, RPC, database)

### Exploitation
- Select a stable, non-destructive initial access path
- Validate shell stability and session quality
- Avoid noisy exploits that trip alerts during early access

### Privilege Escalation
- Enumerate kernel, sudo, cron, capabilities, SUID binaries
- Check for credential reuse across accounts
- Look for misconfigurations rather than 0-days

## Files

- `/home/kyle/labs/HackTheBox/Connected/notes.md`
- `/home/kyle/labs/HackTheBox/Connected/terminal.log`

## Lessons Learned So Far

- HTB machines reward patience: early misconfigurations are often more useful than immediate exploit attempts.
- Host fingerprinting still matters even when you expect a “box”; don’t skip the low-hanging credential checks.
