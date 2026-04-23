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
        <article className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold text-white">Prerequisites</h3>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            <li>Node.js 18+</li>
            <li>Python 3.10+</li>
            <li>Nginx or Apache (optional)</li>
          </ul>
        </article>

        <article className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold text-white">Ports and Routing</h3>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            <li>Frontend: Next.js on 3000</li>
            <li>Backend: Flask on 5000</li>
            <li>Proxy: localhost on 80</li>
          </ul>
        </article>

        <article className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <h3 className="text-lg font-semibold text-white">Recommended Start Order</h3>
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
        <h3 className="text-xl sm:text-2xl font-bold text-white">1. Architecture Overview</h3>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`Browser -> Nginx / Apache  (:80)
             |- /api/*  -> Flask       (:5000)   known API routes
             |- /api/*  -> local disk            static / image assets
             \- /*      -> Next.js     (:3000)   everything else`}
        </pre>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-1">Frontend</p>
            <p>Next.js App Router</p>
            <p className="text-slate-400">Port: 3000</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-1">Backend</p>
            <p>Flask (Python 3.10+)</p>
            <p className="text-slate-400">Port: 5000</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-1">Databases</p>
            <p>SQLite with optional Oracle auth DB</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-1">Reverse Proxy</p>
            <p>Nginx or Apache</p>
            <p className="text-slate-400">Port: 80</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">2. Repository Structure</h3>
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <pre className="rounded-lg border border-slate-800 bg-[#0A0B10] p-4 text-[11px] sm:text-xs text-slate-200 overflow-x-auto leading-relaxed">
{`educative-viewer/
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
\- README.md`}
          </pre>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">3. Backend Setup (Flask)</h3>
        <p className="text-slate-400">Open PowerShell in the server directory and run first-time setup:</p>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`cd server

# Create and activate a virtual environment
python -m venv env
.\env\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run one-time setup helper
python setup_and_run.py`}
        </pre>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
          <p className="font-semibold text-white mb-3">What setup_and_run.py handles automatically</p>
          <ul className="space-y-2 pl-5 text-sm text-slate-300 list-disc">
            <li>
              Generates an RSA-2048 key pair and writes <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-xs text-slate-100">RSA_PRIVATE_KEY</span> to <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-xs text-slate-100">server/.env</span>.
            </li>
            <li>
              Prints the RSA public key. Paste that value into frontend env as <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-xs text-slate-100">NEXT_PUBLIC_RSA_PUBLIC_KEY</span>.
            </li>
            <li>
              Prompts for required server .env values like DB paths, JWT secret, invite codes, and Flask port/debug.
            </li>
            <li>
              On later runs, if <span className="rounded-md bg-slate-900 px-2 py-1 font-mono text-xs text-slate-100">RSA_PRIVATE_KEY</span> already exists, key generation is skipped.
            </li>
          </ul>
        </div>

        <p className="text-slate-400">Subsequent backend runs:</p>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`cd server
.\env\Scripts\Activate.ps1
python app.py`}
        </pre>
        <p className="text-sm text-slate-400">Keep this backend terminal running while frontend and proxy are active.</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">4. Frontend Setup (Next.js)</h3>
        <p className="text-slate-400">Open a second terminal in client and run:</p>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`cd client
npm install
node build-and-run.js`}
        </pre>

        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-[11px] sm:text-xs text-slate-200 overflow-x-auto leading-relaxed">
{`1) Full build + obfuscate + zip + create new release
2) Full build + obfuscate + zip + upload to existing release
3) Build + obfuscate + zip only (no upload)
4) Build + obfuscate + run local server
5) Build only (no obfuscation) + zip
6) Build and run local server
7) Upload existing .next.zip to existing release
8) Upload existing .next.zip as new release
9) Manage saved GitHub repos
0) Exit`}
        </pre>

        <p className="text-sm text-slate-400">
          For local development choose <span className="text-cyan-300 font-medium">option 6</span>. It prompts env values, builds, and serves at <span className="text-cyan-300 break-all">http://localhost:3000</span>.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">5. CLI Non-Interactive Commands</h3>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`node build-and-run.js local      # prompt env -> build -> obfuscate -> start server
