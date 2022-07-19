export const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

export function formatPhoneNumber(number) {
  const result = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  return result;
}
