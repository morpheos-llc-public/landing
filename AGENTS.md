# Repository Guidelines

## Project Structure & Module Organization

This repository is a static marketing site for Morpheos LLC. Primary pages live at the repository root, including `index.html`, `startups.html`, `Morpheos-QR-code.html`, `styles.css`, and `blog.css`. Static media and brand assets are in `banner/`; partner and resource pages are in `partners/` and `resources/`; wedding/invite pages are isolated under `invite/`. Event digests live in dated folders under `events-radar/`, with each digest containing `index.html` and optional metadata such as `meta.json`.

## Build, Test, and Development Commands

- `python3 -m http.server 8000`: preview the static site locally at `http://localhost:8000`.
- `open index.html`: open the homepage directly in a browser for quick static review on macOS.

There is no Node build step, package manager workflow, or automated test command. Deployment is handled by pushing the complete static site rather than building generated output in GitHub Actions.

## Coding Style & Naming Conventions

Use plain HTML and CSS unless a framework is explicitly introduced. Match the existing style: two-space indentation in HTML, four-space indentation in CSS, semantic sectioning, and descriptive class names. Keep shared site styling in `styles.css`; use page-specific styles only when isolation is necessary, such as `invite/styles.css` or `blog.css`. Prefer lowercase, hyphenated names for new folders and content paths, for example `events-radar/2026-03-03/`.

## Testing Guidelines

No automated test framework is configured. Validate changes manually by serving the site locally and checking affected pages in desktop and mobile widths. For visual changes, inspect navigation, hero sections, forms, images, and responsive layout behavior. Confirm links use the intended relative or absolute paths before committing.

## Commit & Pull Request Guidelines

Recent history uses short, imperative or descriptive messages such as `Add events radar digest for 2026-03-03` and `updated nav bar`. Keep commits focused on one change. Pull requests should include a concise summary, affected pages or directories, manual validation steps, and screenshots for visual changes. Link related issues when available.

## Security & Configuration Tips

Do not commit secrets, private client data, or unnecessary local files such as `.DS_Store`. Keep public assets optimized for web delivery and avoid adding large raw media unless required.
