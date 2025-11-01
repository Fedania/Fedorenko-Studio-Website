export async function initServices(sectionSelector, pageKey, jsonPath = '../data/services.json') {
  const section = document.querySelector(sectionSelector);
  if (!section) {
    console.warn(`Section "${sectionSelector}" not found`);
    return;
  }

  try {
    const response = await fetch(jsonPath);
    const data = await response.json();
    const services = data[pageKey]; // select the correct list

    if (!services) {
      console.warn(`No services found for page key "${pageKey}"`);
      return;
    }

    section.innerHTML = `
      <h3 class="services__title">Services:</h3>
      <div class="services__list">
        ${services
          .map(
            (service) => `
          <div class="service" data-id="${service.id}">
            <h3 class="service__title">${service.title}</h3>
            <div class="service__description">
              <p>${service.description}</p>
            </div>
          </div>`
          )
          .join('')}
      </div>
    `;

    // Toggle logic
    const serviceElements = section.querySelectorAll('.service');
    serviceElements.forEach((el) => {
      const title = el.querySelector('.service__title');
      title.addEventListener('click', () => {
        serviceElements.forEach((s) => s.classList.remove('active'));
        el.classList.add('active');
      });
    });
  } catch (err) {
    console.error('Error loading services:', err);
  }
}
