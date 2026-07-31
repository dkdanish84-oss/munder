const KEY = "munder_leads";

export function getLeads() {
  const data = localStorage.getItem(KEY);
  console.log("LOAD:", data);
  return data ? JSON.parse(data) : [];
}

export function saveLeads(leads) {
  console.log("SAVE:", leads);
  localStorage.setItem(KEY, JSON.stringify(leads));
}
