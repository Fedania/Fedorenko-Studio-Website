// layoutController.js
import { enableDesktop, enableDesktopLanding } from "/components/headerDesktop.js";
import { enableMobile } from "/components/headerMobile.js";

let currentMode = null;
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
    if (width <= 768) return "mobile";
    if (width <= 1024) return "tablet";
    return "desktop";
  }

  function applyMode() {
    const newMode = getMode();

    // 🔥 reload on ANY mode change (mobile ↔ tablet included)
    if (currentMode && newMode !== currentMode) {
      console.log(`Mode changed (${currentMode} → ${newMode}) → reloading`);
      window.location.reload();
      return;
    }

    if (newMode === currentMode) return;

    console.log("Applying mode:", newMode);

    // 🔥 init layout only once
    if (!currentMode) {
      if (newMode === "desktop") {
        if (context.isLandingPage) {
          enableDesktopLanding(context);
        } else {
          enableDesktop(context);
        }
      } else {
        // mobile + tablet share same layout
        enableMobile(context);
      }
    }

    currentMode = newMode;

    // 🔥 notify (Rive etc.)
    listeners.forEach(cb => cb(currentMode));
  }

  window.addEventListener("resize", applyMode);

  applyMode();
}