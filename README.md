<div align="center">

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  ██████╗████████╗ █████╗ ██████╗ ███████╗██╗     ███████╗███████╗████████╗  ║
║ ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝  ║
║ ╚█████╗    ██║   ███████║██████╔╝█████╗  ██║     █████╗  █████╗     ██║     ║
║  ╚═══██╗   ██║   ██╔══██║██╔══██╗██╔══╝  ██║     ██╔══╝  ██╔══╝     ██║     ║
║ ██████╔╝   ██║   ██║  ██║██║  ██║██║     ███████╗███████╗███████╗   ██║     ║
║ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝╚══════╝   ╚═╝     ║
║                                                                              ║
║          ███╗   ███╗ ██████╗██████╗      ███████╗███████╗██████╗            ║
║          ████╗ ████║██╔════╝██╔══██╗     ██╔════╝██╔════╝██╔══██╗           ║
║          ██╔████╔██║██║     ██████╔╝     ███████╗█████╗  ██████╔╝           ║
║          ██║╚██╔╝██║██║     ██╔═══╝      ╚════██║██╔══╝  ██╔══██╗           ║
║          ██║ ╚═╝ ██║╚██████╗██║          ███████║███████╗██║  ██║           ║
║          ╚═╝     ╚═╝ ╚═════╝╚═╝          ╚══════╝╚══════╝╚═╝  ╚═╝           ║
║                                                                              ║
║              ◈  STARFLEET COMMAND  ·  MCP OPERATIONS CENTER  ◈              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MCP SDK](https://img.shields.io/badge/MCP%20SDK-1.17%2B-5555ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6TTIgMTdsOCA0IDgtNFY3bC04IDR6Ii8+PC9zdmc+)](https://github.com/modelcontextprotocol/sdk)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](./DOCKER-README.md)
[![License](https://img.shields.io/badge/License-ISC-ff9900?style=for-the-badge)](./package.json)

**A production-ready Model Context Protocol server wrapped in a Star Trek LCARS command interface.**  
*Stardate: active. All systems nominal.*

</div>

---

## ◈ MISSION BRIEFING

> *"The computer is the most democratic tool ever invented. Its purpose is to do whatever its user requests."*  
> — *Starfleet Command Directive*

**MCPStarfleetCommand** is an enhanced [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server with a fully interactive **LCARS-styled web dashboard** — the same aesthetic made famous by the starship *Enterprise*. It bridges Claude Code AI integration (via MCP stdio) with a beautiful browser-based command console, giving you developer tools, file-system ops, system monitoring, and Docker-scale observability from a single unified interface.

---

## ◈ TACTICAL OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ◈ DUAL-INTERFACE DESIGN                                                    │
│                                                                             │
│   [ Claude Code / AI ]                  [ Browser ]                        │
│         │  stdio MCP                        │  HTTP :3001                  │
│         ▼                                   ▼                              │
│   ┌─────────────────────────────────────────────────┐                      │
│   │          ENHANCED MCP SERVER CORE               │                      │
│   │  ┌──────────────┐    ┌──────────────────────┐   │                      │
│   │  │  MCP Engine  │    │   Express HTTP API   │   │                      │
│   │  │  (13 Tools)  │◄──►│   REST Endpoints     │   │                      │
│   │  └──────────────┘    └──────────────────────┘   │                      │
│   └─────────────────────────────────────────────────┘                      │
│         │                                   │                              │
│         ▼                                   ▼                              │
│   [ AI responds with ]           [ LCARS Dashboard UI ]                    │
│     tool results                   Interactive terminal                    │
│                                    System monitoring                       │
│                                    One-click tool execution                │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ◈ SHIP'S SYSTEMS — FEATURES

<table>
<tr>
<td width="50%" valign="top">

### 🖖 Command Interface
| Capability | Status |
|---|---|
| MCP stdio protocol | ✅ Active |
| HTTP REST API | ✅ Active |
| LCARS Web Dashboard | ✅ Online |
| Interactive terminal | ✅ Live |
| Responsive design | ✅ All screens |

### 🛠️ Developer Operations
| Tool | Description |
|---|---|
| `git_status` | Repository status |
| `git_log` | Full commit history |
| `git_diff` | File-level diffs |
| `git_branch` | Branch listing |
| `search_files` | Recursive code search |

</td>
<td width="50%" valign="top">

### 💻 System Operations
| Tool | Description |
|---|---|
| `list_files` | Directory browsing |
| `read_file` | File content viewer |
| `write_file` | File writer |
| `create_directory` | Directory creation |
| `run_command` | Shell execution |
| `system_info` | Live system metrics |

### 📊 Data Processing
| Tool | Description |
|---|---|
| `parse_json` | JSON validation |
| `format_json` | Pretty-print JSON |

</td>
</tr>
</table>

---

## ◈ WARP SPEED DEPLOYMENT

### 🚀 Option A — Local Launch (Node.js)

```bash
# 1. Install crew
npm install

# 2. Engage engines
npm start                # Production warp
npm run dev              # Debug mode (verbose logs)

# 3. Open LCARS console
open http://localhost:3001
```

### 🐳 Option B — Docker Fleet (All Services)

```bash
# Launch the full starship
docker-compose up -d

# Services come online:
#   http://localhost:3001  ← MCP Server + LCARS Dashboard
#   http://localhost:3000  ← Grafana Analytics  (change default creds in .env!)
#   http://localhost:3002  ← Real-time Analytics Engine
#   http://localhost:9090  ← Prometheus Metrics
#   http://localhost:8080  ← cAdvisor Container Monitor

# Hail all stations
docker-compose logs -f

# Stand down
docker-compose down
```

> 📖 Full deployment guide → [`DOCKER-README.md`](./DOCKER-README.md) · Quick start → [`QUICKSTART.md`](./QUICKSTART.md)

---

## ◈ STARSHIP ARCHITECTURE

```
                      ┌──────────────────────────┐
                      │   Internet / NGINX Proxy  │
                      │  Load Balancing · SSL · Rate Limiting │
                      └────────────┬─────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
  ┌─────────▼──────────┐  ┌────────▼────────┐  ┌─────────▼──────────┐
  │    MCP SERVER      │  │    GRAFANA      │  │    ANALYTICS       │
  │    Port  3001      │  │    Port  3000   │  │    Port  3002      │
  │  HTTP + MCP/stdio  │  │  Dashboards     │  │  Metrics / Events  │
  └─────────┬──────────┘  └────────┬────────┘  └─────────┬──────────┘
            │                      │                      │
  ┌─────────▼──────────────────────▼──────────────────────▼──────────┐
  │                           DATA LAYER                             │
  │         Redis (cache)  ·  Prometheus (metrics)  ·  Volumes       │
  └──────────────────────────────────────────────────────────────────┘
```

| Service | Port | Purpose |
|---|---|---|
| **MCP Server** | `:3001` | Core server · LCARS dashboard · REST API |
| **Grafana** | `:3000` | Visual analytics · alerts · dashboards |
| **Analytics** | `:3002` | Real-time event tracking |
| **Prometheus** | `:9090` | Time-series metrics database |
| **cAdvisor** | `:8080` | Container resource monitoring |
| **Redis** | `:6379` | Cache layer |
| **NGINX** | `:80/:443` | Reverse proxy · SSL |

---

## ◈ LCARS COMMAND CONSOLE — DASHBOARD PREVIEW

```
╔══════════════════════════════════════════════════════════════════╗
║ ████ STARFLEET MCP ████████████████████████████████ 47.2 GHz ████║
╠════════════╦═══════════════════════════════════════════════════╣
║ NAV        ║  ┌──────────────────────────────────────────┐    ║
║ ▶ TERMINAL ║  │ > system_info                            │    ║
║   FILES    ║  │ ✔ CPU: 12%  MEM: 4.2GB  UPTIME: 99.9%   │    ║
║   GIT      ║  │ > git_status                             │    ║
║   SYSTEM   ║  │ ✔ Branch: main  Modified: 2  Clean       │    ║
║   TOOLS    ║  └──────────────────────────────────────────┘    ║
║            ║                                                   ║
║ ▓▓▓▓▓▓▓▓▓▓ ║  [⚡ GIT STATUS] [📁 LIST FILES] [💻 SYS INFO]   ║
╚════════════╩═══════════════════════════════════════════════════╝
```

The dashboard features:
- **⚡ Interactive Terminal** — Real-time command execution with color-coded output
- **📡 System Monitoring** — Live CPU, memory, disk, and uptime gauges
- **🗂️ Tool Panel** — Every MCP tool available as a one-click LCARS button
- **🔐 File Operations** — Read, write, browse files directly in browser
- **📊 Git Integration** — Status, log, diff, branches at a glance

---

## ◈ REST API — COMMUNICATIONS ARRAY

```bash
# ─── Status check ───────────────────────────────────────────────
curl http://localhost:3001/api/status

# ── List all 13 available tools ─────────────────────────────────
curl http://localhost:3001/api/tools

# ── Execute any tool ────────────────────────────────────────────
curl -X POST http://localhost:3001/api/tools/execute \
  -H "Content-Type: application/json" \
  -d '{"tool": "system_info", "args": {}}'

curl -X POST http://localhost:3001/api/tools/execute \
  -H "Content-Type: application/json" \
  -d '{"tool": "git_status", "args": {"repoPath": "."}}'

curl -X POST http://localhost:3001/api/tools/execute \
  -H "Content-Type: application/json" \
  -d '{"tool": "search_files", "args": {"query": "TODO", "searchDir": "."}}'
```

> **MCP Protocol** — The server speaks full MCP over `stdio`. Point Claude Code at it and it becomes an extension of your dev environment.

---

## ◈ SHIP'S COMPUTER — CONFIGURATION

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | HTTP server port |
| `DEBUG` | _(unset)_ | Set `DEBUG=1` to enable verbose logging |
| `NODE_ENV` | `production` | Environment mode |

Copy `.env.example` → `.env` and adjust before launch.

---

## ◈ SECURITY PROTOCOLS

```
◈  Input validation on all tool parameters
◈  Path normalization — prevents directory traversal attacks
◈  Command execution sandboxed with 10 MB output buffer
◈  Error messages sanitized before client delivery
◈  NGINX rate limiting in production Docker stack
◈  Non-root container execution in Dockerfile
```

---

## ◈ TECH MANIFEST — BUILT WITH

| Component | Technology |
|---|---|
| Runtime | Node.js 18+ |
| MCP Protocol | `@modelcontextprotocol/sdk` ^1.17 |
| HTTP Server | Express.js 5.x |
| Dashboard UI | Vanilla HTML · CSS (LCARS) · JS |
| Analytics | Custom metrics engine |
| Monitoring | Prometheus + Grafana |
| Cache | Redis |
| Proxy | NGINX |
| Containers | Docker + Docker Compose |
| Linting | ESLint + Prettier |

---

## ◈ CREW MANIFEST — DEVELOPMENT

```bash
npm run dev          # Engage debug warp (DEBUG=1)
npm run lint         # ESLint sweep
npm run lint:fix     # Auto-fix lint violations
npm run format       # Prettier formatting
npm run format:check # Verify formatting
npm run audit:fix    # Fix known vulnerabilities
```

> Full ops reference → [`CHEATSHEET.md`](./CHEATSHEET.md) · Architecture deep-dive → [`ARCHITECTURE.md`](./ARCHITECTURE.md)

---

<div align="center">

```
╔═══════════════════════════════════════════════════════════╗
║  ◈  STARFLEET MCP · ALL SYSTEMS NOMINAL · WARP READY  ◈  ║
╚═══════════════════════════════════════════════════════════╝
```

*"To boldly ship what no dev has shipped before."*

**⭐ Star this repo if it helped you reach warp speed!**

</div>
