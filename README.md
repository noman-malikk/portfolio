# Noman Ali Malik - Portfolio

A static, recruiter-focused portfolio built with Astro + TypeScript. The UI follows the "UI Craft Lab" theme with interactive demos that showcase frontend engineering depth.

## Local development

Recommended Node.js: 20 LTS or 22 LTS (Astro 5 requires 18.20.8+, 20.3+, or 22+).

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static output is generated in `dist/` (ready for GitHub Pages). A lightweight sitemap is generated from `scripts/generate-sitemap.mjs` during build.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
```

## GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` deploys on every push to `main`.

Base path is computed automatically in `astro.config.ts`:

- User site repo (e.g. `username.github.io`) -> base is `/`
- Project pages repo (e.g. `my-portfolio`) -> base is `/my-portfolio/`
- Custom domain (`SITE_URL` not on `github.io` or a `public/CNAME` file) -> base is `/`

If you need a specific base path (rare for custom domains), set `SITE_BASE`:

```bash
SITE_BASE=/portfolio/ npm run build
```

For local builds that match GitHub Pages paths, set the repo slug:

```bash
GITHUB_REPOSITORY=owner/repo npm run build
```

To update the sitemap host and OpenGraph URLs, set `SITE_URL` (for example `https://nomanmalik.co.uk`) or provide the `GITHUB_REPOSITORY` environment variable when building in CI. The workflow reads `SITE_URL` and `SITE_BASE` from GitHub repo variables (`Settings -> Secrets and variables -> Actions`). Custom domains are also supported via `public/CNAME`.

## Project structure

- `src/data/profile.ts` - single source of truth for content
- `src/components` - UI and interactive islands
- `src/pages` - Astro pages
- `src/styles` - tokens + global styles
