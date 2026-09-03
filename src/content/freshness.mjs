const VERSION_DEPENDENT_TYPES = new Set(["tier", "update", "dungeon"]);
const DAY_MS = 24 * 60 * 60 * 1000;

export function getSingaporeDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function toUtcDate(value) {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid freshness date: ${value}`);
  return date;
}

export function getFreshnessStatus(page, asOf) {
  if (page.dataState === "not_collected") {
    return { state: "not_collected", daysUntilCheck: null, reason: "The source data has not been collected." };
  }

  if (page.dataState === "fetch_failed") {
    return { state: "fetch_failed", daysUntilCheck: null, reason: "The latest source fetch failed; the last successful snapshot is retained." };
  }

  if (VERSION_DEPENDENT_TYPES.has(page.contentType) && !page.verifiedForVersion) {
    return { state: "version_gap", daysUntilCheck: null, reason: "This page has no verified game version." };
  }

  if (!page.lastVerified || !page.nextScheduledCheck) {
    return { state: "not_collected", daysUntilCheck: null, reason: "No complete verification schedule is recorded." };
  }

  const asOfDate = toUtcDate(asOf);
  const lastVerifiedDate = toUtcDate(page.lastVerified);
  const nextCheckDate = toUtcDate(page.nextScheduledCheck);
  const ageDays = Math.round((asOfDate.getTime() - lastVerifiedDate.getTime()) / DAY_MS);
  const daysUntilCheck = Math.round((nextCheckDate.getTime() - asOfDate.getTime()) / DAY_MS);

  const reminderDays = page.contentType === "codes" ? 7 : 90;
  const p0Days = page.contentType === "codes" ? 30 : 90;
  if (ageDays >= p0Days) {
    return { state: "overdue", daysUntilCheck, reason: `The scheduled check passed ${Math.abs(daysUntilCheck)} day(s) ago.` };
  }

  if (ageDays >= reminderDays || daysUntilCheck <= 2) {
    return { state: "due_soon", daysUntilCheck, reason: `The scheduled check is due in ${daysUntilCheck} day(s).` };
  }

  return { state: "current", daysUntilCheck, reason: `The next check is scheduled in ${daysUntilCheck} day(s).` };
}
