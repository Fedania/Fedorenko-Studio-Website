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


document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initial scrollY:", window.scrollY);

  let pageReadyCallbacks = [];
  let pageIsReady = false;

  function afterPageReady(fn) {
    if (pageIsReady) {
      fn();
    } else {
      pageReadyCallbacks.push(fn);
    }
  }

  // =========================
  // LOAD SHARED LAYOUT
  // =========================

  const headerContext = await initHeaderBase();
console.log("Header context:", headerContext);
  if (headerContext) {
    initLayoutController(headerContext);
    console.log("Header loaded");
  }

  await loadComponent("#footer", "/components/footer.html");
  
  initScrollTop();

  // Page is now fully assembled
  pageIsReady = true;
  pageReadyCallbacks.forEach(fn => fn());
  pageReadyCallbacks = [];

  // =========================
  // PAGE-SPECIFIC LOGIC
  // =========================

  const path = window.location.pathname;

  afterPageReady(() => {
    if (path.includes("all-projects.html")) {
      console.log("Initializing categories page");
      initCategories();
    }

    if (path.includes("project-page.html")) {
      console.log("Initializing project page");

      const id = window.location.hash.replace("#", "").trim();
      loadProject(id);
    }
  });

  afterPageReady(async () => {
    if (path.includes("landing.html")) {
      console.log("Initializing landing page");

      await initLandingPage();
      await initServices();

      initLandingVideo("#hero", {
        src: "/assets/landing_02.mp4",
        playbackRate: 0.5
      });
    }

    if (path.includes("services.html")) {
      await initServices();
    }
  });
  

  // =========================
  // HASH NAVIGATION
  // =========================

  window.addEventListener("hashchange", () => {
    const projectId = window.location.hash.substring(1);
    loadProject(projectId);
  });
});

