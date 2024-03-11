export const dateFormater = (date: Date) => {
  date = new Date(date);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
};
