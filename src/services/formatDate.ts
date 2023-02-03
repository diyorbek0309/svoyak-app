export const formatDate = (date: Date) => {
  date = new Date(date);
  let d = date.getDate().toString(),
    m = (date.getMonth() + 1).toString(),
    y = date.getFullYear().toString(),
    formatted = "";

  if (d.length === 1) {
    d = "0" + d;
  }
  if (m.length === 1) {
    m = "0" + m;
  }
  formatted = d + " - " + m + " - " + y;

  return formatted;
};
