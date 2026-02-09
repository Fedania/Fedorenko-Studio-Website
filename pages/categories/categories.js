// pages/categories/categories.js
import { fetchProjects } from "/pages/services/fetchProjects.js";
import { filterCategory } from "/pages/categories/filterCategory.js";
import { renderProjects } from "/pages/categories/renderProjects.js";

export async function initCategories() {
  const projects = await fetchProjects();
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");

  const categories = filterCategory(projects, selectedCategory);
  renderProjects(categories, selectedCategory);
}
