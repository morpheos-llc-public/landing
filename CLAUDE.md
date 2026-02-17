# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Morpheos LLC** (www.morpheos.llc), an AI consulting firm. Hosted on GitHub Pages, deployed from the `live-deploy` branch via GitHub Actions. The `main` branch is the primary development branch.

## Architecture

This is a **no-build static site** — plain HTML, CSS, and vanilla JavaScript. There is no framework, bundler, or SSG actively in use (Eleventy was previously used but has been removed).

### Key Files

- **`index.html`** — The main landing page (~2000 lines). Contains all CSS inline in a `<style>` block and all JS inline in a `<script>` block at the bottom. Includes structured data (JSON-LD FAQPage schema) in `<head>`.
- **`styles.css`** — Shared stylesheet used by sub-pages (`/resources/`, etc.) but **not** by `index.html` (which has its own inline styles that largely duplicate this file).
- **`blog.css`** — Blog-specific styles.
- **`startups.html`** — Standalone page for startup services.

### Sub-pages (each has its own `index.html`)

- **`/resources/`** — AI strategy resources page. Links `styles.css` externally.
- **`/invite/`** — Event invitation pages (personal, not business-related).
- **`/partners/`** — Contains only client/partner logo images.

### Scripts

- **`scripts/fetch-substack.js`** — Node.js script that fetches posts from the Morpheos Substack RSS feed, converts HTML to Markdown via Turndown, and writes them to `_posts/` directory. Run with `npm run fetch-posts`.
- **`scripts/qrcode.min.js`** — QR code generation library (used by `Morpheos-QR-code.html`).

### Blog

The blog listing template (`blog/index.njk`) is a Nunjucks/Eleventy artifact. The blog system was previously Eleventy-based but Eleventy has been removed. The `refactor-blog` branch is the current work area for this.

## Commands

```bash
npm run fetch-posts    # Fetch latest Substack posts into _posts/ as Markdown
npm install            # Install dependencies (rss-parser, jsdom, turndown, node-fetch)
```

No build step, linting, or test suite exists. To preview locally, serve the root directory with any static file server (e.g., `npx serve .` or `python3 -m http.server`).

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers on push to `live-deploy`, runs `npm run build` (which will need to be defined or removed), and deploys to GitHub Pages. The CNAME is `www.morpheos.llc`.

## Design System

- **Color scheme**: Pure black (`#000`) background, white (`#FFF`) text, minimal palette.
- **Fonts**: `Outfit` (headings, weight 600), `Nunito` (body, weights 300/400/600) — loaded from Google Fonts.
- **CTA buttons**: White background on black, with a `.secondary` outline variant.
- **Mobile**: Hamburger menu slides in from right. Hero video is hidden on mobile, replaced with a static `banner/Waves.png` background.
- **Breakpoint**: 768px is the single mobile breakpoint.

## Important Patterns

- `index.html` has **inline CSS and JS** — do not look for external stylesheets or script files for the main page.
- The nav uses **JavaScript-driven dropdowns** (Services and Contact) on desktop and a separate `.mobile-menu` for mobile. Both must be updated together when nav items change.
- Service sections use **accordion toggles** (`.service-header` / `.service-content` with `.active` class toggling).
- **Testimonial carousel** and **client logo carousel** use custom vanilla JS with touch/swipe support and optional autoplay via `data-autoplay` and `data-interval` attributes.
- The `banner/` directory contains logo variants, hero video loops (`.mp4`), and background images.
