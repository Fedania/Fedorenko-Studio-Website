import { loadComponent } from "/utilities/loadComponent.js";

export async function initHeaderBase() {
  const navigation = document.getElementById("navigation");
  const overlay = document.getElementById("page__overlay");

  if (!navigation || !overlay) {
    console.log("navigation or overlay missing");
    return null;
  }

  await loadComponent("#navigation", "/components/header.html");

  const headerNav = navigation.querySelector(".nav__container");

  if (!headerNav) {
    console.log("Header nav missing");
    return null;
  }

  // ✅ Create wrapper
  const header = document.createElement("div");
  header.id = "header";

  // Move nav into wrapper
  header.appendChild(headerNav);

  // Append wrapper into navigation
  navigation.appendChild(header);

  return { navigation, header, headerNav, overlay };
}