import { initLandingPage } from "../../pages/landing/landingPage.js";
import { initServices } from "../../pages/services/sectionServices.js";
import { initCategories } from "../../pages/categories/categories.js"; 
import { loadProject } from "../../pages/project/projectPage.js";

export async function handleRoute() {
   clearMain();
  const path = window.location.pathname;
  

  if (path.includes("all-projects.html")) {
    await initCategories();
  }

  if (path.includes("project-page.html")) {
    const id = window.location.hash.replace("#", "").trim();
    loadProject(id);
  }

  if (path.includes("landing.html") || path === "/") {
    await initLandingPage();
    await initServices();
  }

  if (path.includes("services.html")) {
    await initServices();
  }
}

function clearMain() {
  const main = document.querySelector("#main");
  if (main) main.innerHTML = "";
}