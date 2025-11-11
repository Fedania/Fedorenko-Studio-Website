export async function initServices(sectionSelector, pageKey, jsonPath = '../data/services.json') {
  const section = document.querySelector(sectionSelector);
  if (!section) {
    console.warn(`Section "${sectionSelector}" not found`);
    return;
  }

  try {
    const response = await fetch(jsonPath);
    const data = await response.json();
    const services = data[pageKey];

    if (!services) {
      console.warn(`No services found for page key "${pageKey}"`);
      return;
    }

    // Inject HTML
    section.innerHTML = `
      <div class="section__content">
        <div class="services__container">
          <h4 class="services__title">Services:</h4>
          <div class="services__list">
            ${services
              .map(
                (service) => `
                <div class="service" data-id="${service.id}">
                  <div class="service__title__wrapper">
                    <h3 class="service__title">${service.title}</h3>
                  </div>
                  <div class="service__description">
                    <p>${service.description}</p>
                  </div>
                </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    const serviceElements = section.querySelectorAll('.service');

    // Set up initial collapsed state
    serviceElements.forEach((service) => {
      service.style.height = service.querySelector('.service__title__wrapper').offsetHeight + 'px';
      service.style.overflow = 'hidden';
      service.style.transition = 'height 0.4s ease, background-color 0.3s ease';
    });

    serviceElements.forEach((service) => {
      service.addEventListener('click', () => {
        const isActive = service.classList.contains('active');

        // Collapse all first
        serviceElements.forEach((s) => {
          s.classList.remove('active');
          s.style.height = s.querySelector('.service__title__wrapper').offsetHeight + 'px';
        });

        // Expand clicked one (if it wasn’t already active)
        if (!isActive) {
          service.classList.add('active');
          const fullHeight = service.scrollHeight;
          service.style.height = fullHeight + 'px';
        }
      });
    });

    // Optional: auto-adjust heights on window resize
    window.addEventListener('resize', () => {
      const activeService = section.querySelector('.service.active');
      if (activeService) {
        activeService.style.height = activeService.scrollHeight + 'px';
      }
    });

  } catch (err) {
    console.error('Error loading services:', err);
  }
}
