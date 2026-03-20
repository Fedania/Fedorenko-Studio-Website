import { handleRiveEvent } from "./riveEvents.js";
import { createRiveElement } from "/utilities/createRiveElement.js";

let riveAPI = null;

export function initRiveLanding() {
  const container = document.getElementById("controls");

  riveAPI = createRiveElement({
    container,
    src: "../assets/landing_02.riv",
    stateMachine: "State Machine 2",
    fit: "contain",
    onEvent: handleRiveEvent
  });

  return riveAPI;
}