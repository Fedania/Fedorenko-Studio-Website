import { loadComponent } from "/utilities/loadComponent.js";

export async function initHeaderBase() {
  const navigation = document.getElementById("navigation");
  const overlay = document.getElementById("page__overlay");

  if (!navigation || !overlay) return null;

  await loadComponent("#navigation", "/components/header.html");

  const headerNav = navigation.querySelector(".nav__container");
  if (!headerNav) return null;

  const header = document.createElement("div");
  header.id = "header";

  header.appendChild(headerNav);
  navigation.appendChild(header);

  return { navigation, header, headerNav, overlay };
}