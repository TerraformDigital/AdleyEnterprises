export function formatBusinessTime(value?: string): string {
  if (!value) return "";

  const [hoursPart, minutesPart] = value.split(":");
  const hours = Number.parseInt(hoursPart, 10);
  const minutes = Number.parseInt(minutesPart, 10);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = ((hours + 11) % 12) + 1;
  const minuteLabel = minutes.toString().padStart(2, "0");

  return `${hour12}:${minuteLabel} ${period}`;
}

export function formatBusinessHoursRange(opens?: string, closes?: string): string {
  if (!opens || !closes) {
    return [opens, closes].filter(Boolean).join(" - ");
  }

  return `${formatBusinessTime(opens)} - ${formatBusinessTime(closes)}`;
}
