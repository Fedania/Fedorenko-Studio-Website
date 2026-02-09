// contentSwitcher.js
  import { recalcAccordion } from "/pages/services/accordion.js";
export function initContentSwitcher() {
  const main = document.getElementById("content-default");
  const optionA = document.getElementById("content-start-small");
  const optionB = document.getElementById("content-think-big");



  function update(activeOption) {
  const showMain = activeOption === null;

  main.hidden = !showMain;
  optionA.hidden = activeOption !== "a";
  optionB.hidden = activeOption !== "b";

  // 👇 wait for visibility to apply, then recalc
  requestAnimationFrame(() => {
    const visibleSection =
      showMain ? main :
      activeOption === "a" ? optionA :
      optionB;

    recalcAccordion(visibleSection);
  });
}
  // Initial state
  update(null);

  document.addEventListener("option-change", (e) => {
    update(e.detail);
  });
}
