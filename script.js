import { loadComponent } from "./utilities/loadComponent.js";

import { initScrollTop } from "./components/scrollTop.js";
import { initCategories } from "./pages/categories/categories.js"; 
// import { initProjectPage } from './pages/project/projectPage.js';
import { loadProject } from "./pages/project/projectPage.js";
// import { initHeader } from "./components/header.js";
// import {initSidebar} from "./components/sidebar.js";  
import { initServices } from "./pages/services/sectionServices.js";
import { initLandingPage } from "./pages/landing/landingPage.js";
import { initLandingVideo } from "./pages/landing/landingVideo.js";

import { initHeaderBase } from "./components/headerBase.js";
import { initLayoutController } from "./utilities/layoutController.js";
import { handleRoute } from "./core/router.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initial scrollY:", window.scrollY);

  

   // 1️⃣ Load shared layout
  const headerContext = await initHeaderBase();
  if (headerContext) {
    initLayoutController(headerContext);
  }

  await loadComponent("#footer", "/components/footer.html");
  initScrollTop();

  // 2️⃣ Detect current page
  const path = window.location.pathname;

  // 3️⃣ Initialize only what's needed

  if (path.includes("landing.html") || path === "/") {
    console.log("Initializing landing page");
    await initLandingPage();
    await initServices();
  }

  if (path.includes("services.html")) {
    await initServices();
  }

  if (path.includes("all-projects.html")) {
    console.log("Initializing categories page");
    await initCategories();
  }

  if (path.includes("project-page.html")) {
    console.log("Initializing project page");

    const id = window.location.hash.replace("#", "").trim();
    loadProject(id);
  }
  window.addEventListener("hashchange", () => {
    const projectId = window.location.hash.substring(1);
    loadProject(projectId);
  });
});

