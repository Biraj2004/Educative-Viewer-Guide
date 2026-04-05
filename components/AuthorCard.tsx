'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, ExternalLink } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

const avatarCache = new Map<string, string | null>();
const avatarRequestCache = new Map<string, Promise<string | null>>();

const fetchGithubAvatar = (username: string) => {
  if (avatarCache.has(username)) {
    return Promise.resolve(avatarCache.get(username) ?? null);
  }

  if (avatarRequestCache.has(username)) {
    return avatarRequestCache.get(username)!;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const request = fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    signal: controller.signal,
  })
    .then(async (response) => {
      clearTimeout(timeout);
      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { avatar_url?: string };
      return data.avatar_url ?? null;
    })
    .catch(() => {
      clearTimeout(timeout);
      return null;
    })
    .then((avatarUrl) => {
      avatarCache.set(username, avatarUrl);
      avatarRequestCache.delete(username);
      return avatarUrl;
    });

  avatarRequestCache.set(username, request);
  return request;
};

interface AuthorProp {
  id: 'viewer' | 'scraper';
  active: boolean;
  onSelect: (id: 'viewer' | 'scraper') => void;
  name: string;
  role: string;
  handle: string;
  description: string;
  projects: { name: string; type: string; url: string; badgeColor: string }[];
  avatarInitial: string;
  gradient: string;
}

export const AuthorCard = ({
  id,
  active,
  onSelect,
  name,
  role,
  handle,
  description,
  projects,
  avatarInitial,
  gradient
}: AuthorProp) => {
  const username = useMemo(() => handle.replace('@', '').trim(), [handle]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => avatarCache.get(username) ?? null);

  useEffect(() => {
    let ignore = false;

    fetchGithubAvatar(username).then((url) => {
      if (!ignore) {
        setAvatarUrl(url);
      }
    });

    return () => {
      ignore = true;
    };
  }, [username]);

  const handleCardSelect = () => {
    onSelect(id);
  };

  return (
    <motion.div
      onClick={handleCardSelect}
      aria-current={active ? 'true' : undefined}
      className={`glass-card rounded-2xl p-5 md:p-8 cursor-pointer transition-all duration-300 relative overflow-hidden group 
        touch-manipulation ${active ? 'ring-2 outline-none ring-cyan-500/50 bg-slate-900/40 shadow-xl shadow-cyan-900/10' : 'hover:ring-1 hover:ring-slate-700 hover:bg-slate-900/20'}
      `}
      whileHover={{ y: active ? 0 : -4 }}
    >
      {/* Subtle selection glow behind card */}
      {active && (
         <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full blur-3xl opacity-20 bg-linear-to-br ${gradient} pointer-events-none`} />
      )}

      <div className="flex items-center justify-between mb-5 md:mb-6">
        <div className="flex items-center space-x-4 z-10">
          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center text-lg md:text-xl font-bold bg-linear-to-br ${gradient} text-white shadow-lg`}>
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={`${name} avatar`}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            ) : (
              avatarInitial
            )}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-100">{name}</h3>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-400">
              <span className="font-medium text-cyan-400">{role}</span>
              <span>•</span>
              <span className="flex items-center">
                <GithubMark className="w-3 h-3 mr-1" aria-hidden="true" />
                {handle}
              </span>
            </div>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-slate-800/50 hidden sm:flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
          <GithubMark className="w-5 h-5 text-slate-400" aria-hidden="true" />
        </div>
      </div>

      <div className="mb-5 md:mb-6 z-10 relative">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(id);
          }}
          aria-pressed={active}
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
            active
              ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-200'
              : 'border-slate-700/80 bg-slate-900/40 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-200'
          }`}
        >
          {active ? 'Selected' : 'Select Guide'}
        </button>
      </div>

      <p className="text-slate-300 leading-relaxed mb-6 md:mb-8 z-10 relative text-[15px] md:text-base">
        {description}
      </p>

      <div className="space-y-3 z-10 relative">
        {projects.map((project, idx) => (
          <a
            key={idx} 
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent toggling when clicking a link directly
            className={`flex items-center justify-between gap-3 p-3 md:p-4 rounded-xl border border-slate-800/60 bg-[#0a0f20]/50 hover:bg-slate-800/40 transition-colors ${active && idx === 0 ? 'ring-1 ring-slate-700' : ''}`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${project.badgeColor} bg-opacity-10 border border-current text-current`}>
                  <Code2 className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-200 text-sm md:text-base leading-tight truncate">{project.name}</p>
                <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {project.type}
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 shrink-0 text-slate-500 hover:text-slate-300" aria-hidden="true" />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

const GithubMark = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.1-.34 6.33-1.53 6.33-6.98 0-1.55-.54-2.81-1.43-3.8.14-.35.62-1.8-.14-3.75 0 0-1.16-.36-3.88 1.48a13.38 13.38 0 0 0-7 0c-2.72-1.84-3.88-1.48-3.88-1.48-.76 1.95-.28 3.4-.14 3.75-.89.99-1.43 2.25-1.43 3.8 0 5.44 3.23 6.63 6.32 6.98-.8.2-1.46.73-1.74 1.54M9 19c-4 1-5-2-7-2" />
  </svg>
);
