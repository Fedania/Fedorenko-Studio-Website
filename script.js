import { loadComponent } from "./components/loadComponent.js";
import { initScrollTop } from "./components/scrollTop.js";
import { initCategories } from "./pages/categories/categories.js"; 
import { initProjectPage } from './pages/project/projectPage.js';
import { initHeader } from "./components/header.js";
import { initServices } from "./pages/services/sectionServices.js";
import { initPageGallery } from "./pages/gallery/initPageGallery.js";
import { initLandingVideo } from "./pages/services/landingVideo.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initial scrollY:", window.scrollY); 

  initHeader();


  loadComponent("footer-container", "./components/footer.html", () => {
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





  //  Conditional page logic
  const path = window.location.pathname;
  if (path.includes("all-projects.html")) {
    console.log("Initializing categories page");
    initCategories();
  } else if (path.includes("project-page.html")) {
    console.log("Initializing project page");
    initProjectPage();
  }
   else if (path.includes("landing.html")) {
    console.log("Initializing landing page");
    initPageGallery("#gallery");
    initLandingVideo('#hero', {src: './assets/landing_02.mp4',
      playbackRate: 0.5
      
   })
    initServices("#services", 'landing');
   
  }
  if (path.includes("think-big.html")) {
    initServices("#services", 'think-big');
  } else if (path.includes("start-small.html")) {
    initServices("#services", 'start-small');
  } else if (path.includes("services.html")) {
    initServices("#services", 'all-services');
  }
    

});
