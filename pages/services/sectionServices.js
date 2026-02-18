// services.js
import { initAccordion } from './accordion.js';

export async function initServices  
(jsonPath = '/data/services.json'  ) {
    try {
      const response = await fetch(jsonPath);
      const data = await response.json();

      Object.entries(data).forEach(([pageKey, services]) => {
        const containerId = `${pageKey}__container`;
        const container = document.getElementById(containerId);

        if (!container) return;

        container.innerHTML = renderServices(services);

        // 👇 plug-in behavior
        initAccordion(container);
        if (container.dataset.initialized) return;
    container.dataset.initialized = "true";
      });
      
    } 
    catch (err) {
      console.error('Error loading services:', err);
    }
    
}
function renderServices(services) {
  return `
    
      <div class="services__wrapper">
        <h4 class="services__title">Services:</h4>
        <div class="services__list">
          ${services.map(service => `
            <div class="service" data-id="${service.id}">
              <div class="service__content">
                <div class="service__title__wrapper">
                  <h3 class="service__title">${service.title}</h3>
                </div>
                <div class="service__description">
                  <p>${service.description}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    
  `;
}