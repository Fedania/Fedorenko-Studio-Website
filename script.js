document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const hamburger = document.getElementById("hamburger");
    const closeBtn = document.getElementById("close-btn");
    const projectsBtn = document.getElementById("sidebar-projects-btn");
    const dropdownMenu = document.getElementById("sidebar-dropdown-menu");
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
        const projects = await response.json();
        const project = projects.find(p => p.id === projectId);
    
        if (!project) {
            console.error("Project not found!");
            return;
        }
    
        let imgIndex = 1;
        let imageFolder = `../images/${projectId}/`; // Project-specific image folder
        const captions = project.captions; // Captions for the specific project
    
        project.layout.forEach(rowCount => {
            let row = document.createElement("div");
            row.classList.add("image-row");
    
            for (let i = 0; i < rowCount; i++) {
                let imgContainer = document.createElement("div");
                imgContainer.classList.add("image-container");
    
                let img = document.createElement("img");
                img.src = `${imageFolder}${projectId}-${String(imgIndex).padStart(2, '0')}.jpg`;
                img.alt = `Image ${imgIndex}`;
                imgContainer.appendChild(img);
    
                // Add caption if available
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
        });
    }
    
    
    
    


