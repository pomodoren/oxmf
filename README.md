# Open Exposure Model Foundation

A dependency-free, static website for OXMF. It uses one dark-teal palette defined as CSS custom properties in `public/css/oxmf.css`, plus an editorial layer in `public/css/immersive.css`.

## Run locally

Requires Node.js 18+ and Python 3. No npm install is needed.

```sh
npm run dev
```

Open http://localhost:8000. After editing source files, restart the command to rebuild, or run `npm run build` in a second terminal and refresh.

```sh
npm run check
npm run build
npm run preview
```

## Pages

- `public/index.html`: Home — hero, an exposure explorer, projects, and a figure gallery
- `public/open-data.html`: Open Data — the taxonomy, aggregate model, and building-level model, each described on the page itself
- `public/open-source.html`: Open Source — OXM Web, the QGIS Building Plugin, OXM Loss Calculator, each described on the page itself
- `public/projects.html`: the projects OXMF is working on, plus the development roadmap
- `public/about.html`: About us, including the Partners section
- `public/ecosystem.html`: how OXM Mini, OXM Example, Exposure Share, and document extraction connect
- `public/css/oxmf.css`: palette, fluid type scale, sections, and shared components
- `public/css/immersive.css`: the dark-teal editorial theme layered on top
- `public/js/oxmf.js`: mobile navigation and the gallery dialog
- `public/js/immersive.js`: the home-page exposure explorer

Pages are plain HTML with shared CSS and JavaScript. The header and footer are duplicated in every page — keep the nav (Home / Open Data / Open Source / Projects / About us) consistent when editing.

### Type and sections

Every heading and body size is a `clamp()` token in `:root` (`--size-hero`, `--size-h1`, `--text-base`, …) so type scales smoothly between phone and desktop; do not hard-code `font-size` on headings. A content section is `<section class="section [grid-surface|section-green]"><div class="wrap">` with an `h2` and optional `.section-lead`. `section-green` is the dark-teal panel. Small uppercase `eyebrow` kickers were removed from section headers; `eyebrow` survives only as gallery figure categories and the ecosystem tool names.

Every page opens with a big photo hero — the home page uses `.immersive-hero` (a full-bleed `<img class="hero-landscape">` plus dark wash), interior pages use `.page-hero .page-hero--<name>` which pulls its background image from a `--hero-img` var set in `oxmf.css` (kept in CSS, not inline, so the CSP stays `style-src 'self'`). After the hero the section backgrounds alternate **light → dark → light → dark**; the first section after the hero is always light. Light sections (and both `.item` variants) carry the 32px dot grid.

Open Data, Open Source, and Projects list their items as full-width `.item` bands (`<div class="items"><section class="item [alt] [flip]">`), one per item, alternating light/dark with the figure and text swapping sides — not a card grid. `.item.alt` is the dark band; `.item.flip` moves the figure to the right; `.item-media.badge` is the numbered block used where there is no image (Projects).

### Projects

To add a project, copy a `<section class="item …">` band in `public/projects.html`, set its number, tag, name, and text, and keep the `alt` / `flip` classes alternating. Bands with a `TODO` comment hold placeholder copy. The old worked-example pages under `public/projects/` (Istanbul, Durrës, Andorra, Albania) are kept in the repo but are not linked from the site.

## Deployment

`npm run build` writes the site to **`dist/`** by copying `public/` verbatim. `dist/` is generated and git-ignored — it is never committed; the deploy target builds it.

### GitHub Pages (via Actions)

Use **GitHub Actions**, not "deploy from a branch". Pages' branch mode can only serve `/` or `/docs` from a committed folder, but this site has a build step and `dist/` is not in git. `.github/workflows/deploy.yml` runs the build on every push to `main` and publishes `dist/` with the official `actions/deploy-pages` flow (no npm dependencies, so it is just `node tools/build.mjs`).

One-time setup: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**. After that, each push to `main` redeploys; the workflow can also be run manually from the Actions tab. The site lands at `https://<user>.github.io/<repo>/`. All links in the HTML are relative, so it works from that sub-path unchanged. For a custom domain, add a one-line `public/CNAME` file with the hostname and set the domain in Settings → Pages.

Caveat: GitHub Pages ignores `public/_headers` and cannot send custom response headers, so the CSP and security headers in that file are **not enforced on Pages**. They apply on hosts that read `_headers` (Cloudflare Pages, Netlify).

### Cloudflare Pages / Netlify

Build command `npm run build`, output directory `dist`. `public/_headers` supplies the CSP and security headers on these hosts.

## Gallery and hero

Figures live in `public/assets/gallery/`. The home page uses one as a full-width hero background (`img.hero-landscape` in `index.html`, currently `occupancy-andorra.png`), shows six in the gallery grid, and the Open Data / Open Source item bands reuse others. `height.png` and `occupancy-nonres.png` are currently unused. Update the captions and the source note in `public/index.html` when replacing images. The gallery supports previous/next controls, arrow keys, Escape, and direct image links without JavaScript.

## Theme

`public/css/immersive.css` layers a dark-teal editorial theme over the shared layout: a dark header and footer, one light-teal accent, and an image-led hero. `public/js/immersive.js` drives a three-perspective explorer on the home page with mouse and keyboard controls. Motion is brief and respects reduced-motion preferences.
