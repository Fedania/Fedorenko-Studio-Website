// header.js
import { loadComponent } from "../components/loadComponent.js";
import { activateSidebar } from "../components/sidebar.js";
import { setupHeaderIdleLogic } from "../components/headerIdle.js";

export function initHeader() {
  const headerContainer = document.getElementById("header-container");
  const overlay = document.getElementById("page-overlay");
  if (!headerContainer || !overlay) {
    console.error("Header or overlay not found");
    return;
  }

  loadComponent("header-container", "../components/header.html", () => {
    console.log("Header loaded");

    const header = headerContainer.querySelector("header");
    if (!header) {
      console.error("Header element not found after loading!");
      return;
    }

    activateSidebar();

    // Hide header initially
    header.classList.add("hidden");
    overlay.classList.add("overlay-expanded");

    // Start idle logic after 4 seconds
    setTimeout(() => {
      setupHeaderIdleLogic(header, overlay);
    }, 4000);

    console.log("Header initialized");
  });
}
