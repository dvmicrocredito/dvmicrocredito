export const getCurrency = (n, f) => {
  if (!n) return 0;

  const options = {
    style: "decimal", // Other options: 'currency', 'percent', etc.
    minimumFractionDigits: f,
    maximumFractionDigits: f,
  };
  return n.toLocaleString("en-US", options);
};

export const getNumformat = (n) => {
  if (!n) return 0;

  const options = {
    style: "decimal", // Other options: 'currency', 'percent', etc.
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  return n.toLocaleString("en-US", options);
};
