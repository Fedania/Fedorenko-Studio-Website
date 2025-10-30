import { loadComponent } from "./components/loadComponent.js";
import { initScrollTop } from "./components/scrollTop.js";
import { initCategories } from "./pages/categories/categories.js"; 
import { initProjectPage } from './pages/project/projectPage.js';
import { initHeader } from "./components/header.js";
import { qs } from "./components/domHelpers.js";
import { initPageGallery } from "./pages/pageProjects/initPageGallery.js";
import { initLandingVideo } from "./pages/services/landingVideo.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initial scrollY:", window.scrollY); 

  initHeader();
  

  loadComponent("footer-container", "../components/footer.html", () => {
    console.log("Footer loaded");
    initScrollTop();
  });

  // Project click → navigate to page
  document.body.addEventListener("click", (event) => {
    const projectImg = event.target.closest(".project");
    if (projectImg) {
      const url = projectImg.getAttribute("data-url");
      if (url) window.location.href = url;
    }
  });



  // Basic hamburger nav toggle (if exists)
  const hamburger = qs(".hamburger");
  const navLinks = qs(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
  }

  //  Conditional page logic
  const path = window.location.pathname;
  if (path.includes("all-projects.html")) {
    console.log("Initializing categories page");
    initCategories();
  } else if (path.includes("project-page.html")) {
    console.log("Initializing project page");
    initProjectPage();
  }
   else if (path.includes("index.html")) {
    console.log("Initializing landing page");
    initPageGallery("#gallery");
    initLandingVideo('#hero', {src: '../assets/landing_02.mp4',
      playbackRate: 0.5
      
   })
   
  }
});
