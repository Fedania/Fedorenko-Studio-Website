// scrollTop.js
// --------------------------------------------
// Scroll-to-Top Button Component
// --------------------------------------------

export function initScrollTop() {
  // Create the button element
  const button = document.createElement('button');
  button.id = 'scrollToTop';
  button.innerHTML = '↑'; // You can replace this with an SVG or icon if you like

  // Add styling classes (optional)
  button.classList.add('scroll-top-btn', 'hidden');

  // Append to the body
  document.body.appendChild(button);

  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.classList.remove('hidden');
    } else {
      button.classList.add('hidden');
    }
  });

  // Scroll smoothly to top when clicked
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
