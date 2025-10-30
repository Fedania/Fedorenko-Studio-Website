// header.js
import { loadComponent } from "../components/loadComponent.js";
import { activateSidebar } from "../components/sidebar.js";
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
    
    header.classList.add("hidden"); // initially hidden
    overlay.classList.add("overlay-expanded");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 80) {
            header.classList.remove("hidden");
            header.classList.add("visible");
            overlay.classList.remove("overlay-expanded");
            overlay.classList.add("overlay-shrunk");
        } else {
            header.classList.add("hidden");
            header.classList.remove("visible");
            overlay.classList.add("overlay-expanded");
            overlay.classList.remove("overlay-shrunk");
        }
        lastScroll = currentScroll;
    });

    console.log("Header initialized");
      });
    
    
}
