
function getMonth(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return months[date.getMonth()];
}

export default function formatDate(date) {
  const dateObj = new Date(date);
  const dateString = `${dateObj.getDate()} ${getMonth(dateObj)} ${dateObj.getUTCFullYear()}`;

  return dateString;
}
