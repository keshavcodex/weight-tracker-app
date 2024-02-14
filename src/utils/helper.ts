export const dateFormater = (date: Date) => {
  date = new Date('2024-02-12T20:32:35.774Z');
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
};
