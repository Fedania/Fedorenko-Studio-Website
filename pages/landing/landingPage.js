// landingPage.js
import { initContentSwitcher } from "../../utilities/contentSwitcher.js";
import { loadComponent } from "../../utilities/loadComponent.js";
import { initRiveLanding } from "../../utilities/riveLanding.js";

export async function initLandingPage() {
  console.log("[INIT] loading components...");

  await loadComponent("#content-default", "../../pages/landing/content-default.html");
  await loadComponent("#content-start-small", "../../pages/landing/content-start-small.html");
  await loadComponent("#content-think-big", "../../pages/landing/content-think-big.html");

  console.log("[INIT] components loaded");

  initContentSwitcher();
  console.log("[INIT] content switcher initialized");

  initRiveLanding();
  console.log("[INIT] rive initialized");
}