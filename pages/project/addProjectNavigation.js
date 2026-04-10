import { createRiveElement } from "/utilities/createRiveElement.js";

export function addProjectNavigation(projects) {
  if (!Array.isArray(projects) || projects.length === 0) {
    console.error("addProjectNavigation: invalid projects array", projects);
    return;
  }

  const projectId = window.location.hash.substring(1);
  if (!projectId) return;

  const currentIndex = projects.findIndex(p => p.id === projectId);

  if (currentIndex === -1) {
    console.error("Project not found in list:", projectId);
    return;
  }

  const prevProject = projects[currentIndex - 1] || null;
  const nextProject = projects[currentIndex + 1] || null;

  // 🔥 Get container
  const navButtonsSection = document.getElementById("nav-buttons");

  if (!navButtonsSection) {
    console.error("Nav buttons section not found!");
    return;
  }

  navButtonsSection.innerHTML = "";

  // 🔥 Create Rive container
  const riveContainer = document.createElement("div");
  riveContainer.classList.add("project-navigation");

  navButtonsSection.appendChild(riveContainer);

  // 🔥 Init Rive
  const rive = createRiveElement({
    container: riveContainer,
    src: "../assets/navButtons.riv",
    stateMachine: "State Machine 1",
    fit: "contain",
    onEvent: (event) => handleNavEvent(event, prevProject, nextProject)
  });

  // 🔥 Sync disabled state to Rive
  updateRiveNavState(rive, prevProject, nextProject);
}
function handleNavEvent(event, prevProject, nextProject) {
  const name = event.data?.name;

  if (name === "prevProject") {
    if (!prevProject) return; // safety guard
    window.location.href = `/pages/project-page.html#${prevProject.id}`;
  }

  if (name === "nextProject") {
    if (!nextProject) return;
    window.location.href = `/pages/project-page.html#${nextProject.id}`;
  }
}
function updateRiveNavState(rive, prevProject, nextProject) {
  rive.setNumberInput("isPrevDisabled", prevProject ? 0 : 1);
  rive.setNumberInput("isNextDisabled", nextProject ? 0 : 1);
}