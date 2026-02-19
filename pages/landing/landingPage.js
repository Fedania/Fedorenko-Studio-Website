import { initToggleButtons } from "../../utilities/toggleButtons.js";
import { initContentSwitcher } from "../../utilities/contentSwitcher.js";
import { loadComponent } from "../../utilities/loadComponent.js";

export async function initLandingPage() {
  // Buttons already exist in HTML
  const controls = document.getElementById("controls");

  if (!controls) {
    console.warn("Landing page: controls not found");
    return;
  }

  initToggleButtons(controls);

  // Load page content sections
  await loadComponent("#content-default", "../../pages/landing/content-default.html");
  await loadComponent("#content-start-small", "../../pages/landing/content-start-small.html");
  await loadComponent("#content-think-big", "../../pages/landing/content-think-big.html");

  initContentSwitcher();
}
