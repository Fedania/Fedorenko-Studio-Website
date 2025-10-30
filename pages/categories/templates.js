// pages/categories/templates.js
export function projectTemplate(project) {
  const href = project.customUrl ? project.customUrl : `/project-page.html#${project.id}`;
  return `
    <a href="${href}" class="project-card">
      <img class="project__card" src="${project.thumbnail}" alt="${project.title}">
      <div class="project__card overlay">${project.title}</div>
    </a>
  `;
}

export function categoryTemplate(category, projectsHTML, showMore) {
  return `
    <div class="category__container">
      <h2 class="category__title">${category}</h2>
      <div class="category__thumbnails-grid">${projectsHTML}</div>
      ${showMore ? `<a class="see-more" href="?category=${category}">See more ${category} projects</a>` : ""}
    </div>
  `;
}
