export default function getDateFormated(rawDate: string) {
  if (rawDate === '') return '-';
  const date = new Date(rawDate);
  return new Intl.DateTimeFormat(navigator.languages[0]).format(date);
}
