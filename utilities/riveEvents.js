
// riveEvents.js
import { setActiveOption } from "./landingState.js";


export function handleRiveEvent(e) {
  const name = e.data.name;

  console.log("[RIVE] event received:", name);

  const eventMap = {
    "think big": "b",
    "start small": "a",
    "default": null
  };

  const option = eventMap[name];

  console.log("[RIVE] mapped option:", option);

  if (option !== undefined) {
    console.log("[RIVE] calling setActiveOption with:", option);
    setActiveOption(option);
  } else {
    console.warn("[RIVE] unmapped event:", name);
  }
}