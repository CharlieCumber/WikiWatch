const formatDateTime = (isoString: string): string => {
  const input = new Date(isoString);
  const now = new Date();

  const startOfDay = (date: Date): Date =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const startOfToday = startOfDay(now);
  const startOfYesterday = startOfDay(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  );

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(input);

  if (input >= startOfToday) return time;
  if (input >= startOfYesterday) return `Yesterday ${time}`;

  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(input);

  return `${date} ${time}`;
};

export default formatDateTime;
