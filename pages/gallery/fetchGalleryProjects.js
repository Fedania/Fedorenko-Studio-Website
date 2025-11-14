// gallery/fetchGalleryProjects.js
export async function fetchGalleryProjects() {
  try {
    const response = await fetch("../../data/pageProjects.json");
    if (!response.ok) throw new Error("Failed to fetch page projects");
    return await response.json();
  } catch (error) {
    console.error("Error fetching page projects:", error);
    return {};
  }
}
