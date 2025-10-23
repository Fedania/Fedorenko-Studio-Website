document.addEventListener("DOMContentLoaded", function () {
    fetch("data/projects.json")
        .then(response => response.json())
        .then(data => {
            const projects = data.project;
            const urlParams = new URLSearchParams(window.location.search);
            const selectedCategory = urlParams.get("category");
            renderProjects(projects, selectedCategory);
        })
        .catch(error => console.error("Error loading projects.json:", error));

    function renderProjects(projects, categoryFilter) {
        const container = document.getElementById("projects-container");
        container.innerHTML = "";
        const categories = {};

        // Group projects by category
        projects.forEach(project => {
            project.categories.forEach(category => {
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push(project);
            });
        });

        // Toggle between main view and category view
        document.body.classList.toggle("category-view", !!categoryFilter);
        document.body.classList.toggle("main-view", !categoryFilter);

        if (categoryFilter) {
            // Show only selected category
            if (categories[categoryFilter]) {
                renderCategory(categoryFilter, categories[categoryFilter], container, false);
            } else {
                container.innerHTML = "<p>No projects found for this category.</p>";
            }
        } else {
            // Show all categories with max 4 projects per row
            Object.entries(categories).forEach(([category, projects]) => {
                renderCategory(category, projects.slice(0, 4), container, true);
            });
        }
    }

    function renderCategory(category, projects, container, showMore) {
        const section = document.createElement("div");
        section.classList.add("category__container");
        
        section.innerHTML = `
            <h2 class="category__title">${category}</h2>
            <div class="category__thumbnails-grid">
                ${projects.map(p => {
                    const href = p.customUrl ? p.customUrl : `/project-page.html#${p.id}`;
                    return `
                        <a href="${href}" class="project-wrapper">
                            <img class="project__thumbnail" src="${p.thumbnail}" alt="${p.title}">
                            <div class="project__overlay">${p.title}</div>
                        </a>
                    `;
                }).join("")}
            </div>
            ${showMore ? `<a class="see-more" href="?category=${category}">See more ${category} projects</a>` : ""}
        `;
    
        container.appendChild(section);
    }
    
});
