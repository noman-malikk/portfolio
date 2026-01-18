import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const repoSlug = process.env.GITHUB_REPOSITORY ?? '';
const [owner, repoName] = repoSlug.split('/');
const isUserSite = Boolean(repoName && repoName.endsWith('.github.io'));
const base = isUserSite ? '/' : repoName ? `/${repoName}/` : '/';
const site =
  process.env.SITE_URL ||
  (owner && repoName
    ? isUserSite
      ? `https://${repoName}`
      : `https://${owner}.github.io`
    : 'https://example.com');

const url = new URL(base, site).href;
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
  </url>
</urlset>
`;

const publicDir = path.join(process.cwd(), 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
