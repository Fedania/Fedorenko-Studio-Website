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
    // Log initial scroll position when the page loads
    console.log('Initial scrollY on page load:', window.scrollY);

    // Load header and footer components
    loadComponent("header-container", "../components/header.html", () => {
        console.log('Header loaded');
        activateSidebar();
    });

    loadComponent("footer-container", "../components/footer.html", () => {
        console.log('Footer loaded');
        initializeScrollToTop();
    });

    // Initialize the scroll-to-top button logic
    function initializeScrollToTop() {
        console.log('Scroll to Top Initialized');
        
        const scrollBtn = document.getElementById('scrollToTopBtn');
        if (!scrollBtn) {
            console.error('Scroll to Top button not found!');
            return;
        }

        // Scroll event listener
        window.addEventListener('scroll', () => {
            

            if (window.scrollY > 100) {
                if (!scrollBtn.classList.contains('show')) {
                    console.log('Showing scroll-to-top button');
                    scrollBtn.classList.add('show');
                }
            } else {
                if (scrollBtn.classList.contains('show')) {
                    console.log('Hiding scroll-to-top button');
                    scrollBtn.classList.remove('show');
                }
            }
        });

        // Click event to scroll to the top
        scrollBtn.addEventListener('click', () => {
            console.log('Scrolling to top...');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // Project Click Events
    document.body.addEventListener("click", function (event) {
        const projectImg = event.target.closest(".project");
        if (projectImg) {
          const url = projectImg.getAttribute("data-url");
          if (url) {
            window.location.href = url;
          }
        }
      });
      
  
    // Add image text
    document.querySelectorAll('.image-container').forEach(container => {
      const textElement = container.querySelector('.image-text');
      textElement.textContent = container.getAttribute('data-text');
    });
  
    // Hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    if (hamburger) {
      hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
      });
    }
  });
  
    


    
    
    

    
    
    
    
    
    
    


