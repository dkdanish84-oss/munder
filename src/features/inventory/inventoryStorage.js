const STORAGE_KEY = "munder_inventory";

export function getInventory() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveInventory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addStock(productId, qty) {
  const items = getInventory();

  const index = items.findIndex((i) => i.productId === productId);

  if (index >= 0) {
    items[index].stock += Number(qty);
  } else {
    items.push({
      productId,
      stock: Number(qty),
    });
  }

  saveInventory(items);
}

export function removeStock(productId, qty) {
  const items = getInventory();

  const index = items.findIndex((i) => i.productId === productId);

  if (index >= 0) {
    items[index].stock = Math.max(
      0,
      items[index].stock - Number(qty)
    );
  }

  saveInventory(items);
}

