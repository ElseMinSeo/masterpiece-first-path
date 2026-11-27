import { PLAN_DAYS } from "./options";

/** Asia/Seoul 기준 YYYY-MM-DD */
export function seoulDateString(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/** 내일부터 PLAN_DAYS일(2주) 동안의 날짜 목록 */
export function upcomingDates(now: Date = new Date(), days: number = PLAN_DAYS): string[] {
  const out: string[] = [];
  for (let i = 1; i <= days; i++) {
    out.push(seoulDateString(new Date(now.getTime() + i * 86_400_000)));
  }
  return out;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function formatDateChip(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const wd = new Date(Date.UTC(y ?? 2000, (m ?? 1) - 1, d ?? 1)).getUTCDay();
  return `${m}/${d} (${WEEKDAYS[wd]})`;
}
