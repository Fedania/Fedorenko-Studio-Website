
document.addEventListener("DOMContentLoaded", () => {
    // Fetch projects JSON
    fetch("../data/projects.json")
        .then(response => response.json())
        .then(jsonData => {
            // Mapping category containers to their corresponding category names
            const categoryMap = {
                "branding-container": "Branding",
                "posters-container": "Posters",
                "print-container": "Print",
                "illutration-container": "Illustration"
            };

            Object.keys(categoryMap).forEach(containerId => {
                const categoryName = categoryMap[containerId];
                const categoryContainer = document.getElementById(containerId);
                const container = categoryContainer.querySelector(".projects-list");
                
                // Filter projects belonging to this category
                const filteredProjects = jsonData.project.filter(proj => proj.categories.includes(categoryName));

                // Create and append image elements
                filteredProjects.forEach(project => {
                    // Create container for thumbnail and overlay
                    const thumbnailContainer = document.createElement("a");
                    thumbnailContainer.href = `${project.id}.html`; // Link to project page
                    thumbnailContainer.classList.add("thumbnail-container");

                    const img = document.createElement("img");
                    img.src = project.thumbnail;
                    img.alt = project.title;
                    img.classList.add("thumbnail");

                    // Create overlay with project title
                    const overlay = document.createElement("div");
                    overlay.classList.add("thumbnail-overlay");
                    overlay.textContent = project.title;

                    // Append elements
                    thumbnailContainer.appendChild(img);
                    thumbnailContainer.appendChild(overlay);
                    container.appendChild(thumbnailContainer);
                });

                

                
            });
        })
        .catch(error => console.error("Error fetching projects.json:", error));
});
