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
    loadComponent("header-container", "../components/header.html", activateSidebar);
    loadComponent("footer-container", "../components/footer.html");
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
        const project = data.project.find(p => p.id === projectId);
    
        if (!project) {
            console.error("Project not found!");
            return;
        }
    
        let imgIndex = 1;
        let imageFolder = `../images/${projectId}/`;
        const captions = project.captions || [];
        const insertions = project.insertions || [];
    
        // Map captions for quick lookup
        const captionMap = new Map();
        captions.forEach(caption => captionMap.set(caption.index, caption.text));
    
        project.layout.forEach(rowCount => {
            let row = document.createElement("div");
            row.classList.add("image-row");
    
            for (let i = 0; i < rowCount; i++) {
                let imgContainer = document.createElement("div");
                let insertedItem = insertions.find(ins => ins.index === imgIndex);
    
                if (insertedItem) {
                    imgContainer.classList.add("inserted", insertedItem.type); // Assign type as class
    
                    switch (insertedItem.type) {
                        case "image":
                        case "gif":
                            createImageElement(imgContainer, insertedItem.src);
                            break;
                        case "vimeo":
                            createVimeoElement(imgContainer, insertedItem.src);
                            break;
                        case "rive":
                            createRiveElement(imgContainer, insertedItem.src);
                            break;
                        default:
                            console.warn(`Unknown insertion type: ${insertedItem.type}`);
                    }
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
        });
    }
    
    // Helper function to create an image element
    function createImageElement(container, src) {
        let img = document.createElement("img");
        img.src = src;
        img.alt = "Project Image";
        container.appendChild(img);
    }
    
    // Helper function to create a Vimeo iframe
    function createVimeoElement(container, vimeoUrl) {
        let vimeoId = vimeoUrl.split("/").pop();
        let iframe = document.createElement("iframe");
        iframe.src = `https://player.vimeo.com/video/${vimeoId}`;
        iframe.width = "640";
        iframe.height = "360";
        iframe.frameBorder = "0";
        iframe.allow = "autoplay; fullscreen; picture-in-picture";
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    }
    
    // Helper function for Rive animations (assuming you load Rive.js)
    function createRiveElement(container, riveSrc) {
        let riveCanvas = document.createElement("canvas");
        riveCanvas.classList.add("rive-animation");
        container.appendChild(riveCanvas);
    
        // Assuming Rive.js is available globally
        new rive.Rive({
            src: riveSrc,
            canvas: riveCanvas,
            autoplay: true,
        });
    }
    

    
    
    
    
    
    
    


