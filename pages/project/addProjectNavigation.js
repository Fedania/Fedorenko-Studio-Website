import { createIcon } from "/utilities/createIcon.js";
export function addProjectNavigation(projects) {

  // Safety guard
  if (!Array.isArray(projects) || projects.length === 0) {
    console.error("addProjectNavigation: invalid projects array", projects);
    return;
  }

  const projectId = window.location.hash.substring(1);
  if (!projectId) return;

  // Find current project index in the master list
  const currentIndex = projects.findIndex(p => p.id === projectId);

  if (currentIndex === -1) {
    console.error("Project not found in list:", projectId);
    return;
  }

  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  // Create navigation container
  const navContainer = document.createElement("div");
  navContainer.classList.add("project-navigation");

  // Previous button
  const prevButton = document.createElement("a");
  prevButton.classList.add("nav-button", "prev");
  prevButton.setAttribute("aria-label", "Previous Project");
  prevButton.appendChild(createIcon("arrow-left"));

  if (prevProject) {
    prevButton.href = `/pages/project-page.html#${prevProject.id}`;
  } else {
    prevButton.href = "#";
    prevButton.classList.add("disabled");
  }

  navContainer.appendChild(prevButton);

  // Next button
  const nextButton = document.createElement("a");
  nextButton.classList.add("nav-button", "next");
  nextButton.setAttribute("aria-label", "Next Project");
  nextButton.appendChild(createIcon("arrow-right"));

  if (nextProject) {
    nextButton.href = `/pages/project-page.html#${nextProject.id}`;
  } else {
    nextButton.href = "#";
    nextButton.classList.add("disabled");
  }

  navContainer.appendChild(nextButton);

  // Insert into DOM
  const navButtonsSection = document.getElementById("nav-buttons");

  if (navButtonsSection) {
    navButtonsSection.innerHTML = ""; // prevent duplicates
    navButtonsSection.appendChild(navContainer);
  } else {
    console.error("Nav buttons section not found!");
  }
}