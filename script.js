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
    
        if (hamburger) {
            hamburger.addEventListener("click", function () {
              navLinks.classList.toggle("active");
            });
        }
    });
    


    
    
    

    
    
    
    
    
    
    


