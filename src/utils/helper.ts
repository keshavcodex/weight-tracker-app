export const dateFormater = (text: string) => {
  const date = new Date(text);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formattedDate;
};
export const longDateFormater = (text: string) => {
  const date = new Date(text);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formattedDate;
};

export const trimDate = (date: Date) => {
  try {
    date = new Date(date);
    return date.toISOString().slice(0, 10);
  } catch (error) {
    return 'Invalid date';
  }
};

export const monthDayFormatter = (text: string) => {
  const date = new Date(text);
  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });
  return formattedDate;
};
