import { loadComponent } from "./utilities/loadComponent.js";

import { initScrollTop } from "./components/scrollTop.js";
import { initCategories } from "./pages/categories/categories.js"; 
// import { initProjectPage } from './pages/project/projectPage.js';
import { loadProject } from "./pages/project/projectPage.js";
import { initHeader } from "./components/header.js";
import {initSidebar} from "./components/sidebar.js";  
import { initServices } from "./pages/services/sectionServices.js";
import { initPageGallery } from "./pages/gallery/initPageGallery.js";
import { initLandingPage } from "./pages/landing/landingPage.js";
import { initLandingVideo } from "./pages/landing/landingVideo.js";


document.addEventListener("DOMContentLoaded", () => {
  console.log("Initial scrollY:", window.scrollY); 

const mobileMQ = window.matchMedia("(max-width: 768px)");
  function renderNav() {
    if (mobileMQ.matches) {
      initSidebar();
      
    } else {
      initHeader();
    }
  
  }
  renderNav(); // initial render
  mobileMQ.addEventListener("change", renderNav); // re-render on resize

  loadComponent("#footer", "/components/footer.html", () => {
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
    
      function getProjectID() {
        return window.location.hash.replace("#", "").trim();
      }

      const id = getProjectID();
      console.log("Project ID:", id);
      loadProject(id);
  }
   else if (path.includes("landing.html")) {
    console.log("Initializing landing page");
    initLandingPage();
    initServices();

    initLandingVideo('#hero', {src: './assets/landing_02.mp4',
      playbackRate: 0.5
      
   })

   
  }
  if (path.includes("services.html")) {
    initServices();
  }
  

});
