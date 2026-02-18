// pages/categories/renderProjects.js
import { renderProjectThumbnail } from "/utilities/projectThumbnail.js";

/**
 * Renders all project categories or a single category view.
 * @param {Object} categories - Object with category names as keys and project arrays as values.
 * @param {string|null} selectedCategory - Category name if user is viewing one, or null to show all.
 */
export function renderProjects(categories, selectedCategory = null) {
  const container = document.getElementById("projects-container");
  if (!container) {
    console.error("Container #projects-container not found");
    return;
  }

  container.innerHTML = "";

  // Toggle view states on body
  document.body.classList.toggle("category-view", !!selectedCategory);
  document.body.classList.toggle("main-view", !selectedCategory);

  // Single category view → show all projects
  if (selectedCategory && categories[selectedCategory]) {
    renderCategory(
      selectedCategory,
      categories[selectedCategory],
      container,
      false // showMore = false → render all
    );
    return;
  }

  // Main view → show only first 4 per category
  Object.entries(categories).forEach(([category, projects]) => {
    renderCategory(
      category,
      projects,
      container,
      true // showMore = true → limit to 4
    );
  });
}

/**
 * Renders a single category section with its projects.
 * @param {string} category - Category name.
 * @param {Array} projects - Array of project objects.
 * @param {HTMLElement} container - Parent container to append to.
 * @param {boolean} showMore - Whether this is preview mode (limit to 4 + show button).
 */
function renderCategory(category, projects, container, showMore = false) {
  const section = document.createElement("div");
  section.classList.add("category__container");

  // Limit projects only if showMore is true
  const projectsToRender = showMore ? projects.slice(0, 4) : projects;

  const thumbnailsHTML = projectsToRender
    .map(renderProjectThumbnail)
    .join("");

  section.innerHTML = `
    <h4 class="category__title">${category}</h4>
    <div class="gallery__container-grid">
      ${thumbnailsHTML}
    </div>
    ${
      showMore && projects.length > 4
        ? `<a class="see-more" href="?category=${encodeURIComponent(category)}">
             See more ${category} projects
           </a>`
        : ""
    }
  `;

  container.appendChild(section);
}
