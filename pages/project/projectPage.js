// projectPage.js
console.log("projectPage.js loaded");
import { loadProjectImages } from './loadProjectImages.js';
import { addProjectNavigation } from './addProjectNavigation.js';

export async function initProjectPage() {
    
        const projectId = window.location.hash.substring(1);

        if (!projectId) {
            console.error("No project ID found in URL!");
            window.location.href = "/all-projects.html";
            return;
        }

        const response = await fetch("../data/projects.json");
        const data = await response.json();
        const project = data.project.find(p => p.id === projectId);

        if (!project) {
            console.error("Project not found!");
            document.getElementById("project-title").textContent = "Project not found";
            return;
        }

        // Set project title
        document.getElementById("project-title").textContent = project.title;

        // Load project images
        await loadProjectImages(projectId, project);

        // Add Next/Previous Navigation
        addProjectNavigation(data.project);

        // Attach click listener for navigation buttons
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("nav-button")) {
                event.preventDefault();
                window.location.href = event.target.href;
                window.location.reload();
            }
        });
    };

    

