// contentSwitcher.js
import { subscribe } from "./landingState.js";
import { recalcAccordion } from "/pages/services/accordion.js";

export function initContentSwitcher() {
  const main = document.getElementById("content-default");
  const optionB = document.getElementById("content-start-small");
  const optionA = document.getElementById("content-think-big");

  console.log("[SWITCHER] elements:", { main, optionA, optionB });

  function update(activeOption) {
    console.log("[SWITCHER] update called with:", activeOption);

    const showMain = activeOption === null;

    main.hidden = !showMain;
    optionA.hidden = activeOption !== "a";
    optionB.hidden = activeOption !== "b";

    console.log("[SWITCHER] visibility:", {
      main: !main.hidden,
      optionA: !optionA.hidden,
      optionB: !optionB.hidden
    });

    requestAnimationFrame(() => {
      const visible =
        showMain ? main :
        activeOption === "a" ? optionA :
        optionB;

      console.log("[SWITCHER] recalculating accordion for:", visible);

      recalcAccordion(visible);
    });
  }

  subscribe(update);
}