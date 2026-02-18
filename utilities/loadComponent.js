// --------------------------------------------
// Load external HTML components (header/footer)
// --------------------------------------------
export async function loadComponent(target, file, callback) {
  try {
    const container =
      typeof target === "string"
        ? document.querySelector(target)
        : target;

    if (!container) {
      throw new Error(`Target not found: ${target}`);
    }

    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`${file} not found`);
    }

    container.innerHTML = await response.text();
    callback?.();
    return container;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
  
}


export async function loadComponentToBody(file, callback) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`${file} not found`);

    const html = await response.text();
    document.body.insertAdjacentHTML("beforeend", html);

    if (callback) callback();
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}