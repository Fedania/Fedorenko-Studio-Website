// --------------------------------------------
// Load external HTML components (header/footer)
// --------------------------------------------
export async function loadComponent(id, file, callback) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`${file} not found`);
    document.getElementById(id).innerHTML = await response.text();
    if (callback) callback();
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}
