import { createIcon } from "/utilities/createIcon.js";
import { loadComponent } from "/utilities/loadComponent.js";

let sidebar = null;
let hamburger = null;

export function enableMobile({ navigation, headerNav, overlay }) {
  if (sidebar) return;

  sidebar = document.createElement("aside");
  sidebar.id = "sidebar";

  const closeBtn = document.createElement("button");
  closeBtn.className = "sidebar__close";
  closeBtn.textContent = "×";

  hamburger = document.createElement("button");
  hamburger.className = "menu-toggle";
  hamburger.appendChild(createIcon("hamburger"));

  sidebar.append(closeBtn, headerNav);
  navigation.append(hamburger, sidebar);

  hamburger.addEventListener("click", () => {
    sidebar.classList.add("is-open");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("is-open");
  });

  loadComponent(sidebar, "/components/footer.html");

  overlay.classList.remove("overlay--expanded");
  overlay.classList.add("overlay--shrunk");
}