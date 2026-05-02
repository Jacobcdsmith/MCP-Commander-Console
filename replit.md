# Enhanced MCP Server

## Overview
An Enhanced Model Context Protocol (MCP) Server with a web-based dashboard (LCARS/Star Trek themed UI). Provides both an MCP protocol interface for AI model integration and an HTTP dashboard for manual interaction and monitoring.

## Architecture
- **Runtime**: Node.js v18.20.8, npm 10.8.2
- **Framework**: Express.js (HTTP dashboard)
- **MCP SDK**: `@modelcontextprotocol/sdk`
- **Entry point**: `server.js`

## Project Layout
- `server.js` — Main server (MCP protocol + Express HTTP dashboard)
- `dashboard.html` — Main LCARS-styled dashboard UI (~6,700 lines)
- `mcp-console.html` — MCP console interface
- `pages/` — Additional static dashboard pages
- `promo/` — Promotional landing page + 14 captured screenshots

## Running the Server
```
PORT=5000 node server.js
```
- HTTP dashboard: `http://0.0.0.0:5000`
- MCP protocol: via stdio (for AI client connections)

## Workflow
- **Start application**: `PORT=5000 node server.js` on port 5000

## API Endpoints
| Endpoint | Description |
|---|---|
| `GET /` | Dashboard HTML |
| `GET /health` | Health check |
| `GET /api/status` | Server status & uptime |
| `GET /api/metrics` | Live CPU, memory, process metrics |
| `GET /api/tools` | Tool manifest (40 tools) |
| `POST /api/tools/execute` | Execute any MCP tool |
| `GET /api/security/scan` | Automated security scan (audit + ports + sensitive files) |
| `GET /favicon.ico` | Suppressed (204) |

## MCP Tools (40 total)

### Git (4)
- `git_status` — Repository status
- `git_log` — Commit history (configurable count)
- `git_diff` — File diffs (staged/unstaged)
- `git_branch` — Branch listing

### File System (9)
- `list_files` — Directory listing with hidden file support
- `read_file` — Read file contents
- `write_file` — Write to file
- `create_directory` — Create directories (recursive)
- `file_stats` — File metadata (size, dates, permissions, type)
- `delete_file` — Delete file or directory (recursive option)
- `move_file` — Move or rename file
- `copy_file` — Copy file to new location
- `find_files` — Find files by name pattern with maxdepth

### System (8)
- `run_command` — Execute shell commands (sync/async)
- `system_info` — OS, CPU count, memory, uptime, hostname
- `cpu_load` — CPU load averages (1m/5m/15m), estimated usage %
- `disk_usage` — Filesystem disk space (df -h)
- `memory_detail` — System + process memory breakdown
- `node_info` — Node version, npm, PID, heap usage, process.versions
- `npm_list` — Installed npm packages (depth 0)
- `npm_audit` — npm security audit

### Network (1)
- `fetch_url` — HTTP client (GET/POST/PUT/DELETE/PATCH) with response headers

### Data (3)
- `parse_json` — Parse and validate JSON strings
- `format_json` — Format JSON with configurable indentation
- `search_files` — grep-based text search across files

### Environment (1)
- `env_list` — List environment variables with optional name filter

### Security (7)
- `security_audit` — Comprehensive automated security audit (ports, permissions, secrets, CVEs, git history)
- `http_headers_check` — Analyze HTTP security headers (CSP, HSTS, X-Frame-Options, etc.) with scoring
- `ssl_check` — Check SSL certificate details, issuer, expiry countdown, SHA256 fingerprint
- `scan_sensitive_files` — Scan for .env, *.key, *.pem, credentials, high-entropy token patterns
- `git_secrets_scan` — Search git commit history for leaked passwords, API keys, tokens
- `cve_check` — Full CVE/vulnerability report via npm audit JSON with severity breakdown
- `open_ports` — List open/listening ports by parsing `/proc/net/tcp` (no netstat required)

### Forensics (8)
- `file_checksum` — Compute MD5, SHA1, SHA256, SHA512 checksums + file size and timestamps
- `file_strings` — Extract printable strings from any binary file (min-length configurable)
- `file_hexdump` — Hex dump using `od` (configurable byte count)
- `file_type` — Detect file type via magic bytes using `file` command
- `recent_files` — Timeline of recently modified files (configurable days, excludes node_modules/.git)
- `network_connections` — All TCP connections grouped by state (LISTEN, ESTABLISHED, TIME_WAIT…)
- `process_forensics` — Deep process inspection via `/proc`: cmdline, status, FD count, memory map, env
- `log_tail` — Tail any log file with optional keyword filter

## Dashboard Panels (14 panels + 1 full-width analytics)
1. **Git Operations** — status, log, diff, branch, stash, remotes, blame
2. **File System** — browse, read, write, create dir, copy, move, delete, file stats, find, tree, disk usage
3. **System Operations** — run command, list processes, kill process, env vars, network info, ports
4. **Data Processing** — parse/format JSON, base64 encode/decode, UUID, hash, timestamp, text stats, search
5. **Runtime Environment** — Node info, npm list/audit/update, CPU load, disk, memory, package.json, run script
6. **API & Endpoints** — Live endpoint tiles, health check, custom HTTP request, live metrics
7. **Quick Actions** — File open, command history, keyboard shortcuts display
8. **Network** — ping, curl, DNS lookup, network interfaces, route table, download, public IP
9. **NPM/Node** — install, update, audit, outdated, run script, global packages, cache clear, eval
10. **HTTP Client** — GET/POST/PUT/DELETE/PATCH, ping server, fetch metrics, cURL, download, DNS, ping, public IP
11. **Environment Variables** — list all, search, filter by NODE/PATH/REPLIT, read .env, count
12. **Security Testing** *(new)* — Full audit, quick scan API, HTTP headers analysis, SSL check, sensitive file scan, git secrets hunt, CVE check, open ports, world-writable/SUID detection
13. **Digital Forensics** *(new)* — File checksums, string extraction, hex dump, file type detection, recent file timeline, process forensics, network connections, log tailing, process tree, OS fingerprint
14. **Ship's Status** — Real-time system stats (platform, CPUs, memory, uptime, hostname)
15. **Real-Time Analytics** *(full-width)* — Live CPU/memory charts (blended real + animated), gauges, heatmap, sparklines, activity feed from `/api/metrics` every 5s

