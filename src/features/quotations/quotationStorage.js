const STORAGE_KEY = "munder_quotations";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const write = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getQuotations = () => read();

export const getQuotation = (id) =>
  read().find((q) => q.id === id);

export const generateQuotationNo = () => {
  const list = read();
  return `QT-${String(list.length + 1).padStart(4, "0")}`;
};

export const saveQuotation = (quotation) => {
  const list = read();

  const newQuotation = {
    id: crypto.randomUUID(),
    quotationNo: generateQuotationNo(),
    createdAt: new Date().toISOString(),
    ...quotation,
  };

  list.unshift(newQuotation);
  write(list);

  return newQuotation;
};

export const updateQuotation = (id, data) => {
  const list = read().map((q) =>
    q.id === id ? { ...q, ...data } : q
  );

  write(list);
};

export const deleteQuotation = (id) => {
  write(read().filter((q) => q.id !== id));
};

export const clearQuotations = () => {
  localStorage.removeItem(STORAGE_KEY);
};


