// header.js
import { loadComponent } from "/utilities/loadComponent.js";


export function initHeader() {
  const headerContainer = document.getElementById("header");
  const overlay = document.getElementById("page__overlay");

  if (!headerContainer || !overlay) {
    console.error("Header container or overlay not found");
    return;
  }

  return loadComponent("#header", "/components/header.html", () => {
    console.log("Header loaded");

    // The header IS the container
    const headerNav = headerContainer.querySelector(".nav__container");

    if (!headerNav) {
      console.error("Header nav not found after loading!");
      return;
    }

    // Avoid duplicate trigger if init runs twice
    if (!headerNav.querySelector(".header__trigger")) {
      const trigger = document.createElement("div");
      trigger.id = "header__trigger";
      trigger.className = "header__trigger";

      headerNav.insertBefore(trigger, headerNav.firstChild);
    }
    
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
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
    }
  });
}
