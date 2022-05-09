const number10 = 10;

const formatDayAndMonth = (value) => (
  (value < number10) ? `0${value}` : value
);

function getDate() {
  const date = new Date();
  const day = formatDayAndMonth(date.getDate());
  const month = formatDayAndMonth(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default getDate;