node build-and-run.js serve      # prompt env -> start server (needs existing .next)
node build-and-run.js build      # prompt env -> build -> obfuscate -> zip
node build-and-run.js build:only # prompt env -> build (no obfuscation) -> zip
node build-and-run.js upload     # zip -> upload to existing release
node build-and-run.js release    # zip -> create new release
node build-and-run.js download   # download .next.zip from release`}
        </pre>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">6. Environment Variables Reference</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/70">
          <table className="w-full min-w-[720px] text-sm text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Variable</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Local Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">NEXT_PUBLIC_BACKEND_API_BASE</td>
                <td className="px-4 py-3">Base URL for Flask backend</td>
                <td className="px-4 py-3 font-mono text-xs">http://localhost/</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">NEXT_PUBLIC_STATIC_FILES_BASE</td>
                <td className="px-4 py-3">Base URL for static/image assets</td>
                <td className="px-4 py-3 font-mono text-xs">http://localhost/</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">NEXT_PUBLIC_RSA_PUBLIC_KEY</td>
                <td className="px-4 py-3">Public key printed by setup_and_run.py</td>
                <td className="px-4 py-3 text-slate-400">Paste from backend output</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">NEXT_PUBLIC_STATIC_BASIC_AUTH</td>
                <td className="px-4 py-3">Optional Basic Auth header for static worker</td>
                <td className="px-4 py-3 text-slate-400">Leave blank if unused</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">PROXY_SECRET</td>
                <td className="px-4 py-3">Secret for x-edu-proxy header</td>
                <td className="px-4 py-3 text-slate-400">Not required locally</td>
              </tr>
              <tr className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">VERCEL_ENV</td>
                <td className="px-4 py-3">Deployment environment identifier</td>
                <td className="px-4 py-3 font-mono text-xs">development</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-slate-400 text-sm">
          Important: when <span className="font-mono text-slate-200">VERCEL_ENV=production</span>, middleware enforces <span className="font-mono text-slate-200">x-edu-proxy == PROXY_SECRET</span>. Use <span className="font-mono text-slate-200">VERCEL_ENV=development</span> for local runs.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">7. Local Proxy Setup</h3>

        <p className="text-slate-400 text-sm">
          Use this when you need one <span className="font-mono text-slate-200">http://localhost</span> URL that routes known backend API paths to Flask, serves static files from local disk under /api, and forwards everything else to Next.js.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <h4 className="font-semibold text-white">Nginx (Windows)</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Use config at proxy/nginx-windows.conf</li>
              <li>Keep only one active localhost:80 server block</li>
              <li>Confirm server_name and root values</li>
              <div className="mt-1 overflow-x-auto rounded-md border border-slate-800 bg-[#0A0B10] px-2 py-1">
                <span className="inline-block min-w-max font-mono text-xs text-slate-200">server_name localhost; root C:/inetpub/wwwroot/educativeviewer;</span>
              </div>
              <li>Create local static folder</li>
              <div className="mt-1 overflow-x-auto rounded-md border border-slate-800 bg-[#0A0B10] px-2 py-1">
                <span className="inline-block min-w-max font-mono text-xs text-slate-200">C:/inetpub/wwwroot/educativeviewer/api/images</span>
              </div>
              <li>Ensure upstreams map to Flask:5000 and Next:3000</li>
            </ul>
            <pre className="mt-4 rounded-lg border border-slate-800 bg-[#0A0B10] p-4 text-[11px] sm:text-xs text-slate-200 overflow-x-auto leading-relaxed">nginx -t{`\n`}nginx -s reload</pre>
          </article>

          <article className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <h4 className="font-semibold text-white">Apache (Windows)</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Use config at proxy/apache-windows.conf</li>
              <li>Keep only one active localhost:80 vhost</li>
              <li>Confirm Alias path</li>
              <div className="mt-1 overflow-x-auto rounded-md border border-slate-800 bg-[#0A0B10] px-2 py-1">
                <span className="inline-block min-w-max font-mono text-xs text-slate-200">C:/inetpub/wwwroot/educativeviewer/api/</span>
              </div>
              <li>Store images in C:/inetpub/wwwroot/educativeviewer/api/images/</li>
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
        <h3 className="text-xl sm:text-2xl font-bold text-white">8. Start Order (Quick Reference)</h3>
        <pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`1) Start backend
cd server
.\\env\\Scripts\\Activate.ps1
python app.py

2) Start frontend
cd client
node build-and-run.js
# choose option 6

3) Start/reload proxy
nginx -s reload
# or
httpd -k restart

4) Open app
http://localhost`}
        </pre>

        <p className="text-sm text-slate-400">
          Always use proxy URL <span className="text-cyan-300 break-all">http://localhost</span> instead of direct frontend URL for full API and static routing.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">9. Verify Image Proxy</h3>

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
        <h3 className="text-xl sm:text-2xl font-bold text-white">10. Troubleshooting</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">API calls fail from frontend</p>
            <p>Confirm Flask is running on 5000, frontend env uses localhost base URLs, and proxy is routing /api/* to Flask.</p>
          </div>

          <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Frontend does not start</p>
            <p>Use node build-and-run.js and choose option 6. To serve existing build without rebuilding, run:</p>
            <div className="mt-1 overflow-x-auto rounded-md border border-slate-800 bg-[#0A0B10] px-2 py-1">
              <span className="inline-block min-w-max font-mono text-xs text-slate-200">node build-and-run.js serve</span>
            </div>
          </div>

          <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Images return 404 through proxy</p>
            <p>Confirm file exists under:</p>
            <div className="mt-1 overflow-x-auto rounded-md border border-slate-800 bg-[#0A0B10] px-2 py-1">
              <span className="inline-block min-w-max font-mono text-xs text-slate-200">C:/inetpub/wwwroot/educativeviewer/api/...</span>
            </div>
            <p className="mt-2">and ensure root/Alias paths match exactly.</p>
          </div>

          <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Session expires or login redirects unexpectedly</p>
            <p>Verify NEXT_PUBLIC_RSA_PUBLIC_KEY in client env exactly matches the public key printed by setup_and_run.py. Any mismatch can break browser-side encryption.</p>
          </div>

          <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white mb-2">Port already in use</p>
            <p>Update conflicting proxy/backend ports and the matching frontend environment values.</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-5"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white">11. Related Documentation</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <a href="https://educative-viewer-guide.vercel.app/" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300 hover:border-cyan-700/60 transition-colors">
            <p className="font-semibold text-white">Setup Guide Website</p>
            <p className="mt-1 text-slate-400">Visual walkthrough for local and production setup.</p>
          </a>
          <a href="https://github.com/Biraj2004/educative-viewer/releases" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300 hover:border-cyan-700/60 transition-colors">
            <p className="font-semibold text-white">educative-viewer</p>
            <p className="mt-1 text-slate-400">Latest releases for educative-viewer.</p>
          </a>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Cloudflare_Vercel.md</p>
            <p className="mt-1 text-slate-400">Edge deployment with Cloudflare Worker and Vercel.</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">proxy/README.md</p>
            <p className="mt-1 text-slate-400">Detailed proxy routing rules and config reference.</p>
          </div>
        </div>
      </motion.section>

      <div className="rounded-2xl border border-cyan-900/40 bg-cyan-950/10 p-4 sm:p-5 text-sm sm:text-base text-slate-300 leading-relaxed">
        This setup guide is synchronized with the latest README workflow. After backend, frontend, and proxy are active, use <span className="text-cyan-300 font-semibold break-all">http://localhost</span> as your primary local URL.
      </div>
    </div>
  );
};
