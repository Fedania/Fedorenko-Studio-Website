import { setActiveOption, getActiveOption } from "./landingStates.js";

export function initToggleButtons(container) {
  const buttons = container.querySelectorAll("button[data-option]");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const option = el.dataset.option;
      const current = getActiveOption();

      setActiveOption(current === option ? null : option);
    });
  });

  document.addEventListener("option-change", e => {
    const active = e.detail;

    buttons.forEach(btn => {
      const isActive = el.dataset.option === active;
      btn.classList.toggle("is-active", isActive);
      btn.classList.toggle("is-inactive", active && !isActive);
    });
  });
}
