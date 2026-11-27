"use client";

import { formatDateChip } from "@/lib/apply/dates";
import { TIME_SLOTS } from "@/lib/apply/options";
import { formatKrw } from "@/lib/data/places";
import type { Application } from "@/lib/repo";
import { STATUS_LABEL } from "@/lib/store";
import { CheckIcon } from "./icons";
import { cx, StatusBadge } from "./ui";

const STAGES = ["신청 접수", "운영자 검토", "소개·수락", "일정·장소 합의", "결제·예약 확정"];
const STAGE_INDEX: Record<Application["status"], number> = { submitted: 1, reviewing: 1, offered: 2, closed: 4, withdrawn: 0 };

export function slotLabel(id: string) {
  return TIME_SLOTS.find((t) => t.id === id)?.label ?? id;
}

export function ApplicationCard({ app }: { app: Application }) {
  const cur = STAGE_INDEX[app.status];
  const d = app.data;
  return (
    <article className="rounded-2xl border border-line bg-white p-5" data-testid="application-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] text-muted">신청 번호</p>
        <StatusBadge>{STATUS_LABEL[app.status]}</StatusBadge>
      </div>
      <p className="mt-0.5 text-[20px] font-bold tracking-wide" data-testid="application-number">{app.number}</p>
      <p className="mt-1 text-[12px] text-muted">
        접수 {new Date(app.submittedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", dateStyle: "medium", timeStyle: "short" })}
      </p>

      <ol className="mt-5 space-y-3" aria-label="진행 단계">
        {STAGES.map((s, i) => {
          const done = i < cur;
          const now = i === cur;
          return (
            <li key={s} className="flex items-center gap-3 text-[14px]" aria-current={now ? "step" : undefined}>
              <span className={cx("grid size-6 shrink-0 place-items-center rounded-full border text-[11px]",
                done ? "border-brand bg-brand text-white" : now ? "border-brand text-brand" : "border-line text-muted")}>
                {done ? <CheckIcon /> : i + 1}
              </span>
              <span className={cx(done || now ? "text-ink" : "text-muted", now && "font-semibold")}>
                {s}{now && app.status === "submitted" ? " · 운영자가 신청 내용을 확인하고 있어요" : ""}
              </span>
            </li>
          );
        })}
      </ol>

      <dl className="mt-5 grid grid-cols-[76px_1fr] gap-y-2 border-t border-line pt-4 text-[14px]">
        <dt className="text-muted">가능한 역</dt><dd>{d.stations.map((s) => `${s}역`).join(", ")}</dd>
        <dt className="text-muted">가능한 날</dt><dd>{d.dates.map(formatDateChip).join(", ")}</dd>
        <dt className="text-muted">시간대</dt><dd>{d.timeSlots.map(slotLabel).join(", ")}</dd>
        <dt className="text-muted">1인 예산</dt><dd>{formatKrw(d.budgetMin ?? 0)} ~ {formatKrw(d.budgetMax ?? 0)}</dd>
        <dt className="text-muted">한 줄 소개</dt><dd className="min-w-0">{d.intro}</dd>
      </dl>
    </article>
  );
}
