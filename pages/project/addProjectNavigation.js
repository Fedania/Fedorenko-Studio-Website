// addProjectNavigation.js
console.log("addProjectNavigation.js loaded");
export function addProjectNavigation(projects) {
  // Function code here


// 🔹 NEW: Function to add navigation buttons
function addProjectNavigation(projects) {
    const projectId = window.location.hash.substring(1);
    const projectNumber = parseInt(projectId.split('-')[0], 10); // Extract number (e.g., "01" → 1)

    if (isNaN(projectNumber)) return; // Exit if no valid number

    // Find previous and next projects based on numbers
    const prevProject = projects.find(p => parseInt(p.id.split('-')[0], 10) === projectNumber - 1);
    const nextProject = projects.find(p => parseInt(p.id.split('-')[0], 10) === projectNumber + 1);

    // Create navigation container
    const navContainer = document.createElement("div");
    navContainer.classList.add("project-navigation");

    // Create "Previous Project" button if applicable
    const prevButton = document.createElement("a");
    prevButton.href = prevProject ? `/project-page.html#${prevProject.id}` : "#";
    prevButton.classList.add("nav-button", "prev");
    prevButton.setAttribute("aria-label", "Previous Project");
    if (!prevProject) prevButton.classList.add("disabled");
    navContainer.appendChild(prevButton);

    // Create "Next Project" button if applicable
    const nextButton = document.createElement("a");
    nextButton.href = nextProject ? `/project-page.html#${nextProject.id}` : "#";
    nextButton.classList.add("nav-button", "next");
    nextButton.setAttribute("aria-label", "Next Project");
    if (!nextProject) nextButton.classList.add("disabled");
    navContainer.appendChild(nextButton);

    // 🔹 Insert buttons into the "nav-buttons" section
    const navButtonsSection = document.getElementById("nav-buttons"); // Select the section by ID
    if (navButtonsSection) {
        navButtonsSection.appendChild(navContainer); // Append the navigation container into the section
    } else {
        console.error("Nav buttons section not found!");
    }
}
}