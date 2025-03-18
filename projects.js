document.addEventListener("DOMContentLoaded", () => {
    // Fetch projects JSON
    fetch("data/projects.json")
        .then(response => response.json())
        .then(data => {
            // Loop through the projects array
            data.project.forEach(project => {
                // Loop through all categories defined in the project
                project.categories.forEach(category => {
                    // Target the corresponding category container by id
                    const categoryContainer = document.getElementById(`${category.toLowerCase()}-container`);

                    // If the category container exists, add the project
                    if (categoryContainer) {
                        // If it's the first time seeing the category, create a heading for the category
                        if (!categoryContainer.querySelector(`h2`)) {
                            const categoryTitle = document.createElement("h2");
                            categoryTitle.textContent = category;
                            categoryContainer.appendChild(categoryTitle);
                        }

                        // Create a container for the project thumbnails (3 per row)
                        const rowContainer = document.createElement("div");
                        rowContainer.classList.add("row-container");

                        const projectRow = document.createElement("div");
                        projectRow.classList.add("project-row");

                        // Create a block for the individual project (image and caption)
                        const projectBlock = document.createElement("div");
                        projectBlock.classList.add("project-block");

                        // Create a link to the project page
                        const projectLink = document.createElement("a");
                        projectLink.href = `project.html?id=${project.id}`;
                        projectLink.classList.add("project-link");

                        // Check if the thumbnail exists or is empty
                        const imgSrc = project.thumbnail || ""; // If no thumbnail, it will be empty
                        const img = document.createElement("img");

                        // Only fetch the image if a valid src exists, otherwise create placeholder
                        if (imgSrc) {
                            img.src = imgSrc;
                            img.alt = project.title;
                            img.classList.add("thumbnail");
                        } else {
                            // If the image is missing, display a placeholder rectangle
                            const placeholder = document.createElement("div");
                            placeholder.classList.add("thumbnail-placeholder");
                            projectLink.appendChild(placeholder);
                        }

                        // Add caption for the image (h2 style)
                        const caption = document.createElement("h2");
                        caption.textContent = project.title;
                        caption.classList.add("caption");

                        // Append the image (or placeholder) and caption to the project block
                        if (imgSrc) {
                            projectLink.appendChild(img);
                        }
                        projectBlock.appendChild(projectLink);
                        projectBlock.appendChild(caption); // Append caption below the image

                        // Append project block to the row
                        projectRow.appendChild(projectBlock);

                        // Append the row to the row container
                        rowContainer.appendChild(projectRow);

                        // Append the row container to the category container
                        categoryContainer.appendChild(rowContainer);

                        // Create and add the "See More" button for the category (only if not already added)
                        if (!categoryContainer.querySelector(".see-more-button")) {
                            const seeMoreButton = document.createElement("a");
                            seeMoreButton.href = `${category.toLowerCase()}.html`; // Link to the category page
                            seeMoreButton.classList.add("see-more-button");
                            seeMoreButton.textContent = `See more ${category} projects`;

                            // Append the button to the category container
                            categoryContainer.appendChild(seeMoreButton);
                        }
                    }
                });
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});
