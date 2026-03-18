// landingState.js
let activeOption = null;
const listeners = new Set();
window.setActiveOption = setActiveOption;
export function setActiveOption(option) {
  console.log("[STATE] setActiveOption called with:", option);

  if (activeOption === option) {
    console.log("[STATE] same option, skipping update");
    return;
  }

  activeOption = option;

  console.log("[STATE] notifying listeners:", listeners.size);

  listeners.forEach(fn => fn(activeOption));
}

export function getActiveOption() {
  return activeOption;
}

export function subscribe(fn) {
  console.log("[STATE] new subscriber added");

  listeners.add(fn);

  console.log("[STATE] running subscriber immediately with:", activeOption);
  fn(activeOption);
}