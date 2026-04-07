export const phoneMask = (value: string) => {
  if (!value) return '';
  if (value.length > 15) return value.slice(0, 15);
  const digits = value.replace(/\D/g, '');
  const length = digits.length;

  if (length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
  } else {
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  }
}