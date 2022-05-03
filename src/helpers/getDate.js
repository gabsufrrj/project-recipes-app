const number9 = 9;

const formatDayAndMonth = (value) => (
  (value < number9) ? `0${value}` : value
);

function getDate() {
  const date = new Date();
  const day = formatDayAndMonth(date.getDate());
  const month = formatDayAndMonth(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default getDate;
