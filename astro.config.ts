import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const repoSlug = process.env.GITHUB_REPOSITORY ?? '';
const [owner, repoName] = repoSlug.split('/');
const isUserSite = Boolean(repoName && repoName.endsWith('.github.io'));
const cnamePath = path.join(process.cwd(), 'public', 'CNAME');
const cname = existsSync(cnamePath) ? readFileSync(cnamePath, 'utf8').trim() : '';
const cnameUrl = cname ? `https://${cname}` : '';
const site =
  process.env.SITE_URL ||
  cnameUrl ||
  (owner && repoName
    ? isUserSite
      ? `https://${repoName}`
      : `https://${owner}.github.io/${repoName}`
    : 'https://example.com');

const normalizeBase = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '/';
  const noSlashes = trimmed.replace(/^\/+|\/+$/g, '');
  return `/${noSlashes}/`;
};

const explicitBase = process.env.SITE_BASE ? normalizeBase(process.env.SITE_BASE) : undefined;
const hasCname = Boolean(cname);
const isCustomDomain =
  Boolean(process.env.SITE_URL && !process.env.SITE_URL.includes('github.io')) || hasCname;
const base = explicitBase ?? (isCustomDomain ? '/' : isUserSite ? '/' : repoName ? `/${repoName}/` : '/');

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [svelte()]
});
