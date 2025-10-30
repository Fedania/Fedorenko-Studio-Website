/**
 * Renders a single project thumbnail card.
 * 
 * @param {Object} project - Project data object.
 * @param {string} project.id - Unique project ID (used for image folder paths).
 * @param {string} project.title - Project title.
 * @param {string} [project.customUrl] - Optional custom link for the project.
 * @returns {string} - HTML string for one project thumbnail.
 */
export function renderProjectThumbnail(project) {
  const href = project.customUrl 
    ? project.customUrl 
    : `/project-page.html#${project.id}`;

  return `
    
      <a href="${href}" class="project__card" data-project-id="${project.id}" >
        
          <img 
            src="../images/${project.id}/${project.id}-01.jpg" 
            alt="${project.title}" 
            loading="lazy"
          />
          <div class="overlay">
            <h3>${project.title}</h3>
          </div>
        
      </a>
    
  `;
}
