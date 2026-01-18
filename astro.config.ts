import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

const repoSlug = process.env.GITHUB_REPOSITORY ?? '';
const [owner, repoName] = repoSlug.split('/');
const isUserSite = Boolean(repoName && repoName.endsWith('.github.io'));
const base = isUserSite ? '/' : repoName ? `/${repoName}/` : '/';
const site = process.env.SITE_URL || (owner && repoName
  ? isUserSite
    ? `https://${repoName}`
    : `https://${owner}.github.io/${repoName}`
  : 'https://example.com');

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [svelte()]
});
