import { loadComponent } from "./utilities/loadComponent.js";
import { initScrollTop } from "./components/scrollTop.js";
import { initCategories } from "./pages/categories/categories.js"; 
import { loadProject } from "./pages/project/projectPage.js";
import { initServices } from "./pages/services/sectionServices.js";
import { initLandingPage } from "./pages/landing/landingPage.js";
import { initHeaderBase } from "./components/headerBase.js";
import { initLayoutController } from "./utilities/layoutController.js";
import { createVideo } from "./utilities/createVideo.js";
import { initContactModal } from "./utilities/contactModal.js";


document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initial scrollY:", window.scrollY);

  // 1️⃣ Detect page FIRST
  const path = window.location.pathname;

  const isLandingPage =
    path.endsWith("/landing") ||
    path.endsWith("/landing.html") ||
    path === "/";

  // 2️⃣ Load shared layout
  const headerContext = await initHeaderBase();

  if (headerContext) {
    initLayoutController({
      ...headerContext,
      isLandingPage
    });
  }

  await loadComponent("#footer", "/components/footer.html");
  initScrollTop();
  initContactModal();

  // 3️⃣ Page-specific init (unchanged)
  if (isLandingPage) {
    console.log("Initializing landing page");
    await initLandingPage();
    await initServices();
    createVideo({
      container: "#hero",
      id: "hero__bg-video",
      className: "bg-video",
      src: "/assets/landing_02.mp4",
      playbackRate: 0.5,
      autoplay: true,
      loop: true,
      muted: true
    });
  }

  if (path.endsWith("/services") || path.endsWith("/services.html") || path === "/") {
    await initServices();
  }

  if (path.endsWith("/all-projects") || path.endsWith("/all-projects.html") || path === "/") {
    console.log("Initializing categories page");
    await initCategories();
  }

  if (path.endsWith("/project-page") || path.endsWith("/project-page.html") || path === "/") {
    console.log("Initializing project page");

    const id = window.location.hash.replace("#", "").trim();
    loadProject(id);
  }

  window.addEventListener("hashchange", () => {
    const projectId = window.location.hash.substring(1);
    loadProject(projectId);
  });
});

