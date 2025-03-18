// Function to load external HTML components (header & footer)
async function loadComponent(id, file, callback) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`${file} not found`);
        }
        document.getElementById(id).innerHTML = await response.text();

        if (callback) callback(); // Run extra scripts after loading
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

// Function to activate the sidebar and dropdown menu
function activateSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const hamburger = document.getElementById("hamburger");
    const closeBtn = document.getElementById("close-btn");
    const projectsBtn = document.getElementById("sidebar-projects-btn");
    const dropdownMenu = document.getElementById("sidebar-dropdown-menu");

    if (!sidebar || !overlay || !hamburger || !closeBtn || !projectsBtn || !dropdownMenu) {
        console.error("Sidebar elements missing. Make sure they exist in header.html");
        return;
    }

    // Open sidebar
    hamburger.addEventListener("click", () => {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    });

    // Close sidebar
    closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Toggle dropdown menu inside sidebar
    projectsBtn.addEventListener("click", () => {
        if (dropdownMenu.style.height === "0px" || dropdownMenu.style.height === "") {
            dropdownMenu.style.height = dropdownMenu.scrollHeight + "px";
        } else {
            dropdownMenu.style.height = "0px";
        }
        dropdownMenu.classList.toggle("active");
        projectsBtn.parentElement.classList.toggle("active");
    });
}

// Load header & footer, then activate the sidebar
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-container", "components/header.html", activateSidebar);
    loadComponent("footer-container", "components/footer.html");
});


    // Project Click Event
    document.querySelectorAll(".project").forEach(project => {
        project.addEventListener("click", function () {
            const url = this.getAttribute("data-url");
            if (url) {
                window.location.href = url;
            }
        });
    });
    document.querySelectorAll('.image-container').forEach(container => {
        const textElement = container.querySelector('.image-text');
        textElement.textContent = container.getAttribute('data-text');
    });
    document.addEventListener("DOMContentLoaded", function () {
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
    
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    });
    


    
    //   NEW
    async function loadProjectImages(projectId) {
        const projectGallery = document.querySelector(".project-gallery");
    
        const response = await fetch("../data/projects.json");
        const data = await response.json();
        const project = data.project.find(p => p.id === projectId); // Adjusted to access the 'project' key
    
        if (!project) {
            console.error("Project not found!");
            return;
        }
    
        let imgIndex = 1;
        let imageFolder = `../images/${projectId}/`;
        const captions = project.captions;
    
        let imagesArray = []; // Stores images for potential repeats
    
        project.layout.forEach(rowCount => {
            if (typeof rowCount === "string" && rowCount.startsWith("repeat-")) {
                // Extract the number from "repeat-N"
                const repeatCount = parseInt(rowCount.split("-")[1], 10);
    
                if (!isNaN(repeatCount) && imagesArray.length >= repeatCount) {
                    let repeatRow = document.createElement("div");
                    repeatRow.classList.add("image-row");
    
                    imagesArray.slice(-repeatCount).forEach(src => {
                        let imgContainer = document.createElement("div");
                        imgContainer.classList.add("image-container");
    
                        let img = document.createElement("img");
                        img.src = src;
                        img.alt = "Repeated Image";
                        imgContainer.appendChild(img);
    
                        repeatRow.appendChild(imgContainer);
                    });
    
                    projectGallery.appendChild(repeatRow);
                }
            } else {
                let row = document.createElement("div");
                row.classList.add("image-row");
    
                for (let i = 0; i < rowCount; i++) {
                    let imgContainer = document.createElement("div");
                    imgContainer.classList.add("image-container");
    
                    let img = document.createElement("img");
                    let imgSrc = `${imageFolder}${projectId}-${String(imgIndex).padStart(2, '0')}.jpg`;
                    img.src = imgSrc;
                    img.alt = `Image ${imgIndex}`;
                    imgContainer.appendChild(img);
    
                    imagesArray.push(imgSrc); // Store for potential repeat
    
                    if (captions && captions[imgIndex - 1]) {
                        let caption = document.createElement("p");
                        caption.classList.add("caption");
                        caption.textContent = captions[imgIndex - 1];
                        imgContainer.appendChild(caption);
                    }
    
                    row.appendChild(imgContainer);
                    imgIndex++;
                }
    
                projectGallery.appendChild(row);
            }
        });
    }
    
    
    
    
    
    


