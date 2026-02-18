// layoutController.js
import { enableDesktop, disableDesktop } from "/components/headerDesktop.js";
import { enableMobile, disableMobile } from "/components/headerMobile.js";

export function initLayoutController(context) {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  let currentMode = null;

  function applyMode() {
    const mode = mediaQuery.matches ? "mobile" : "desktop";

    console.log("Applying mode:", mode);

    if (mode === currentMode) return;

    if (currentMode === "desktop") {
      disableDesktop(context);
    }

    if (currentMode === "mobile") {
      disableMobile(context);
    }

    if (mode === "desktop") {
      enableDesktop(context);
    }

    if (mode === "mobile") {
      enableMobile(context);
    }

    currentMode = mode;
  }

  mediaQuery.addEventListener("change", applyMode);
  applyMode();
}