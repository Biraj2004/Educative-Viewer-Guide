'use client';

import { useEffect, useState } from 'react';

const RELEASE_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

interface ReleaseVersionProps {
  owner: string;
  repo: string;
}

export const ReleaseVersion = ({ owner, repo }: ReleaseVersionProps) => {
  const [version, setVersion] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const cacheKey = `release:${owner}/${repo}`;

    const readCachedRelease = () => {
      if (typeof window === 'undefined') return null;

      try {
        const raw = window.localStorage.getItem(cacheKey);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as { version?: string; updatedAt?: string; cachedAt?: number };
        if (!parsed.version) return null;
        if (!parsed.cachedAt || Date.now() - parsed.cachedAt > RELEASE_CACHE_TTL_MS) {
          return null;
        }

        return {
          version: parsed.version,
          updatedAt: parsed.updatedAt ?? '',
        };
      } catch {
        return null;
      }
    };

    const applyCachedRelease = () => {
      const cached = readCachedRelease();
      if (!cached) return false;

      setVersion(cached.version);
      setUpdatedAt(cached.updatedAt);
      return true;
    };

    // Show last known release immediately, then refresh in background.
    
    applyCachedRelease();

    const loadLatestRelease = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          cache: 'force-cache',
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.status === 403) {
          if (!applyCachedRelease()) {
            setVersion('latest');
          }
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch latest release');
        }

        const data = (await response.json()) as { tag_name?: string; name?: string; published_at?: string };
        const label = data.tag_name || data.name || 'latest';

        setVersion(label);
        let formattedDate = '';
        if (data.published_at) {
          const date = new Date(data.published_at);
          formattedDate = date.toLocaleDateString();
          setUpdatedAt(formattedDate);
        } else {
          setUpdatedAt('');
        }

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(
            cacheKey,
            JSON.stringify({
              version: label,
              updatedAt: formattedDate,
              cachedAt: Date.now(),
            })
          );
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          if (!applyCachedRelease()) {
            setVersion('latest');
            setUpdatedAt('');
          }
        }
      } finally {
        clearTimeout(timeout);
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadLatestRelease();

    return () => {
      controller.abort();
    };
  }, [owner, repo]);

  return (
    <div className="w-3/4 md:w-auto rounded-xl border border-cyan-900/40 bg-cyan-950/20 px-4 py-3 text-sm text-cyan-200 min-w-0 md:min-w-42.5 text-center">
      <div>
        <span className="text-cyan-300/80">Release:</span>{' '}
        <span className="font-semibold">{loading ? 'loading...' : version}</span>
      </div>
      {!loading && updatedAt ? (
        <div className="text-[11px] text-cyan-300/70 mt-1">Updated {updatedAt}</div>
      ) : null}
    </div>
  );
};
