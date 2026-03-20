export function createRiveElement({
  container,
  src,
  artboard,
  stateMachine,
  fit = "contain",
  alignment = "center",
  onEvent
}) {
  if (!container) {
    console.warn("[RIVE] container missing");
    return null;
  }

  // DOM
  const wrapper = document.createElement("div");
  wrapper.classList.add("rive-wrapper");

  const canvas = document.createElement("canvas");
  canvas.classList.add("rive-animation");
  wrapper.appendChild(canvas);
  container.appendChild(wrapper);

  canvas.style.width = "100%";
  canvas.style.height = "auto";
  canvas.style.display = "block";

  let riveInstance = null;
  let inputs = [];
  let pendingValues = {};

  const resizeCanvas = () => {
    if (!riveInstance) return;
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    riveInstance.resizeDrawingSurfaceToCanvas();
  };

  // Rive init
  riveInstance = new rive.Rive({
    src,
    canvas,
    autoplay: true,
    artboard: artboard || undefined,
    stateMachines: stateMachine ? [stateMachine] : [],
    layout: new rive.Layout({
      fit: rive.Fit[fit.charAt(0).toUpperCase() + fit.slice(1)],
      alignment: rive.Alignment[alignment.charAt(0).toUpperCase() + alignment.slice(1)]
    }),
    onLoad: () => {
      console.log("[RIVE] loaded:", src);

      resizeCanvas();

      if (stateMachine) {
        inputs = riveInstance.stateMachineInputs(stateMachine);
        console.log("[RIVE] inputs:", inputs.map(i => i.name));

        // apply pending values
        Object.entries(pendingValues).forEach(([name, value]) => {
          const input = inputs.find(i => i.name === name);
          if (input) {
            console.log(`[RIVE] applying pending ${name} =`, value);
            input.value = value;
            delete pendingValues[name];
          }
        });
      }
    }
  });

  if (onEvent) {
    riveInstance.on(rive.EventType.RiveEvent, onEvent);
  }

  window.addEventListener("resize", resizeCanvas);

  return {
    instance: riveInstance,
    getInput(name) {
      return inputs.find(i => i.name === name);
    },
    setNumberInput(name, value) {
      const input = inputs.find(i => i.name === name);
      if (input) {
        console.log(`[RIVE] setting ${name} =`, value);
        input.value = value;
      } else {
        console.log(`[RIVE] queueing ${name} =`, value);
        pendingValues[name] = value;
      }
    },
    fireTrigger(name) {
      const input = inputs.find(i => i.name === name);
      if (input && input.fire) input.fire();
    }
  };
}