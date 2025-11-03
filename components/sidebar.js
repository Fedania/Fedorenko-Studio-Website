// --------------------------------------------
// Sidebar + dropdown functionality
// --------------------------------------------
export function activateSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("close-btn");


  if (!sidebar) {
    console.error("Sidebar element missing. Make sure it exists in header.html");
  }
  if (!overlay) {
    console.error("Overlay element missing. Make sure it exists in header.html");
  }
  if (!hamburger) {
    console.error("Hamburger element missing. Make sure it exists in header.html");
  }
  if (!closeBtn) {
    console.error("Close button element missing. Make sure it exists in header.html");
  }

  if ([
    sidebar,
    overlay,
    hamburger,
    closeBtn

  ].some(el => !el)) {
    return;
  }

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  hamburger.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  
}
