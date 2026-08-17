# Agenda — Fedorenko Studio

Living to-do list, maintained by the **pm** agent. Newest decisions on top.

## Now
_(in progress)_

## Next
_(agreed, not started)_

## Ideas / Parking lot
- Evaluate migrating the site to Astro.

### Extend loading skeletons to other pages
- **What:** Apply the same shimmer/placeholder loading treatment to the landing content sections and the project-page gallery.
- **Why:** Skeletons were added to the all-projects thumbnail grid only; these pages still pop content in piecemeal.
- **Owner:** dev
- **Status:** idea

### Bake header/footer in at build time
- **What:** Pre-render header/footer instead of fetching via JS (`loadComponent`) on each page.
- **Why:** Avoids the flash while components load.
- **Owner:** dev
- **Status:** idea

## Done

### Remove dead router
- **What:** Delete `core/router.js`.
- **Why:** Imported nowhere; duplicates page logic already in `script.js`.
- **Owner:** dev
- **Status:** done

### Simplify page detection in script.js
- **What:** Replace repeated `path.endsWith(...) || path === "/"` checks with one "which page is this?" helper; fix root path trying to init every page.
- **Why:** Same behavior, clearer; stops `/` from initializing all pages at once.
- **Owner:** dev
- **Status:** done

### Remove "redirecting" loading page
- **What:** Make `/` serve the landing page directly (index.html) instead of redirecting to `/pages/landing.html`; logo now links to `/`; old `pages/landing.html` deleted.
- **Why:** Adds an unnecessary step before content appears.
- **Owner:** dev
- **Status:** done

### Add placeholder skeletons while loading
- **What:** Shimmer placeholder on each project thumbnail card until its image loads, then fade in. (all-projects grid only)
- **Why:** Content currently pops in piecemeal, looking broken; placeholders make loading feel stable.
- **Owner:** dev
- **Status:** done

### Add line spacing to thumbnail captions
- **What:** Scoped `line-height: 1.4` on `.project-card__overlay h6`.
- **Why:** Two-line captions felt cramped; more space improves readability.
- **Owner:** dev
- **Status:** done

### Style the three legal pages consistently
- **What:** Removed `beige`/`white` body classes from AGB and Datenschutz so all three legal pages inherit the default dark theme (black bg, light text).
- **Why:** They should look uniform and match the site's dark theme.
- **Owner:** dev
- **Status:** done

---
_Format for a task:_
```
### <short title>
- **What:** one line
- **Why:** one line
- **Owner:** dev / copy
- **Status:** idea | agreed | in progress | done
```
