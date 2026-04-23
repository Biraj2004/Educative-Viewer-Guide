# Educative Viewer Guide

This repository powers the official setup guide website for EducativeViewer.

- Live Guide: https://educative-viewer-guide.vercel.app/
- Viewer Project: https://github.com/Biraj2004/educative-viewer/
- Guide Source: https://github.com/Biraj2004/Educative-Viewer-Guide

## What This Guide Covers

This guide is focused on local setup and verification for the viewer stack:

- Backend setup (Flask)
- Frontend setup (Next.js builder workflow)
- Local proxy setup (Nginx or Apache)
- Environment variable reference
- Troubleshooting and verification steps

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Repository Structure](#repository-structure)
- [Backend Setup (Flask)](#backend-setup-flask)
- [Frontend Setup (Nextjs)](#frontend-setup-nextjs)
- [Environment Variables Reference](#environment-variables-reference)
- [Local Proxy Setup](#local-proxy-setup)
- [Start Order Quick Reference](#start-order-quick-reference)
- [Verify Image Proxy](#verify-image-proxy)
- [Troubleshooting](#troubleshooting)
- [Related Documentation](#related-documentation)

## Architecture Overview

```text
Browser -> Nginx / Apache  (:80)
			 |- /api/*  -> Flask       (:5000)   known API routes
			 |- /api/*  -> local disk            static / image assets
			 \- /*      -> Next.js     (:3000)   everything else
```

| Layer | Technology | Default Port |
|---|---|---|
| Frontend | Next.js App Router (React 19, TypeScript, Tailwind v4) | `3000` |
| Backend | Flask (Python 3.10+) | `5000` |
| Auth DB | Oracle or SQLite (configured via env) | - |
| Course DB | SQLite (optional shard mapping) | - |
| Reverse Proxy | Nginx or Apache | `80` |

## Prerequisites

Install these before setup:

- Node.js 18+
- Python 3.10+
- Nginx or Apache (needed only for local proxy routing)

## Repository Structure

```text
educative-viewer/
|- client/                  # Next.js frontend
|- server/                  # Flask backend
|  |- backend/
|  |  |- routes/            # Auth, courses, admin, contact endpoints
|  |  |- db/                # SQLite + Oracle adapters, DB manager
|  |  |- auth_service.py    # JWT, RSA, session, 2FA logic
|  |  \- config.py          # AppConfig env parsing
|  |- app.py                # Flask app entrypoint
|  \- setup_and_run.py      # First-time setup helper
|- proxy/                   # Nginx and Apache config files
|- Cloudflare_Vercel.md
|- CONTRIBUTING.md
|- SECURITY.md
\- README.md
```

## Backend Setup (Flask)

Open a terminal in the `server/` directory.

### First-time setup

```powershell
cd server

# Create and activate a virtual environment
python -m venv env
.\env\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run one-time setup helper
python setup_and_run.py
```

`setup_and_run.py` handles:

1. RSA-2048 key generation and `RSA_PRIVATE_KEY` injection into `server/.env`
2. Printing the RSA public key for frontend use (`NEXT_PUBLIC_RSA_PUBLIC_KEY`)
3. Prompting required server `.env` values
4. Optional immediate Flask startup

### Subsequent runs

```powershell
cd server
.\env\Scripts\Activate.ps1
python app.py
```

Keep this terminal running while using the frontend.

## Frontend Setup (Next.js)

Open a second terminal in the `client/` directory:

```powershell
cd client
npm install
node build-and-run.js
```

Builder menu options:

```text
1) Full build + obfuscate + zip + create new release
2) Full build + obfuscate + zip + upload to existing release
3) Build + obfuscate + zip only (no upload)
4) Build + obfuscate + run local server
5) Build only (no obfuscation) + zip
6) Build and run local server
7) Upload existing .next.zip to existing release
8) Upload existing .next.zip as new release
9) Manage saved GitHub repos
0) Exit
```

For local development, choose option `6`.

### Non-interactive commands

```powershell
node build-and-run.js local      # prompt env -> build -> obfuscate -> start server
node build-and-run.js serve      # prompt env -> start server (requires existing .next)
node build-and-run.js build      # prompt env -> build -> obfuscate -> zip
node build-and-run.js build:only # prompt env -> build (no obfuscation) -> zip
node build-and-run.js upload     # zip -> upload to existing release
node build-and-run.js release    # zip -> create new release
node build-and-run.js download   # download .next.zip from a release
```

## Environment Variables Reference

| Variable | Description | Local Default |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_API_BASE` | Base URL of Flask backend | `http://localhost/` |
| `NEXT_PUBLIC_STATIC_FILES_BASE` | Base URL for static/image assets | `http://localhost/` |
| `NEXT_PUBLIC_RSA_PUBLIC_KEY` | RSA public key printed by `setup_and_run.py` | paste backend output |
| `NEXT_PUBLIC_STATIC_BASIC_AUTH` | Optional Basic Auth for protected static worker | leave blank if unused |
| `PROXY_SECRET` | Shared secret for `x-edu-proxy` header | not required locally |
| `VERCEL_ENV` | Deployment environment identifier | `development` |

Important: in production (`VERCEL_ENV=production`), middleware enforces `x-edu-proxy == PROXY_SECRET`. Use `VERCEL_ENV=development` for local runs.

## Local Proxy Setup

Use proxy mode when you want one `http://localhost` URL that:

- Routes known backend API paths (`/api/*`) to Flask (`:5000`)
- Serves static/image files from local disk under `/api`
- Forwards everything else to Next.js (`:3000`)

### Option A: Nginx (Windows)

1. Use [proxy/nginx-windows.conf](proxy/nginx-windows.conf)
2. Ensure only one active `localhost:80` server block exists
3. Confirm config values:

```nginx
server_name localhost;
root C:/inetpub/wwwroot/educativeviewer;
# Flask upstream: 127.0.0.1:5000
# Next.js upstream: 127.0.0.1:3000
```

4. Create local static folder:

```text
C:/inetpub/wwwroot/educativeviewer/api/images/
```

5. Validate and reload:

```powershell
nginx -t
nginx -s reload
```

### Option B: Apache (Windows)

1. Use [proxy/apache-windows.conf](proxy/apache-windows.conf)
2. Ensure only one active `localhost:80` virtual host exists
3. Confirm Alias path:

```text
C:/inetpub/wwwroot/educativeviewer/api/
```

4. Put static images under:

```text
C:/inetpub/wwwroot/educativeviewer/api/images/
```

5. Validate and restart:

```powershell
httpd -t
httpd -k restart
```

## Start Order Quick Reference

1. Start backend

```powershell
cd server
.\env\Scripts\Activate.ps1
python app.py
```

2. Start frontend

```powershell
cd client
node build-and-run.js
# choose option 6
```

3. Start or reload proxy

```powershell
# Nginx
nginx -s reload

# Apache
httpd -k restart
```

4. Open app

```text
http://localhost
```

Use `http://localhost` (proxy) instead of `http://localhost:3000` for full routing behavior.

## Verify Image Proxy

Place a test image at:

```text
C:/inetpub/wwwroot/educativeviewer/api/images/logo.png
```

Open:

```text
http://localhost/api/images/logo.png
```

If it renders, static proxy routing is working.

## Troubleshooting

### API calls fail from frontend

- Confirm Flask is running on `5000`
- Confirm `NEXT_PUBLIC_BACKEND_API_BASE=http://localhost/`
- Confirm proxy routes `/api/*` to Flask

### Frontend does not start

- Use `node build-and-run.js` (not `npm run dev`)
- Choose option `6`
- To serve existing build only:

```powershell
node build-and-run.js serve
```

### Images return 404 through proxy

- Confirm file exists under `C:/inetpub/wwwroot/educativeviewer/api/...`
- Confirm Nginx `root` or Apache `Alias` matches disk path exactly

### Port already in use

- Change conflicting port in proxy config
- Update matching frontend env values

### Session expires or login redirects unexpectedly

- Confirm `NEXT_PUBLIC_RSA_PUBLIC_KEY` exactly matches output from `setup_and_run.py`
- RSA mismatch can break browser-side encryption and auth flow

## Related Documentation

- [Cloudflare_Vercel.md](Cloudflare_Vercel.md)
- [proxy/README.md](proxy/README.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [SECURITY.md](SECURITY.md)

Main usage note: once backend, frontend, and proxy are running, use `http://localhost` as your primary local URL.
