# Mr Robot — TryHackMe Writeup

## Objective

The goal on Mr Robot is full system compromise, ending in root access and retrieval of three flags scattered on the filesystem.

## Reconnaissance

Started with a full TCP nmap scan:

- 22/tcp — OpenSSH 8.2p1 Ubuntu
- 80/tcp — Apache httpd
- 443/tcp — Apache httpd

Immediately obvious from the web terminal that WordPress was the application layer. Authentication endpoints returned 302 into `wp-login.php`, so I skipped blind SQLi checks and focused on auth exploits and directory exposure.

## Enumeration

`gobuster` and `ffuf` turned up a ton of WordPress structure. The key find was `robots.txt`:

- `fsocity.dic`
- `key-1-of-3.txt`

Downloading `fsocity.dic` immediately signaled the intended path: password spray against WordPress. It’s the classic fsociety dictionary tied heavily to this room.

Downloading `key-1-of-3.txt` returned the first flag.

The password list is huge and contains duplicates, so I sorted and uniqued it locally before running hydra against `/xmlrpc.php` and `/wp-login.php`. The target login path yielded credentials after a few passes.

## Initial Access

With valid WordPress credentials:
1. Logged into the admin area.
2. Navigated to Appearance → Theme Editor.
3. Edited `404.php` and dropped a small PHP reverse shell.
4. Triggered the shell and caught a session as the web user.

Alternatively, uploaded a `.phtml` shell via the media/theme upload path when the server accepted it.

## Privilege Escalation

Standard Linux checks:
- `sudo -l` — found a NOPASSWD entry.
- `find / -perm -u=s -type f 2>/dev/null` — nothing immediately useful.
- Cron jobs — no direct wins.

The win came from misconfigured sudo permissions combined with the compromised web user. Escalated to root and grabbed the remaining flags from their expected locations.

## Tools Used

- nmap 7.98
- gobuster / ffuf
- curl / wget
- hydra
- john
- php reverse shell
- linpeas-style manual enum

## Lessons Learned

- Always check `robots.txt` first on learning platforms — authors often put wordslists and flags there intentionally.
- WordPress dicts like `fsocity.dic` are strong hints that the room expects WP auth abuse.
- When `wp-login.php` is noisy, `xmlrpc.php` is a quieter alternate path.
- Even small misconfigurations in sudo can be enough on introductory boxes.

Reference files in `/home/kyle/labs/TryHackMe/Mr Robot/`
