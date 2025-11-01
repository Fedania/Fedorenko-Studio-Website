## Purpose
This project is a small static portfolio site. The goal of these instructions is to help AI coding agents make minimal, correct, and safe edits — especially around the HTML/JS components, data model in `data/projects.json`, and page initialization logic in `script.js`.

## Big picture (quick)
- Static site (no build step in repo). Main entry points: `index.html`, `all-projects.html`, `project-page.html`.
- `script.js` is the app router: on DOMContentLoaded it calls page initializers by checking `window.location.pathname` (e.g. `path.includes('project-page.html')` → `initProjectPage()`).
- Reusable UI fragments are HTML partials in `components/` and are loaded at runtime with `loadComponent(...)` (see usages in `components/header.js` and `script.js`).
- Data model: `data/projects.json` with top-level `project` array. Project pages fetch this file (e.g. `pages/project/projectPage.js`).

## Key files & examples (patterns to replicate)
- Page init: `script.js` uses `type="module"` imports and `DOMContentLoaded` to wire page behavior. Keep new code modular (ES modules) and use relative imports.
- Component loading: call `loadComponent(containerId, pathToHtml, callback)` rather than manually query-inserting HTML. Example: `loadComponent("footer-container", "../components/footer.html", () => initScrollTop())`.
- Project navigation: clickable thumbnails have class `project` and use a `data-url` attribute; `script.js` has a delegated click handler that reads `data-url` and does `window.location.href = url`.
- Project page data flow: `pages/project/projectPage.js` reads `const projectId = window.location.hash.substring(1)` then fetches `../data/projects.json` and finds the entry with `data.project.find(p => p.id === projectId)`. When changing the project model, keep `id` stable.
- Data format example (use this shape when adding projects):

```json
{
  "id": "02-br-monobrew",
  "title": "Monobrew",
  "categories": ["Branding"],
  "thumbnail": "../images/02-br-monobrew/02-br-monobrew-01.jpg",
  "layout": [1,1,1],
  "link": "../projects/02-br-monobrew.html"
}
```

## Conventions & gotchas
- Paths are relative and pages live at different nesting levels. Keep `..` vs `.` in imports/fetches consistent with file location. For example, `pages/project/projectPage.js` fetches `../data/projects.json` (not `/data/...`).
- Module scripts: the root `index.html` uses `<script type="module" src="script.js"></script>` — prefer ES module syntax when adding files.
- UI fragments: HTML partials live under `components/` (e.g. `components/header.html`, `components/footer.html`). Use `loadComponent` to insert them so lifecycle hooks (callbacks) run consistently.
- Project pages expect the project ID in the URL hash (e.g. `project-page.html#01-br-downtown`). Don't change the lookup method without updating `projectPage.js`.
- Insertions: `data/projects.json` supports `insertions` with `type` values like `gif`, `mp4`, and `rive`. If adding new insertion types, search for all code that reads `insertions` (e.g. `pages/.../loadProjectImages.js`) and extend consistently.

## Dependencies & developer workflow
- There is no build script in `package.json` (only a `swiper` dependency). This is a static site. To preview locally use a simple static server or the VS Code Live Server extension.
- Quick local preview (PowerShell):

```powershell
# from repository root
python -m http.server 8000
# then open http://localhost:8000/index.html
```

## Editing guidance for agents
- Small, focused diffs: prefer editing or adding a single file per change. When updating any path or import, run a quick preview to validate `404`s and console errors.
- Keep data changes to `data/projects.json` minimal and syntactically valid JSON. Preserve existing `id` fields when changing titles or thumbnails so links won't break.
- When adding new components, mirror existing structure: `components/<name>.html` (markup) and `components/<name>.js` (optional behaviors). Wire them with `loadComponent` from the host page.

## Where to look first (jumpstart)
- `script.js` — global page initialization and routing.
- `data/projects.json` — canonical project data model.
- `components/` — HTML fragments and helper modules (`domHelpers.js`, `loadComponent.js`).
- `pages/project/projectPage.js` and `pages/services/` — examples of page-specific logic.

If any section above is unclear or you'd like more examples (e.g., exact `loadComponent` implementation or where `insertions` are rendered), tell me which area to expand and I will iterate.
