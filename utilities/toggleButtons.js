// toggleButtons.js
import { setActiveOption, getActiveOption } from "./landingState.js";

export function initToggleButtons(container) {
  const options = container.querySelectorAll(".landing__hero__option-btn");

  options.forEach(el => {
    const activate = () => {
      const option = el.dataset.option;
      const current = getActiveOption();

      // Toggle logic:
      // click same option again → reset to null
      setActiveOption(current === option ? null : option);
    };

    el.addEventListener("click", activate);

    // Keyboard support (for divs)
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  // React to state changes
  document.addEventListener("option-change", e => {
    const active = e.detail; // "a" | "b" | null

    options.forEach(el => {
      const option = el.dataset.option;
      const isActive = option === active;

      el.classList.toggle("is-active", isActive);
      el.classList.toggle(
        "is-inactive",
        active !== null && !isActive
      );
    });
  });
}
