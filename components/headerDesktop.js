export function enableDesktop({ header, overlay }) {
  let lastScrollY = window.scrollY;
  let hoverActive = false;

  const trigger = document.createElement("div");
  trigger.id = "header__trigger";
  header.appendChild(trigger);

  function setHeaderState(show) {
    header.classList.toggle("visible", show);
    header.classList.toggle("hidden", !show);

    overlay.classList.toggle("overlay--shrunk", show);
    overlay.classList.toggle("overlay--expanded", !show);
  }

  function onScroll() {
    if (hoverActive) return;

    const current = window.scrollY;

    const shouldShow =
      current < 10
        ? true
        : !(current > lastScrollY);

    setHeaderState(shouldShow);
    lastScrollY = current;
  }

  function onEnter() {
    hoverActive = true;
    setHeaderState(true);
  }

  function onLeave(e) {
    if (header.contains(e.relatedTarget) || trigger.contains(e.relatedTarget)) return;
    hoverActive = false;
    onScroll();
  }

  window.addEventListener("scroll", onScroll);

  [trigger, header].forEach(el => {
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  });

  // default state
  setHeaderState(true);
  console.log("Desktop default");
}

export function enableDesktopLanding({ header, overlay }) {
  let lastScrollY = window.scrollY;
  let hoverActive = false;

  const trigger = document.createElement("div");
  trigger.id = "header__trigger";
  header.appendChild(trigger);

  function setHeaderState(show) {
    header.classList.toggle("visible", show);
    header.classList.toggle("hidden", !show);

    overlay.classList.toggle("overlay--shrunk", show);
    overlay.classList.toggle("overlay--expanded", !show);
  }

  function onScroll() {
    if (hoverActive) return;

    const current = window.scrollY;

    const shouldShow = !(current > lastScrollY || current < 10);

    setHeaderState(shouldShow);
    lastScrollY = current;
  }

  function onEnter() {
    hoverActive = true;
    setHeaderState(true);
  }

  function onLeave(e) {
    if (header.contains(e.relatedTarget) || trigger.contains(e.relatedTarget)) return;
    hoverActive = false;
    onScroll();
  }

  window.addEventListener("scroll", onScroll);

  [trigger, header].forEach(el => {
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  });

  // ✅ FORCE INITIAL STATE (hidden)
  setHeaderState(false);
}