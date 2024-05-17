export default function isoToDate(isoString: string | number | Date) {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const dateInputValue = `${year}-${month}-${day}`;
  return dateInputValue;
}
