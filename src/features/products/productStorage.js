const STORAGE_KEY = "munder_products";

export function getProducts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();

  products.push({
    id: Date.now().toString(),
    ...product,
  });

  saveProducts(products);
}

export function updateProduct(product) {
  const products = getProducts().map((p) =>
    p.id === product.id ? product : p
  );

  saveProducts(products);
}

export function deleteProduct(id) {
  const products = getProducts().filter((p) => p.id !== id);

  saveProducts(products);
}

