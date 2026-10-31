/**
 * Formats an ISO date the way the cards show it: "Sat 1 Nov, 10:00 AM".
 * A fixed time zone keeps server and browser output identical, which
 * avoids hydration mismatches.
 */
const EVENT_TIME_ZONE = "Africa/Lagos";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: EVENT_TIME_ZONE,
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatEventDate(iso: string): string {
  const parts: Record<string, string> = {};
  for (const part of formatter.formatToParts(new Date(iso))) {
    parts[part.type] = part.value;
  }
  return `${parts.weekday} ${parts.day} ${parts.month}, ${parts.hour}:${parts.minute} ${parts.dayPeriod}`;
}