## Starfleet Boot Intro
- Cinematic full-screen overlay (`#starfleet-intro`) on first DOM load
- LCARS bars sweep in, side pillars rise, starfield + warp streaks fade in
- Animated Starfleet delta emblem (SVG with gold gradient + glow)
- Boot log lines type out sequentially (subspace, warp, deflector, etc.)
- Final flash + "ACCESS GRANTED · WELCOME, COMMANDER" pill
- Dismissible via SPACE / ESC / click; auto-dismisses after ~5.3s
- Honors `prefers-reduced-motion`: skips immediately for accessibility
- All timeouts tracked + cancelled on dismiss; uses capture-phase keydown +
  `stopImmediatePropagation` so it doesn't conflict with the floating-console
  Esc shortcut

## Floating Output Console
- Single full-width main pane; output console is a floating overlay
- Bottom-right "▸ CONSOLE" pill toggles it open/closed (default: closed)
- Draggable header, maximize toggle, unread-line badge that pulses on new output
- Open/closed state, position, and maximize state persist in `localStorage`
- Shortcuts: Ctrl+\` toggle, Esc collapse (in addition to existing Ctrl+R/K/H/T)

## Smoothness Pass
- `html { scroll-behavior: smooth }`, body font-smoothing
- `.lcars-panel`, `.lcars-button`, `.nav-link` all use `cubic-bezier(0.2,0.8,0.2,1)`
  transitions with `will-change: transform` and snappier `:active` press states
- Staggered `.lcars-enter` fade-up animation on every panel via `--enter-delay`
  CSS var; above-the-fold panels cascade immediately, the rest fade in via
  IntersectionObserver as the user scrolls. Single-fire guard prevents
  duplicate runs across `starfleet:ready` + DOMContentLoaded fallback.
- Pointer ripple feedback on `.lcars-button`, `.nav-link`, `.lcars-control-btn`
  (all three have `position: relative; overflow: hidden` so the ripple is
  clipped to the button shape)
- All smoothness effects honor `prefers-reduced-motion`

## Guided Tour (Tutorial)
- "🎓 Tour" button in the nav bar (`#tourTrigger`) replays the tour anytime
- Auto-launches once on first visit after the boot intro completes
  (intro `dismiss()` dispatches a `starfleet:ready` CustomEvent)
- 7-step `TUTORIAL_STEPS` array: header, nav, tool panels, console pill,
  stardate, tour button, finale
- Animated spotlight ring + LCARS-themed tooltip card with progress dots
- Card placement (top/right/bottom/left/center) auto-clamped to viewport
  with mobile fallback (`@media max-width: 720px` forces full-width card)
- Spotlight target gets `position: relative; z-index: 99991` lift over the
  tutorial backdrop (z-index 99990) — both well above floating console (9001)
- Keyboard: → / Enter advances, ← goes back, Esc skips
- Smooth-scrolls each target into view (280ms settle delay before measuring)
- Completion stored in `localStorage` (`lcars.tutorial.completed`)
- Honors `prefers-reduced-motion`

## Dependencies
- `@modelcontextprotocol/sdk` — MCP protocol implementation
- `express` — HTTP server
- `cors` — CORS middleware
- `zod` — Schema validation

## Promotional Materials
- `promo/index.html` — Standalone animated LCARS landing/showcase page served
  at `/promo/` via the existing `express.static(__dirname)` middleware
  (no server route changes required)
- `promo/screenshots/01-14*.jpg` — 14 captured app screenshots (intro,
  dashboard, tour, console, modules hub, all 9 sub-modules, redteam)
- `promo/screenshots/15-promo-page.jpg` — Snapshot of the promo page itself
- Page features: animated starfield, gradient hero with per-word reveal,
  animated stat counters, auto-cycling showcase carousel synced to a
  keyboard-accessible thumbnail tablist, IntersectionObserver reveal-on-scroll,
  feature grid, 8-category toolbox, animated quote card
- Honors `prefers-reduced-motion` in CSS *and* JS (counter and carousel
  autoplay both no-op under reduced motion)
- `?static=1` URL flag freezes all entrance animations + counters to their
  final state for clean screenshot/print captures (real users never use it)
- Carousel thumbnails are real `<button>` elements with `role="tab"` /
  `aria-current` and visible focus rings

## URL Param Escape Hatches (for screenshots / automation / demos)
- `/?skipintro=1` — bypass the cinematic boot intro
- `/?tour=1` — force-replay the guided tour (works with or without `skipintro`)
- `/?openconsole=1` — open the floating output console
- `/promo/?static=1` — freeze all entrance animations on the promo page

## Notes
- Docker/Docker Compose configs exist but are not used in Replit (Docker not available)
- Analytics data is blended: real CPU/memory from `/api/metrics` + animated noise for visual smoothness
- `formatBytes()` helper used across all size formatting
- Favicon returns 204 to suppress browser 404 noise
