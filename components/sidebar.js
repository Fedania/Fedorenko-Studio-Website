// --------------------------------------------
// Sidebar + dropdown functionality
// --------------------------------------------
export function activateSidebar() {
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

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  hamburger.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  projectsBtn.addEventListener("click", () => {
    const expanded = dropdownMenu.classList.toggle("active");
    projectsBtn.parentElement.classList.toggle("active", expanded);
    dropdownMenu.style.height = expanded ? dropdownMenu.scrollHeight + "px" : "0px";
  });
}
