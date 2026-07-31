const KEY = "munder_categories";

export function getCategories() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCategories(categories) {
  localStorage.setItem(KEY, JSON.stringify(categories));
}

export function addCategory(category) {
  const categories = getCategories();

  categories.push({
    id: Date.now(),
    name: category.name,
    description: category.description,
    createdAt: new Date().toISOString(),
  });

  saveCategories(categories);
}

export function updateCategory(updated) {
  const categories = getCategories().map((item) =>
    item.id === updated.id ? updated : item
  );

  saveCategories(categories);
}

export function deleteCategory(id) {
  const categories = getCategories().filter(
    (item) => item.id !== id
  );

  saveCategories(categories);
}

