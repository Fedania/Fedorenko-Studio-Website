export function createIcon(id, className = "") {
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.classList.add("icon");

  if (className) {
    svg.classList.add(className);
  }

  const use = document.createElementNS(svgNS, "use");
  use.setAttribute("href", `/assets/icons.svg#${id}`);

  svg.appendChild(use);

  return svg;
}