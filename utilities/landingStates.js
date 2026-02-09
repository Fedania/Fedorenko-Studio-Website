let activeOption = null;

export function setActiveOption(option) {
  activeOption = option;
  document.dispatchEvent(
    new CustomEvent("option-change", { detail: option })
  );
}

export function getActiveOption() {
  return activeOption;
}
