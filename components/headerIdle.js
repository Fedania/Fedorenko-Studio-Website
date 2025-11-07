// headerIdle.js
export function setupHeaderIdleLogic(header, overlay) {
  let idleTimer;
  let userActive = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let lastScrollY = window.scrollY;
    let isHovering = false;
     let isHeaderExpanded = false;

  const hideHeader = () => {
    if (isHovering) return;
    header.classList.add("hidden");
    header.classList.remove("visible");
    overlay.classList.add("overlay--expanded");
    overlay.classList.remove("overlay--shrunk");
  };

  const showHeader = () => {
    header.classList.remove("hidden");
    header.classList.add("visible");
    overlay.classList.remove("overlay--expanded");
    overlay.classList.add("overlay--shrunk");
  };

  const startIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      userActive = false;
      hideHeader();
    }, 2000); // hide after 3s idle
  };

  const handleMouseMove = (e) => {
    const dx = Math.abs(e.clientX - lastMouseX);
    const dy = Math.abs(e.clientY - lastMouseY);
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only show header if user moves significantly
    if (distance > 10) {
      userActive = true;
      showHeader();
      startIdleTimer();
    }

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  };

  const handleScroll = () => {
    const scrollDistance = Math.abs(window.scrollY - lastScrollY);
    if (scrollDistance > 100) {
      userActive = true;
      showHeader();
      startIdleTimer();
    }
    lastScrollY = window.scrollY;
  };

  const handleKeyOrTouch = () => {
    userActive = true;
    showHeader();
    startIdleTimer();
  };
   // --- Hover behavior ---
  header.addEventListener("mouseenter", () => {
    isHovering = true;
    clearTimeout(idleTimer); // pause hiding
  });

  header.addEventListener("mouseleave", () => {
    isHovering = false;
    startIdleTimer(); // resume hiding after 3s
  });
  // --- NEW: detect scroll-up gesture at top (for expanding header) ---
  window.addEventListener("wheel", (e) => {
    if (window.scrollY === 0 && e.deltaY < -20) {
      if (!isHeaderExpanded) {
        showHeader();
        isHeaderExpanded = true;
      }
    }

    // collapse header if user scrolls down again
    if (isHeaderExpanded && e.deltaY > 20) {
      hideHeader();
      isHeaderExpanded = false;
    }
  });
  // Attach listeners
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeyOrTouch);
  window.addEventListener("touchstart", handleKeyOrTouch);

  // Keep hidden if idle at start
  if (!userActive) hideHeader();

  console.log("Header idle logic active (threshold-based)");
}
