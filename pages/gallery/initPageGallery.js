// components/initPageGallery.js
import { renderProjectThumbnail } from "../services/projectThumbnail.js";
export async function initPageGallery() {
  const section = document.getElementById("gallery");
  if (!section) return console.warn("No #gallery section found.");

  // 1. Identify the current page
  let pageId = document.body.id;
  if (!pageId) {
    const path = window.location.pathname;
    pageId = path.substring(path.lastIndexOf("/") + 1).replace(".html", "");
  }
  if (!pageId) {
    console.error("No page ID found on body or path.");
    return;
  }

  try {
    // 2. Fetch data from JSON files
    const [pageProjectsRes, allProjectsRes] = await Promise.all([
      fetch("./data/pageProjects.json"),
      fetch("./data/projects.json"),
    ]);

    const pageProjectsData = await pageProjectsRes.json();
    const allProjectsData = await allProjectsRes.json();


    const allProjects = Array.isArray(allProjectsData)
      ? allProjectsData
      : allProjectsData.project;

    // 3. Get project IDs for this page
    const pageData = pageProjectsData.find(p => p.pageId === pageId);
    if (!pageData) {
      console.error(`No project list found for pageId "${pageId}"`);
      return;
    }

    const projectList = pageData.projects;
    const selectedProjects = allProjects.filter(p => projectList.includes(p.id));

    // 4. Render
  section.innerHTML = `
    <div class="section__content">
      <div class="gallery__container-grid">
        ${selectedProjects.map(renderProjectThumbnail).join("")}
      </div>
    </div>
  `;

  } catch (error) {
    console.error("Error loading project gallery:", error);
  }
}
