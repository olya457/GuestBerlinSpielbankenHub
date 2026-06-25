export const getRegularVenueStatus = (date = new Date()) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const minutes = hour * 60 + minute;
  const open = 11 * 60;
  const close = 3 * 60;
  const isOpen = minutes >= open || minutes < close;
  if (isOpen) {
    return {
      label: 'Open now',
      detail: minutes < close ? 'Regular hours continue until 03:00' : 'Regular hours 11:00-03:00',
      tone: 'green' as const,
    };
  }
  return {
    label: 'Closed now',
    detail: 'Regular opening resumes at 11:00',
    tone: 'amber' as const,
  };
};
