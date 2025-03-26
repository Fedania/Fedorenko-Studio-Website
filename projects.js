document.addEventListener("DOMContentLoaded", async function () {
    const projectId = window.location.hash.substring(1); // Get project ID from URL (#01-br-downtown → "01-br-downtown")

    if (!projectId) {
        console.error("No project ID found in URL!");
        window.location.href = "/all-projects.html"; // Redirect to main page if no ID
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

    // Load project images and insertions dynamically
    await loadProjectImages(projectId, project);

    // 🔹 NEW: Add Next/Previous Navigation
    addProjectNavigation(data.project);
});

// 🔹 NEW: Load images and handle insertions
async function loadProjectImages(projectId, project) {
    const projectGallery = document.querySelector(".project-gallery");
    // 🔹 Apply project-wide class if specified
    if (project.class) {
        projectGallery.classList.add(project.class);
    }

    let imgIndex = 1;
    let imageFolder = `../images/${projectId}/`;
    const captions = project.captions || [];
    const insertions = project.insertions || [];

    // Map captions for quick lookup
    const captionMap = new Map();
    captions.forEach((caption, index) => captionMap.set(index + 1, caption)); // Map caption by index

    // Track inserted indexes to avoid duplication
    const insertedIndexes = new Set();

    // Insert any initial items before the rows start (if there are insertions at the start)
    if (insertions.length > 0) {
        insertions.filter(ins => ins.index === 0).forEach(insertion => {
            if (!insertedIndexes.has(insertion.index)) {
                insertInsertion(projectGallery, insertion); // Insert initial items
                insertedIndexes.add(insertion.index); // Mark as inserted
            }
        });
    }

    // Add images and insertions between them
    project.layout.forEach(rowCount => {
        let row = document.createElement("div");
        row.classList.add("image-row");

        for (let i = 0; i < rowCount; i++) {
            let imgContainer = document.createElement("div");

            // Check for insertion before the current image
            let insertedItem = insertions.find(ins => ins.index === imgIndex);

            if (insertedItem && !insertedIndexes.has(imgIndex)) {
                imgContainer.classList.add("inserted", insertedItem.type); // Assign type as class

                // Add the insertion
                insertInsertion(imgContainer, insertedItem);

                // Mark as inserted
                insertedIndexes.add(imgIndex);
            } else {
                imgContainer.classList.add("image");
                let imgSrc = `${imageFolder}${projectId}-${String(imgIndex).padStart(2, '0')}.jpg`;
                createImageElement(imgContainer, imgSrc);
            }

            // Add caption if available
            if (captionMap.has(imgIndex)) {
                let caption = document.createElement("p");
                caption.classList.add("caption");
                caption.textContent = captionMap.get(imgIndex);
                imgContainer.appendChild(caption);
            }

            row.appendChild(imgContainer);
            projectGallery.appendChild(row);

            imgIndex++;
        }

        // After each row, check for any insertions
        insertions.filter(ins => ins.index === imgIndex).forEach(insertion => {
            if (!insertedIndexes.has(insertion.index)) {
                insertInsertion(projectGallery, insertion); // Insert items after the row
                insertedIndexes.add(insertion.index); // Mark as inserted
            }
        });
    });
    
}

// 🔹 Helper function to create an image element
function createImageElement(container, src) {
    let img = document.createElement("img");
    img.src = src;
    img.alt = "Project Image";
    container.appendChild(img);
}

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
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("nav-button")) {
        event.preventDefault(); // Prevent default navigation
        window.location.href = event.target.href; // Change URL
        window.location.reload(); // Force reload
    }
});
