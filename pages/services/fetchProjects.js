// services/fetchProjects.js
export async function fetchProjects() {
  try {
    const response = await fetch("./data/projects.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.project;
  } catch (err) {
    console.error("Error loading projects.json:", err);
    return [];
  }
}
