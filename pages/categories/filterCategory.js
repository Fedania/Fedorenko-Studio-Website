// pages/categories/filterCategory.js
export function filterCategory(projects, selectedCategory) {
  // Group projects by category
  const categories = {};
  projects.forEach(project => {
    project.categories.forEach(category => {
      if (!categories[category]) categories[category] = [];
      categories[category].push(project);
    });
  });

  // Return either all categories or one filtered category
  if (selectedCategory) {
    return { [selectedCategory]: categories[selectedCategory] || [] };
  }

  return categories;
}
