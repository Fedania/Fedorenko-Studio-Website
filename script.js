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


// Which page are we on? Returns one name.
function getPage(path) {
  if (path === "/" || path.endsWith("/landing") || path.endsWith("/landing.html")) return "landing";
  if (path.endsWith("/services") || path.endsWith("/services.html")) return "services";
  if (path.endsWith("/all-projects") || path.endsWith("/all-projects.html")) return "categories";
  if (path.endsWith("/project-page") || path.endsWith("/project-page.html")) return "project";
  return "landing"; // fallback
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Initial scrollY:", window.scrollY);

  // 1️⃣ Detect page FIRST
  const path = window.location.pathname;
  const page = getPage(path);
  const isLandingPage = page === "landing";

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

  if (page === "services") {
    await initServices();
  }

  if (page === "categories") {
    console.log("Initializing categories page");
    await initCategories();
  }

  if (page === "project") {
    console.log("Initializing project page");

    const id = window.location.hash.replace("#", "").trim();
    loadProject(id);
  }

  window.addEventListener("hashchange", () => {
    const projectId = window.location.hash.substring(1);
    loadProject(projectId);
  });
});

