import { handleRiveEvent } from "./riveEvents.js";

export function initRiveLanding() {
  const canvas = document.getElementById("rive-canvas");
    
  if (!canvas) {
    console.warn("Rive canvas not found");
    return;
  }

  const riveInstance = new rive.Rive({
    src: "../assets/landing_01.riv",
    canvas: canvas,
    stateMachines: "State Machine 2",
    autoplay: true,

    onLoad: () => {
      riveInstance.resizeDrawingSurfaceToCanvas();
    }
  });

 riveInstance.on(
  rive.EventType.RiveEvent,
  handleRiveEvent
);
  window.addEventListener("resize", () => {
    riveInstance.resizeDrawingSurfaceToCanvas();
  });
}