// pages/categories/renderProjects.js
import { renderProjectThumbnail } from "../services/projectThumbnail.js";

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

  // Toggle view states on body (used for styling/layout)
  document.body.classList.toggle("category-view", !!selectedCategory);
  document.body.classList.toggle("main-view", !selectedCategory);

  // If a single category is selected, render only that
  if (selectedCategory && categories[selectedCategory]) {
    renderCategory(selectedCategory, categories[selectedCategory], container, false);
    return;
  }

  // Otherwise, render all categories
  Object.entries(categories).forEach(([category, projects]) => {
    renderCategory(category, projects, container, true);
  });
}

/**
 * Renders a single category section with its projects.
 * @param {string} category - Category name.
 * @param {Array} projects - Array of project objects.
 * @param {HTMLElement} container - Parent container to append to.
 * @param {boolean} showMore - Whether to show the "See more" link.
 */
function renderCategory(category, projects, container, showMore = false) {
  const section = document.createElement("div");
  section.classList.add("category__container");

  // Use the thumbnail module here
  const thumbnailsHTML = projects.map(renderProjectThumbnail).join("");

  section.innerHTML = `
    <h2 class="category__title">${category}</h2>
    <div class="gallery__container-grid">
      ${thumbnailsHTML}
    </div>
    ${
      showMore
        ? `<a class="see-more" href="?category=${encodeURIComponent(category)}">
             See more ${category} projects
           </a>`
        : ""
    }
  `;

  container.appendChild(section);
}
