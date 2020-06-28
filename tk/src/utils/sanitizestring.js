export const sanitizeEmail = (str) => {
  str = str.replace(/[^a-z0-9áéíóúñü\+@ \.,_-]/gim, '');
  return str.trim();
}

export const sanitizeString = (str) => {
    str = str.replace(/[^a-z0-9áéíóúñü@+ \.,_-]/gim, '');
    return str.trim();
};

export const sanitizeSearch = (str) => {
  const reOperators = /(;|--|\/\*|\*\/|\|\||{|}|\(|\)|'|")/gim;
  return str.replace(reOperators, '');
};

export const sanitizeNumber = (str) => {
  return str.replace(/[^0-9*$]/g, '').trim();
};