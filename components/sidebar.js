// sidebar.js
import { loadComponent } from "/utilities/loadComponent.js";

export function initSidebar() {
  const headerContainer = document.getElementById("header");
  const overlay = document.getElementById("page__overlay");
  overlay.classList.add("overlay--shrunk");
  if (!headerContainer) {
    console.error("initSidebar: headerContainer missing");
    return;
  }

  // Prevent duplicate sidebar
  if (headerContainer.querySelector("sidebar")) return;

  // --- Load sidebar HTML dynamically ---
  // You can create a separate sidebar.html if you want full separation
  return loadComponent("#header", "/components/header.html", () => {
      console.log("Sidebar loaded");
    // After loading HTML, create sidebar elements
    const sidebar = document.createElement("aside");
    sidebar.id = "sidebar";
    sidebar.setAttribute("aria-hidden", "true");

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-sidebar";
    closeBtn.setAttribute("aria-label", "Close menu");
    closeBtn.textContent = "×";

    const headerNav = headerContainer.querySelector(".nav__container");
  if (!headerNav) {
    console.error("initSidebar: .nav__container not found");
    return;
  }
  sidebar.appendChild(headerNav);
    // Insert the sidebar into the header container
    sidebar.append(closeBtn, headerNav);
    headerContainer.appendChild(sidebar);

    // Optional: overlay inside sidebar for clicking outside
    const overlay = document.createElement("div");
    overlay.id = "sidebar-overlay";
    sidebar.appendChild(overlay);
    

    

    // --- Menu toggle button ---
    if (!headerContainer.querySelector(".menu-toggle")) {
      const menuToggle = document.createElement("button");
      menuToggle.className = "menu-toggle";
      menuToggle.setAttribute("aria-label", "Open menu");
      menuToggle.textContent = "☰";

      headerContainer.prepend(menuToggle);

      menuToggle.addEventListener("click", openSidebar);
    }

    // Close behavior
    closeBtn.addEventListener("click", closeSidebar);
    sidebar.addEventListener("click", (e) => {
      if (e.target === sidebar) closeSidebar();
    });

    function openSidebar() {
      sidebar.classList.add("is-open");
      sidebar.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    }

    function closeSidebar() {
  // move focus first
    document.querySelector(".menu-toggle")?.focus();

    sidebar.classList.remove("is-open");
    sidebar.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
}
  });
}
