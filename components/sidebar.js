// sidebar.js
export function activateSidebar() {
  const headerNav = document.querySelector(".header__nav");
  
 // --- Create sidebar elements dynamically ---
  const sidebar = document.createElement("aside");
  sidebar.id = "sidebar";

   const menuToggle = document.createElement("button");
  menuToggle.className = "menu-toggle";
  menuToggle.setAttribute("aria-label", "Menu");
  menuToggle.textContent = "☰";
  document.body.appendChild(menuToggle);

  const closeBtn = document.createElement("button");
  closeBtn.id = "close-sidebar";
  closeBtn.className = "close-sidebar";
  closeBtn.setAttribute("aria-label", "Close menu");
  closeBtn.textContent = "×";

  const sidebarNav = document.createElement("nav");
  sidebarNav.className = "sidebar__nav";

  // Copy header nav contents dynamically
  sidebarNav.innerHTML = headerNav.innerHTML;

  sidebar.appendChild(closeBtn);
  sidebar.appendChild(sidebarNav);
  document.body.appendChild(sidebar);

  // --- Create overlay dynamically ---
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  // --- Toggle functions ---
  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  // --- Event listeners ---
  menuToggle.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  console.log("Sidebar initialized");
}
