const KEY = "munder_leads";

export function getLeads() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveLeads(leads) {
  localStorage.setItem(KEY, JSON.stringify(leads));
}
