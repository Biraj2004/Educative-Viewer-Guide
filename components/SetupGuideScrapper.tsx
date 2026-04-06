import { motion } from 'framer-motion';

export const SetupGuideScrapper = () => {
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
						<li>Git</li>
						<li>Python 3.12 or more</li>
						<li>OS: Win (x86/x64), Mac (ARM64/x64), Linux (ARM64/x64)</li>
					</ul>
				</article>

				<article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
					<h3 className="text-lg font-semibold text-white">Repository Info</h3>
					<ul className="mt-3 space-y-2 text-slate-300 text-sm">
						<li>Repository Version: v4.0.20 (Recommended)</li>
						<li>Master Branch: v4-dev</li>
						<li>Viewer target: Educative-Viewer V5</li>
					</ul>
				</article>

				<article className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
					<h3 className="text-lg font-semibold text-white">Updates Information</h3>
					<ul className="mt-3 space-y-2 text-slate-300 text-sm">
						<li>Topic content now stored in DB for dynamic viewer rendering.</li>
						<li>V4 receives API Scraper fixes.</li>
						<li>V3 receives Single File HTML scraper fixes.</li>
					</ul>
				</article>
			</motion.section>

			<motion.section
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="space-y-5"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-white">1. Download and Enter Project Directory</h3>
				<pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`git clone https://github.com/anilabhadatta/educative.io_scraper.git
cd educative.io_scraper`}
				</pre>
			</motion.section>

			<motion.section
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="space-y-5"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-white">2. Automatic Setup and Run</h3>
				<p className="text-slate-400 text-sm sm:text-base">Use <span className="font-semibold text-slate-200">python3</span> instead of <span className="font-semibold text-slate-200">python</span> on Linux and macOS.</p>
				<pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`python setup.py --install
python setup.py --run`}
				</pre>

				<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
					<p className="font-semibold text-white mb-3">Available setup.py commands</p>
					<ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
						<li><span className="font-mono text-slate-100">--install</span>: Creates a virtual environment and installs dependencies.</li>
						<li><span className="font-mono text-slate-100">--run</span>: Activates the environment and starts the scraper (default true).</li>
						<li><span className="font-mono text-slate-100">--create</span>: Creates a shortcut executable linked to the scraper directory.</li>
					</ul>
					<p className="mt-4 text-sm text-slate-400">
						If you move the git repository after creating the executable, run create again so it points to the new repository path.
					</p>
				</div>
			</motion.section>

			<motion.section
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="space-y-5"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-white">3. Manual Setup (Windows)</h3>
				<pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`pip install virtualenv
python -m venv env <or> virtualenv env
env\\Scripts\\activate
pip install -r requirements.txt

python EducativeScraper.py                 # UI
python EducativeScraper.py --loginbrowser  # Open browser login
python EducativeScraper.py --terminal      # Terminal mode
python EducativeScraper.py --help          # Config and help`}
				</pre>
			</motion.section>

			<motion.section
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="space-y-5"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-white">4. Manual Setup (macOS/Linux)</h3>
				<pre className="rounded-xl border border-slate-800 bg-[#0A0B10] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
{`pip3 install virtualenv
python3 -m venv env <or> virtualenv env
source env/bin/activate
pip3 install -r requirements.txt

python3 EducativeScraper.py                 # UI
python3 EducativeScraper.py --loginbrowser  # Open browser login
python3 EducativeScraper.py --terminal      # Terminal mode
python3 EducativeScraper.py --help          # Config and help`}
				</pre>

				<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 text-sm text-slate-300">
					Run the help command before terminal-based scraping to learn the required config setup.
				</div>
			</motion.section>

			<motion.section
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="space-y-5"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-white">5. Input URLs and Start Workflow</h3>

				<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
					<ul className="space-y-2 text-sm sm:text-base text-slate-300 list-disc pl-5">
						<li>Create a text file.</li>
						<li>Copy the first topic or lesson URL from any number of courses.</li>
						<li>Paste all URLs into the text file and save it.</li>
						<li>Select custom configuration only if you do not want default configuration.</li>
						<li>Choose headless mode if you do not want to display a browser window.</li>
						<li>Provide a unique User Data Directory name for storing the current session.</li>
						<li>Select both: the text file path and the output save directory for the database.</li>
						<li>Optionally save or export the current configuration for later use.</li>
						<li>For first setup or updates, click Download Chromedriver and Download Chrome Binary.</li>
						<li>Click Login Account, complete authentication, then click Close Browser Button.</li>
						<li>Click Start Scraper to begin scraping.</li>
						<li>Scraper stops automatically after all selected URLs are scraped.</li>
					</ul>
				</div>
			</motion.section>

			<motion.section
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="space-y-5"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-white">6. Proxy Usage (Optional)</h3>

				<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
					<p className="text-sm sm:text-base text-slate-300 mb-3">
						If using proxies, enable proxy and enter values in the proxies box.
					</p>
					<ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
						<li>For IP-authorized proxy: enter <span className="font-mono text-slate-100">IP:PORT</span>.</li>
						<li>For USER:PASS proxy: create a localhost tunnel using Proxy-Login-Automator.</li>
						<li>Then enter the localhost tunnel <span className="font-mono text-slate-100">IP:PORT</span> in scraper proxy settings.</li>
					</ul>

					<a
						href="https://github.com/anilabhadatta/proxy-login-automator"
						target="_blank"
						rel="noreferrer"
						className="inline-flex mt-4 text-cyan-300 hover:text-cyan-200 text-sm font-medium"
					>
						Open Proxy-Login-Automator repository
					</a>
				</div>
			</motion.section>

			<motion.section
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="space-y-5"
			>
				<h3 className="text-xl sm:text-2xl font-bold text-white">7. Resume, Overwrite, and Assets</h3>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
						<p className="font-semibold text-white mb-2">Projects URL rule</p>
						<p>For projects, add the project link in the text file and do not add the first topic link of the project.</p>
					</div>

					<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
						<p className="font-semibold text-white mb-2">Auto Resume</p>
						<p>Auto Resume tries each URL up to 3 times when errors occur before marking failure.</p>
					</div>

					<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
						<p className="font-semibold text-white mb-2">Auto Fix URL</p>
						<p>Auto Fix URL updates the text file and removes completed URLs to avoid unnecessary rescraping.</p>
					</div>

					<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
						<p className="font-semibold text-white mb-2">DB and Overwrite</p>
						<p>DB tracks topic scraping status to resume leftovers. Enable Overwrite if you need a fresh overwrite run.</p>
					</div>

					<div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300 md:col-span-2">
						<p className="font-semibold text-white mb-2">Assets</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Extract Assets: run only if you want to extract assets again.</li>
							<li>By default, assets are already stored while scraping each topic.</li>
							<li>Download Assets saves extracted Images, SVGs, and files in the selected save directory.</li>
						</ul>
					</div>
				</div>
			</motion.section>

			<div className="rounded-2xl border border-cyan-900/40 bg-cyan-950/10 p-4 sm:p-5 text-sm sm:text-base text-slate-300 leading-relaxed">
				This scraper setup guide is sourced from the project README.md and mirrors the workflow from the upstream repository documentation.
			</div>
		</div>
	);
};
