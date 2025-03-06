document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth;
    let scrollAmount = 0;
    
    function autoSlide() {
        scrollAmount += slideWidth / 2; // Moves half-slide width for smooth effect
        if (scrollAmount >= slideWidth * totalSlides) {
            scrollAmount = 0;
        }
        slider.style.transform = `translate3d(-${scrollAmount}px, 0, 0)`;
        slider.style.transition = "transform 1s linear";
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
});
