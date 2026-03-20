// layoutController.js
import { enableDesktop, enableDesktopLanding } from "/components/headerDesktop.js";
import { enableMobile } from "/components/headerMobile.js";

let currentMode = null;
let currentLayout = null;
let listeners = [];
let isInitialized = false;

export function onLayoutChange(callback) {
  listeners.push(callback);

  if (currentMode) {
    callback(currentMode);
  }
}

export function initLayoutController(context) {
  if (isInitialized) return;
  isInitialized = true;

  function getMode() {
    const width = window.innerWidth;
    if (width <= 480) return "mobile";
    if (width <= 1024) return "tablet";
    return "desktop";
  }

  function getLayout(mode) {
    return mode === "desktop" ? "desktop" : "mobile";
  }

  function applyMode() {
    const newMode = getMode();
    const newLayout = getLayout(newMode);

    // 🔥 reload only if layout type changes
    if (currentLayout && newLayout !== currentLayout) {
      console.log("Layout changed → reloading");
      window.location.reload();
      return;
    }

    if (newMode === currentMode) return;

    console.log("Applying mode:", newMode);

    // init layout only once
    if (!currentLayout) {
      if (newLayout === "desktop") {
        if (context.isLandingPage) {
          enableDesktopLanding(context);
        } else {
          enableDesktop(context);
        }
      }

      if (newLayout === "mobile") {
        enableMobile(context);
      }
    }

    currentMode = newMode;
    currentLayout = newLayout;

    // 🔥 notify Rive etc.
    listeners.forEach(cb => cb(currentMode));
  }

  window.addEventListener("resize", applyMode);

  applyMode();
}
