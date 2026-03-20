// landingPage.js
import { onLayoutChange } from "../../utilities/layoutController.js";
import { initContentSwitcher } from "../../utilities/contentSwitcher.js";
import { loadComponent } from "../../utilities/loadComponent.js";
import { initRiveLanding } from "../../utilities/riveLanding.js";

export async function initLandingPage() {
  await loadComponent("#content-default", "../../pages/landing/content-default.html");
  await loadComponent("#content-start-small", "../../pages/landing/content-start-small.html");
  await loadComponent("#content-think-big", "../../pages/landing/content-think-big.html");

  initContentSwitcher();

  const riveAPI = initRiveLanding();

  onLayoutChange((mode) => {
    if (!riveAPI) return;

    const map = {
      desktop: 0,
      tablet: 1,
      mobile: 2
    };

    riveAPI.setNumberInput("layout", map[mode]);
    riveAPI.instance.resizeDrawingSurfaceToCanvas(); // keep canvas responsive
  });
}