# Agenda — Fedorenko Studio

Living to-do list, maintained by the **pm** agent. Newest decisions on top.

## Now
_(in progress)_

## Next
_(agreed, not started)_

### Remove dead router
- **What:** Delete `core/router.js`.
- **Why:** Imported nowhere; duplicates page logic already in `script.js`.
- **Owner:** dev
- **Status:** agreed

### Simplify page detection in script.js
- **What:** Replace repeated `path.endsWith(...) || path === "/"` checks with one "which page is this?" helper; fix root path trying to init every page.
- **Why:** Same behavior, clearer; stops `/` from initializing all pages at once.
- **Owner:** dev
- **Status:** agreed

### Remove "redirecting" loading page
- **What:** Remove the loading/"redirecting" page shown when the site first loads.
- **Why:** Adds an unnecessary step before content appears.
- **Owner:** dev
- **Status:** agreed

### Add placeholder skeletons while loading
- **What:** Show empty image-container placeholders on load, then swap in real content as it loads.
- **Why:** Content currently pops in piecemeal, looking broken; placeholders make loading feel stable.
- **Owner:** dev
- **Status:** agreed

## Ideas / Parking lot
- Evaluate migrating the site to Astro.

### Bake header/footer in at build time
- **What:** Pre-render header/footer instead of fetching via JS (`loadComponent`) on each page.
- **Why:** Avoids the flash while components load.
- **Owner:** dev
- **Status:** idea

## Done
_(completed items move here)_

---
_Format for a task:_
```
### <short title>
- **What:** one line
- **Why:** one line
- **Owner:** dev / copy
- **Status:** idea | agreed | in progress | done
```
