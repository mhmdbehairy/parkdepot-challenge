export const formatTime = (time: any) => {
  const [sHours, minutes] = time.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? 'AM' : 'PM';
  const hours = +sHours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};
