document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const hamburger = document.getElementById("hamburger");
    const closeBtn = document.getElementById("close-btn");
    const projectsBtn = document.getElementById("sidebar-projects-btn");
    const dropdownMenu = document.getElementById("sidebar-dropdown-menu");

    const slider = document.querySelector(".slideshow"); // Slider container
    const slides = document.querySelectorAll(".image-container"); // All slides
    const slideWidth = slides[0].offsetWidth; // Width of a single slide
    const totalSlides = slides.length;
    const slidesToShow = 3; // Number of images visible at once
    const scrollSpeed = 2; // Adjust scroll speed

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

// Duplicate slides to create a seamless effect
slider.innerHTML += slider.innerHTML; // Clone slides for looping effect

let scrollAmount = 0;

function autoSlide() {
    scrollAmount += scrollSpeed;

    // Check if we've scrolled past the original set of slides
    if (scrollAmount >= slideWidth * totalSlides) {
        slider.style.transition = "none"; // Remove animation
        scrollAmount = 0; // Instantly reset position
        slider.style.transform = `translate3d(-${scrollAmount}px, 0, 0)`;

        // Ensure smooth transition resumes
        setTimeout(() => {
            slider.style.transition = "transform 1s linear";
        }, 20);
    } else {
        slider.style.transform = `translate3d(-${scrollAmount}px, 0, 0)`;
        slider.style.transition = "transform 1s linear";
    }
}

setInterval(autoSlide, 50); // Smooth continuous scrolling


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
      
    


