// pages/categories/renderProjects.js
import { renderProjectThumbnail } from "../../utilities/projectThumbnail.js";
import { createIcon } from "/utilities/createIcon.js";

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

  // 🔥 update page title
  updatePageTitle(selectedCategory);

  renderBackButton(selectedCategory);
  // Toggle view states on body
  document.body.classList.toggle("category-view", !!selectedCategory);
  document.body.classList.toggle("main-view", !selectedCategory);

  // Single category view → show all projects
  if (selectedCategory && categories[selectedCategory]) {
    renderCategory(
      selectedCategory,
      categories[selectedCategory],
      container,
      false
    );
    return;
  }

  // Main view → show only first 4 per category
  Object.entries(categories).forEach(([category, projects]) => {
    renderCategory(category, projects, container, true);
  });
}
function updatePageTitle(selectedCategory) {
  const titleEl = document.getElementById("page-title");
  if (!titleEl) return;

  titleEl.textContent = selectedCategory || "All Projects";
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

  const projectsToRender = showMore ? projects.slice(0, 4) : projects;

  const thumbnailsHTML = projectsToRender
    .map(renderProjectThumbnail)
    .join("");

  section.innerHTML = `
    ${
      showMore
        ? `<h4 class="category__title">${category}</h4>`
        : ""
    }
    <div class="gallery__container-grid">
      ${thumbnailsHTML}
    </div>
    ${
      showMore && projects.length > 4
        ? `<button class="see-more"><a href="?category=${encodeURIComponent(category)}">
             See more ${category} projects
           </a></button>`
        : ""
    }
  `;

  container.appendChild(section);
}

function renderBackButton(selectedCategory) {
  // Remove existing button (avoid duplicates on re-render)
  const existing = document.querySelector(".back-to-all");
  if (existing) existing.remove();

  // Only show in category view
  if (!selectedCategory) return;

  const titleEl = document.getElementById("page-title");
  if (!titleEl) return;

  const wrapper = document.createElement("div");
  wrapper.classList.add("page-title-wrapper");

  // 🔙 Back button
  const backButton = document.createElement("a");
  backButton.classList.add("nav-button", "prev", "back-to-all");
  backButton.setAttribute("aria-label", "Back to All Projects");
  backButton.href = "?"; // removes category param

  backButton.appendChild(createIcon("arrow-left"));

  // Wrap button + title together
  titleEl.parentNode.insertBefore(wrapper, titleEl);
  wrapper.appendChild(backButton);
  wrapper.appendChild(titleEl);
}