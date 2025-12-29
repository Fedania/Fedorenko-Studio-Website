// // projectPage.js
// console.log("projectPage.js loaded");
// import { loadProjectImages } from './loadProjectImages.js';
// import { addProjectNavigation } from './addProjectNavigation.js';

// export async function initProjectPage() {
    
//         const projectId = window.location.hash.substring(1);

//         if (!projectId) {
//             console.error("No project ID found in URL!");
//             window.location.href = "/all-projects.html";
//             return;
//         }

//         const response = await fetch("/data/projects.json");
//         const data = await response.json();
//         const project = data.project.find(p => p.id === projectId);

//         if (!project) {
//             console.error("Project not found!");
//             document.getElementById("project-title").textContent = "Project not found";
//             return;
//         }

//         // Set project title
//         document.getElementById("project-title").textContent = project.title;

//         // Load project images
//         await loadProjectImages(projectId, project);

//         // Add Next/Previous Navigation
//         addProjectNavigation(data.project);

//         // Attach click listener for navigation buttons
//         document.addEventListener("click", function (event) {
//             if (event.target.classList.contains("nav-button")) {
//                 event.preventDefault();
//                 window.location.href = event.target.href;
//                 window.location.reload();
//             }
//         });
//     };



    // loadProject.js
import {
  renderGif,
  renderImage,
  renderVideo,
  renderSpacer,
  renderHeading,
  renderText,
  renderImageRow
} from './renderElement.js';

export async function loadProject(projectID) {
  const container = document.getElementById("project-content");
  if (!container) {
    console.error('No #project-content element found in DOM.');
    return;
  }

  if (!projectID) {
    container.innerHTML = "<p>No project selected.</p>";
    return;
  }

  // Clear previous content
  container.innerHTML = "";

  // Use an absolute path from the site root to match your folder structure
  const jsonPath = `/data/projects/${projectID}.json`;

  try {
    const response = await fetch(jsonPath, { cache: "no-cache" });

    if (!response.ok) {
      console.error("Failed to load project JSON:", response.status, response.statusText);
      container.innerHTML = "<p>Project not found.</p>";
      return;
    }

    const data = await response.json();

    // Basic validation
    if (!data || !Array.isArray(data.blocks)) {
      console.error("Invalid project JSON format (missing blocks array).", data);
      container.innerHTML = "<p>Invalid project data.</p>";
      return;
    }

    // render
    renderProject(data, projectID, container);

  } catch (err) {
    console.error("Error loading project:", err);
    container.innerHTML = "<p>Error loading project.</p>";
  }
}

/* Keep renderProject as a top-level function (cleanly separated). */
function renderProject(data, projectID, container) {
  data.blocks.forEach((block, i) => {
    if (!block || !block.type) {
      console.warn("Skipping invalid block at index", i, block);
      return;
    }

    switch (block.type) {
      case "heading":     renderHeading(block, container); break;
      case "text":        renderText(block, container); break;
      case "img":         renderImage(block, container, projectID); break;
      case "imgRow":      renderImageRow(block, container, projectID); break;
      case "gif":         renderGif(block, container, projectID); break;
      case "video":       renderVideo(block, container, projectID); break;
      case "spacer":      renderSpacer(block, container); break;
      default:
        console.warn("Unknown block type:", block.type);
    }
  });
}


    

