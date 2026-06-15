# Mr Robot — TryHackMe Room Walkthrough

> Room: Mr Robot  
> Platform: TryHackMe  
> Date: 2026-06-14  
> Tags: `recon` `wordpress` `passwd-reuse` `privesc` `php-shell`

## Summary

Mr Robot is a beginner-to-intermediate web challenge. The goal is to enumerate the exposed web services, identify WordPress-related exposure paths, abuse credential/wordlist material left on the host, and escalate to a full shell. The room rewards methodical enumeration and attention to what the web server is leaking.

## Tooling

- nmap 7.98
- gobuster / dirbuster wordlists
- ffuf
- curl / wget
- hydra / medusa (credential testing)
- john (hash cracking if needed)
- sqlmap (not required for this path)

## Recon

Initial Nmap scan from `labs/TryHackMe/mr-robot/recon/nmap.txt`:

- 22/tcp — OpenSSH 8.2p1 Ubuntu
- 80/tcp — Apache httpd
- 443/tcp — Apache httpd with a default/expired cert (`www.example.com`)

Quick HTTP enum showed strong WordPress indicators:
- `/wp-login.php`
- `/wp-admin/`
- `/wp-content/`
- `/xmlrpc.php`
- `/robots.txt` exposing sensitive paths (`fsocity.dic`, `key-1-of-3.txt`)

Same content appeared on 443, but requests were slower/unreliable; I focused enumeration on HTTP.

## Web Enumeration

Gobuster and ffuf confirmed multiple interesting endpoints:
- `/admin/` and `/login/` redirecting into WP auth
- `/0/`, `/image/`, `/Image/`, `/images/`, `/audio/`, `/video/`
- `/feed`, `/rss`, `/rss2`, `/atom`, `/sitemap`, `/sitemap.xml`
- `/robots.txt` and `/readme.txt`
- `/wp-mail` and `/wp-settings` returning 500 — useful signals the WP install is real and partially broken

The biggest lead was `robots.txt`:
```text
fsocity.dic
key-1-of-3.txt
```

`fsocity.dic` is a WordPress-specific password dictionary (the well-known “fsociety” list). That implies the challenge author is signaling the intended path is WordPress credential testing.

## Credential Access

Download `fsocity.dic` from the docroot. It contains repeated/common passwords and is a strong dictionary for online/offline guessing.

Download `key-1-of-3.txt` — first flag.

For WordPress, the two main angles are:
- `xmlrpc.php` brute/password-spray
- standard `wp-login.php` brute

Because this is a learning room, `xmlrpc.php` is often the intended shortcut.

Once the password for the WP user is recovered, use it to log in to `/wp-login.php` or the `/admin/` style path.

## Shell / Initial Access

From the WordPress surface, classic next steps:
- install/activate a theme that allows PHP execution, drop a small web shell
- use a plugin upload path if available
- use an existing writable location in `/wp-content/uploads/` with a `.phtml` shell

The logs show a `shell.phtml` under the guided-pentesting folder, confirming the “uploads -> webshell” approach on this platform.

That gave initial access as the web user. From there, enumerate kernel/users and look for sudo tokens, cron jobs, or password reuse.

## Privilege Escalation

Typical Mr Robot escalation pattern:
1. Check `sudo -l`
2. Find SUID/GUID binaries
3. Check cron jobs and PATH writes
4. Check for `NOPASSWD` sudo or writable `/etc/sudoers`
5. Look for password reuse or stored credentials

Once root is obtained, grab the remaining flags.

## Flags

- Key 1: from `/key-1-of-3.txt`
- Key 2: on the system after initial shell
- Key 3: after privilege escalation

Reference paths from lab:
- `/home/kyle/labs/TryHackMe/Mr Robot/creds`
- `/home/kyle/labs/TryHackMe/Mr Robot/terminal.log`

## Lessons Learned

- `robots.txt` is one of the first things to check; CTF/learning platforms often use it to hand you wordlists and flags intentionally.
- Wordpress-specific dictionaries (`fsocity.dic`) are a strong hint that the room wants you to target WP auth, not generic SQL injection.
- `/xmlrpc.php` is still worth checking when wp-login brute is noisy.
- A `.phtml` upload via a theme/plugin or misplaced `.php` handler is a fast path to shell in WordPress lab environments.
