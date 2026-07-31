const KEY = "munder_customers";

export function getCustomers() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCustomers(customers) {
  localStorage.setItem(KEY, JSON.stringify(customers));
}
