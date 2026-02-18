let scrollHandler = null;
let hoverActive = false;
let hoverElements = [];

export function enableDesktop({ header, overlay }) {
  let lastScrollY = window.scrollY;

  const trigger = document.createElement("div");
  trigger.id = "header__trigger";
  trigger.className = "header__trigger";
  header.appendChild(trigger);

  function setHeaderState(show) {
    if (show) {
      header.classList.remove("hidden");
      header.classList.add("visible");

      overlay.classList.remove("overlay--expanded");
      overlay.classList.add("overlay--shrunk");
    } else {
      header.classList.add("hidden");
      header.classList.remove("visible");

      overlay.classList.add("overlay--expanded");
      overlay.classList.remove("overlay--shrunk");
    }
  }

  scrollHandler = () => {
    if (hoverActive) return;

    const current = window.scrollY;

    if (current > lastScrollY || current < 10) {
      setHeaderState(false);
    } else {
      setHeaderState(true);
    }

    lastScrollY = current;
  };

  window.addEventListener("scroll", scrollHandler);

  // Shared hover handlers
  const onEnter = () => {
    hoverActive = true;
    setHeaderState(true);
  };

  const onLeave = (e) => {
    // Check if cursor is still inside header or trigger
    if (
      header.contains(e.relatedTarget) ||
      trigger.contains(e.relatedTarget)
    ) {
      return;
    }

    hoverActive = false;
    scrollHandler();
  };

  // Attach to BOTH
  [trigger, header].forEach((el) => {
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  });

  hoverElements = [trigger, header];

  setHeaderState(false);
}

export function disableDesktop({ header, overlay }) {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler);
    scrollHandler = null;
  }

  hoverElements.forEach((el) => {
    el.replaceWith(el.cloneNode(true)); // quick clean way to remove listeners
  });

  hoverElements = [];

  const trigger = header.querySelector("#header__trigger");
  if (trigger) header.removeChild(trigger);

  header.classList.remove("hidden");
  header.classList.add("visible");

  overlay.classList.remove("overlay--expanded");
  overlay.classList.add("overlay--shrunk");
}