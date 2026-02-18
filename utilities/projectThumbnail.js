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
    : `/pages/project-page.html#${project.id}`;

  return `
    <div class="project-card">
      
      <a href="${href}" data-project-id="${project.id}" >
        
          <img 
            src="/images/${project.id}/01.jpg" 
            alt="${project.title}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='/assets/placeholder.jpg'"
          />
          <div class="project-card__overlay">
            <h6>${project.title}</h6>
          </div>
        
      </a> 
    </div>
  `;
}
