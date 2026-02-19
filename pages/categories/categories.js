// pages/categories/categories.js
import { fetchProjects } from "../services/fetchProjects.js";
import { filterCategory } from "./filterCategory.js";
import { renderProjects } from "./renderProjects.js";

export async function initCategories() {
  const projects = await fetchProjects();
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");

  const categories = filterCategory(projects, selectedCategory);
  renderProjects(categories, selectedCategory);
}
