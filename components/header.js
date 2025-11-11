// header.js
import { loadComponent } from "../components/loadComponent.js";
import { activateSidebar } from "../components/sidebar.js";

export function initHeader() {
  const headerContainer = document.getElementById("header-container");
  const overlay = document.getElementById("page-overlay");
 

  if (!headerContainer || !overlay ) {
    console.error("Header, overlay, or top trigger not found");
    return;
  }

  // Load header component dynamically
  loadComponent("header-container", "../components/header.html", () => {
    console.log("Header loaded");

    const header = headerContainer.querySelector("header");
    const headerNav = header?.querySelector(".header__nav");
    if (!header) {
      console.error("Header element not found after loading!");
      return;
    }
    // Create the trigger dynamically
    const trigger = document.createElement("div");
    trigger.id = "header__trigger";
    trigger.classList.add("header__trigger");

    // Insert it at the top of the nav
    headerNav.insertBefore(trigger, headerNav.firstChild);
    activateSidebar();

    // === SCROLL BEHAVIOR ===
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      

      // Collapse header on scroll down
    if (currentScrollY > lastScrollY || currentScrollY < 10) {
        header.classList.add("hidden");
        header.classList.remove("visible");
        overlay.classList.add("overlay--expanded");
        overlay.classList.remove("overlay--shrunk");
      } 
      // Expand header on scroll up
      else if (currentScrollY < lastScrollY) {
        header.classList.remove("hidden");
        header.classList.add("visible");
        overlay.classList.remove("overlay--expanded");
        overlay.classList.add("overlay--shrunk");
      }
        lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll);

    // === TOP TRIGGER BEHAVIOR ===
    header.addEventListener("mouseenter", () => {
      header.classList.remove("hidden");
        header.classList.add("visible");
        overlay.classList.remove("overlay--expanded");
        overlay.classList.add("overlay--shrunk");
          });

    header.addEventListener("mouseleave", () => {
      header.classList.add("hidden");
        header.classList.remove("visible");
        overlay.classList.add("overlay--expanded");
        overlay.classList.remove("overlay--shrunk");
    });
    header.classList.add("hidden");
    overlay.classList.add("overlay--expanded");
    console.log("Header initialized with scroll and hover logic");
  });
}
