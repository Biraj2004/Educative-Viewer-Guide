# EducativeViewer Local Setup Guide

This guide shows how to run the app on your computer (Windows).

It covers:
- Backend (Flask)
- Frontend (Next.js)
- Local reverse proxy (Nginx or Apache)
- Serving images through the local proxy

## 1. Prerequisites

Install these first:
- Node.js 18+
- Python 3.10+
- Nginx or Apache (only if you want local proxy routing)

## 2. Folder Overview

- `client/`: Next.js frontend
- `server/`: Flask backend
- `proxy/`: Ready-to-use Nginx/Apache config files

## 3. Backend Setup (Flask)

Open PowerShell in the project root, then run:

```powershell
cd server

# If you do not have a virtual environment yet:
python -m venv env

# Activate virtual environment:
.\env\Scripts\Activate.ps1

# Install backend dependencies:
pip install -r requirements.txt

# Create .env from sample:
Copy-Item .env.example .env
```

Open `server/.env` and set at least these values:

```env
FLASK_PORT=5000
FLASK_DEBUG=1
AUTH_DB_ENGINE=sqlite
AUTH_SQLITE_DB_PATH=/path/to/your/auth.sqlite3
COURSE_DB_ENGINE=sqlite
COURSE_SQLITE_DB_PATH=/path/to/your/course_db.sqlite3
JWT_SECRET=change-this-for-local-dev
INVITE_CODES=localcode
```

Notes:
- `AUTH_SQLITE_DB_PATH` is for user/auth data. The SQLite file is created if it does not exist.
- `COURSE_SQLITE_DB_PATH` should point to your course database file.
- Leave Oracle values in `.env` untouched if you are using SQLite.

Start backend:

```powershell
python app.py
```

Keep this terminal running.

## 4. Frontend Setup (Next.js)

Open a second PowerShell terminal:

```powershell
cd client
Copy-Item .env.local.example .env.local
```

Open `client/.env.local` and set:

```env
NEXT_PUBLIC_BACKEND_API_BASE=http://localhost/
NEXT_PUBLIC_STATIC_FILES_BASE=http://localhost/
VERCEL_ENV=development
```

If your backend logs show an RSA private/public key message, copy the public key value to:

```env
NEXT_PUBLIC_RSA_PUBLIC_KEY=your-public-key-here
```

Start frontend:

```powershell
node deploy.js
```

Then choose one of these options from the menu:
- `2`: Download zip from GitHub Releases + run locally
- `4`: Run locally (uses existing `.next.zip`)

Frontend runs on: `http://localhost:3000`

## 5. Local Proxy Setup (API Split + Local Images)

Use this when you want one local URL that:
- Sends real backend API routes to Flask
- Serves image/static files from local disk under `/api`
- Sends everything else to Next.js

### Option A: Nginx (Windows)

1. Use config: [proxy/nginx-windows.conf](proxy/nginx-windows.conf)
2. If your main `nginx.conf` already has a default `server { ... }` block on port 80, comment/remove it before using this project server block.
3. Keep only one active `localhost:80` server block for this app, otherwise Nginx may serve the wrong site.
4. In the file, confirm these values:

```nginx
server_name localhost;
root C:/inetpub/wwwroot/educativeviewer;
# Flask upstream: 127.0.0.1:5000
# Next upstream: 127.0.0.1:3000
```

5. Create local static folder:

```text
C:/inetpub/wwwroot/educativeviewer/api/images
```

6. Put image files there, for example:

```text
C:/inetpub/wwwroot/educativeviewer/api/images/logo.png
```

7. Test and reload Nginx:

```powershell
nginx -t
nginx -s reload
```

### Option B: Apache (Windows)

1. Use config: [proxy/apache-windows.conf](proxy/apache-windows.conf)
2. If your main Apache config already has a default `<VirtualHost *:80>` for localhost, disable/comment it when enabling this project vhost.
3. Keep only one active `localhost:80` vhost for this app, otherwise requests may go to the wrong virtual host.
4. Confirm `Alias` path points to:

```text
C:/inetpub/wwwroot/educativeviewer/api/
```

5. Put images in:

```text
C:/inetpub/wwwroot/educativeviewer/api/images
```

6. Test and restart Apache:

```powershell
httpd -t
httpd -k restart
```

## 6. Start Order (Quick)

1. Start backend in `server/`:

```powershell
python app.py
```

2. Start frontend in `client/`:

```powershell
node deploy.js
```

Choose option `2` or option `4`.

3. Start or reload Nginx/Apache with the proxy config.
4. Open: `http://localhost`

Use `http://localhost` (proxy) instead of `http://localhost:3000` when testing full local routing.

## 7. Verify Image Proxy

After adding `logo.png` to:

```text
C:/inetpub/wwwroot/educativeviewer/api/images/logo.png
```

Open this URL in your browser:

`http://localhost/api/images/logo.png`

If the image opens, local proxy image serving is working.

## 8. Troubleshooting

### Frontend starts but API fails
- Confirm backend is running on port `5000`.
- Confirm `NEXT_PUBLIC_BACKEND_API_BASE=http://localhost/` in `client/.env.local`.

### Frontend does not start with npm commands
- Use `node deploy.js` instead of `npm install` / `npm run dev`.
- In the menu, choose option `2` or `4` for local run.

### Images return 404 through proxy
- Confirm file exists under `C:/inetpub/wwwroot/educativeviewer/api/...`.
- Confirm proxy root/alias paths match your real folder.

### Port already in use
- Change the port in config and matching env values.

Once all three services are running, use `http://localhost` as your main local app URL.
