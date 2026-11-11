# Sehrish Wellness — Postpartum Recovery & Strength

A responsive React + TypeScript + Vite website for Sehrish's postpartum movement and wellbeing training brand. The visual system uses **only** the four requested colours: cream `#F5F3EC`, charcoal `#232323`, sage `#546B5A`, and deep olive `#435246`.

## Run locally

Prerequisite: Node.js 22 or newer.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build: `npm run build`. To run TypeScript checks: `npm run lint`.

## Images are managed through YAML

All site photography is loaded from external HTTPS links in [`images.yml`](./images.yml). The site imports and parses that file at build time, so replacing a URL in the YAML registry updates the corresponding image without storing image binaries in the repository. Use direct image URLs from providers that permit hotlinking. Check licensing, permissions, and availability before publishing.

## GitHub Pages deployment

The project is configured for the repository path `/Sehrish-the-fitness-Coach-/`. The GitHub Actions workflow in `.github/workflows/deploy.yml` installs dependencies, runs the production build, and deploys `dist` to GitHub Pages whenever code is pushed to `main`. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.

If the repository name changes, update `base` in `vite.config.ts` to `/<new-repository-name>/`.

## Important before launch

- Confirm Sehrish's actual qualifications, scope of practice, contact details, and service availability. Do not imply she is a pelvic-health physiotherapist or medical professional unless she holds those credentials.
- The website includes postpartum safety language. It is educational and does not replace assessment or clearance from a doctor, midwife, or pelvic-health physiotherapist.
- No fabricated client testimonials are included. Add only genuine, permission-based testimonials through the site editor.
- Review all workout and resource content with an appropriately qualified postpartum exercise professional before offering it as a training programme.
- Replace stock photography with properly licensed brand photography when available.
- Contact form submissions open Instagram and save a local browser copy; this is not a secure server-side CRM. Do not ask visitors to submit sensitive medical details.

## Scripts

- `npm run dev` — local development server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — TypeScript check
- `npm run clean` — remove `dist`
