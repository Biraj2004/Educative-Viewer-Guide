import { motion } from 'framer-motion';
import { SetupGuideScrapper } from '@/components/SetupGuideScrapper';

interface SetupGuideProps {
  type: 'viewer' | 'scraper';
}

export const SetupGuide = ({ type }: SetupGuideProps) => {
  if (type === 'scraper') {
    return <SetupGuideScrapper />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 md:space-y-14">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-3"
      >
        <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold text-white">Prerequisites</h3>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            <li>Node.js 18+</li>
            <li>Python 3.10+</li>
            <li>Nginx or Apache (optional)</li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold text-white">Project Layout</h3>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            <li>client/ - Next.js frontend</li>
            <li>server/ - Flask backend</li>
            <li>proxy/ - Nginx/Apache configs</li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold text-white">Recommended Flow</h3>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            <li>Start backend first</li>
            <li>Then frontend</li>
            <li>Then proxy on localhost</li>
          </ul>
        </article>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">2. Folder Overview</h3>
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <ul className="space-y-2 text-slate-300 text-sm">
            <li><span className="text-slate-100 font-medium">client/</span>: Next.js frontend app</li>
            <li><span className="text-slate-100 font-medium">server/</span>: Flask backend service</li>
            <li><span className="text-slate-100 font-medium">proxy/</span>: Nginx/Apache sample configs</li>
          </ul>
          <p className="mt-4 text-sm text-slate-400">
            Use the commands below from the correct folder, or startup will fail.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">3. Backend Setup (Flask)</h3>
        <p className="text-slate-400">Open PowerShell in the project root and run:</p>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`cd server

# If you do not have a virtual environment yet:
python -m venv env

# Activate virtual environment:
.\env\Scripts\Activate.ps1

# Install backend dependencies:
pip install -r requirements.txt

# Create .env from sample:
Copy-Item .env.example .env`}
        </pre>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <p className="font-semibold text-white mb-3">Minimum values for server/.env</p>
          <pre className="rounded-lg border border-slate-800 bg-[#0A0B10] p-4 text-[11px] sm:text-xs text-slate-200 overflow-x-auto leading-relaxed">
{`FLASK_PORT=5000
FLASK_DEBUG=1
AUTH_DB_ENGINE=sqlite
AUTH_SQLITE_DB_PATH=/path/to/your/auth.sqlite3
COURSE_DB_ENGINE=sqlite
COURSE_SQLITE_DB_PATH=/path/to/your/course_db.sqlite3
JWT_SECRET=change-this-for-local-dev
INVITE_CODES=localcode`}
          </pre>
          <ul className="mt-3 space-y-2 pl-5 text-sm text-slate-300 list-disc">
            <li>
              <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-xs text-slate-100">AUTH_SQLITE_DB_PATH</span>{' '}
              is for user/auth data. The SQLite file is created if it does not exist.
            </li>
            <li>
              <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-xs text-slate-100">COURSE_SQLITE_DB_PATH</span>{' '}
              should point to your course database file.
            </li>
            <li>
              Leave Oracle values in{' '}
              <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-xs text-slate-100">.env</span>{' '}
              untouched if you are using SQLite.
            </li>
          </ul>
        </div>

        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">python app.py</pre>
        <p className="text-sm text-slate-400">Start backend and Keep this backend terminal open while running frontend/proxy.</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">4. Frontend Setup (Next.js)</h3>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`cd client
Copy-Item .env.local.example .env.local`}
        </pre>

        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-[11px] sm:text-xs text-slate-200 overflow-x-auto leading-relaxed">
{`NEXT_PUBLIC_BACKEND_API_BASE=http://localhost/
NEXT_PUBLIC_STATIC_FILES_BASE=http://localhost/
VERCEL_ENV=development
# Only add values here that are safe to expose in browser bundles.
# Never put private keys, tokens, or secrets in NEXT_PUBLIC_* vars.
# If backend logs show an RSA public key:
# NEXT_PUBLIC_RSA_PUBLIC_KEY=your-public-key-here`}
        </pre>

        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">node deploy.js</pre>
        <p className="text-sm text-slate-400">
          In the deploy menu choose option <span className="text-cyan-300 font-medium">2</span> (download release zip)
          or <span className="text-cyan-300 font-medium">4</span> (use existing local .next.zip).
          Frontend should come up at <span className="text-cyan-300 break-all">http://localhost:3000</span>.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">5. Local Proxy Setup (Optional, Recommended)</h3>

        <p className="text-slate-400 text-sm">
          Use proxy mode when you want a single localhost URL that routes API to Flask, serves static images
          from local disk, and forwards frontend traffic to Next.js.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <h4 className="font-semibold text-white">Nginx (Windows)</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Use proxy/nginx-windows.conf</li>
              <li>Keep only one active localhost:80 server block</li>
              <li>Set root to C:/inetpub/wwwroot/educativeviewer</li>
              <li>Ensure upstreams map to Flask:5000 and Next:3000</li>
              <li>Create C:/inetpub/wwwroot/educativeviewer/api/images</li>
            </ul>
            <pre className="mt-4 rounded-lg border border-slate-800 bg-[#0A0B10] p-4 text-[11px] sm:text-xs text-slate-200 overflow-x-auto leading-relaxed">nginx -t{`\n`}nginx -s reload</pre>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <h4 className="font-semibold text-white">Apache (Windows)</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Use proxy/apache-windows.conf</li>
              <li>Keep only one active localhost:80 vhost</li>
              <li>Alias to C:/inetpub/wwwroot/educativeviewer/api/</li>
              <li>Double-check alias path exists on disk</li>
              <li>Store images in api/images</li>
            </ul>
            <pre className="mt-4 rounded-lg border border-slate-800 bg-[#0A0B10] p-4 text-[11px] sm:text-xs text-slate-200 overflow-x-auto leading-relaxed">httpd -t{`\n`}httpd -k restart</pre>
          </article>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">6. Start Order (Quick)</h3>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`1) Start backend: python app.py
2) Start frontend: node deploy.js (in client)
3) Start or reload proxy
4) Open http://localhost`}
        </pre>

        <p className="text-sm text-slate-400">
          For full routing validation, use proxy URL <span className="text-cyan-300 break-all">http://localhost</span>
          instead of direct frontend URL.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">7. Verify Image Proxy</h3>

        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`C:/inetpub/wwwroot/educativeviewer/api/images/logo.png`}
        </pre>

        <p className="text-slate-400">Verify static image routing with:</p>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`http://localhost/api/images/logo.png`}
        </pre>

        <p className="text-sm text-slate-400">
          If this URL opens the image directly, proxy static mapping is configured correctly.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">8. Troubleshooting</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Frontend starts, API fails</p>
            <p>Ensure backend runs on port 5000 and client .env.local has NEXT_PUBLIC_BACKEND_API_BASE=http://localhost/</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Images return 404 through proxy</p>
            <p>Confirm file exists under C:/inetpub/wwwroot/educativeviewer/api/... and proxy paths match exactly.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Frontend command confusion</p>
            <p>For this workflow use node deploy.js from client and choose menu option 2 or 4.</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Port already in use</p>
            <p>Update conflicting ports in proxy config and matching environment variables.</p>
          </div>
        </div>
      </motion.section>

      <div className="rounded-2xl border border-cyan-900/40 bg-cyan-950/10 p-4 sm:p-5 text-sm sm:text-base text-slate-300 leading-relaxed">
        This setup guide is sourced from the repository README. Once backend, frontend, and proxy are running,
        use <span className="text-cyan-300 font-semibold break-all">http://localhost</span> as your main app URL.
      </div>
    </div>
  );
};
