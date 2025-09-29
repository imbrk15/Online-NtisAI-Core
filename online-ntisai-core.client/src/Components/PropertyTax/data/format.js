export const formatInt = (n) => new Intl.NumberFormat("en-IN").format(n);

export const formatCr = (n) =>
  `₹${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(n)} Cr`;

export const formatAxis = (n) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(n);
