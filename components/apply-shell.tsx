"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { firstInvalidStep, validateStep, type ApplicationDraft, type FieldErrors, type StepKey } from "@/lib/apply/schema";
import { useActiveApplication, useApp } from "@/lib/store";
import { StepIndicator } from "./form";
import { Card, cx, LinkButton, Loading, TopBar } from "./ui";

export const STEP_PATH: Record<StepKey, string> = { 1: "/apply/1", 2: "/apply/2", 3: "/apply/3", 4: "/apply/confirm" };

export function ApplyShell({ step, title, holdGuard, children }: {
  step: StepKey; title: string; holdGuard?: boolean; children: (draft: ApplicationDraft) => ReactNode;
}) {
  const { ready, draft, ensureDraft } = useApp();
  const active = useActiveApplication();
  const router = useRouter();
  const blocked = ready && !!active && !holdGuard;

  useEffect(() => {
    if (ready && !draft && !active && !holdGuard) ensureDraft();
  }, [ready, draft, active, holdGuard, ensureDraft]);

  // 앞 단계를 건너뛰고 들어오면 처음 막힌 단계로 돌려보낸다
  useEffect(() => {
    if (!ready || !draft || blocked || holdGuard || step === 1) return;
    const inv = firstInvalidStep(draft);
    if (inv !== null && inv < step) router.replace(STEP_PATH[inv]);
  }, [ready, draft, blocked, holdGuard, step, router]);

  const back = step === 1 ? "/home" : STEP_PATH[(step - 1) as StepKey];

  return (
    <main>
      <TopBar title="매칭 신청" back={back} />
      {!ready || (!draft && !blocked) ? <Loading /> : blocked ? (
        <div className="px-5 pt-6">
          <Card>
            <p className="text-[16px] font-semibold">이미 접수된 신청이 있어요</p>
            <p className="mt-1 text-[14px] text-muted">신청 번호 {active?.number} · 한 번에 하나의 신청만 진행할 수 있어요.</p>
            <LinkButton href="/appointments" className="mt-4">내 약속에서 보기</LinkButton>
          </Card>
        </div>
      ) : (
        <div className="px-5">
          <h2 className="mt-4 text-center text-[22px] font-bold">{title}</h2>
          <div className="mt-5 mb-9"><StepIndicator current={step === 4 ? 3 : (step as 1 | 2 | 3)} /></div>
          {draft && children(draft)}
        </div>
      )}
    </main>
  );
}

/** 단계 검증: '다음'을 누른 뒤부터 오류를 해당 필드에 보여준다 */
export function useStepValidation(step: StepKey, draft: ApplicationDraft) {
  const [shown, setShown] = useState(false);
  const errors: FieldErrors = validateStep(step, draft);
  const valid = Object.keys(errors).length === 0;
  const attempt = (): boolean => {
    if (valid) return true;
    setShown(true);
    requestAnimationFrame(() => {
      const first = document.querySelector('[role="alert"]')?.closest("[data-field]");
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      const focusable = first?.querySelector<HTMLElement>("input, textarea, button");
      focusable?.focus({ preventScroll: true });
    });
    return false;
  };
  return { errors: shown ? errors : {}, valid, attempt };
}

export function StepActions({ onPrev, onNext, nextLabel = "다음", valid, busy }: {
  onPrev?: () => void; onNext: () => void; nextLabel?: string; valid: boolean; busy?: boolean;
}) {
  return (
    <div className="mt-4 mb-6 flex gap-2">
      {onPrev && (
        <button type="button" onClick={onPrev} className="min-h-13 w-[34%] shrink-0 rounded-full border border-line bg-white text-[16px]">
          이전
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={busy}
        aria-busy={busy || undefined}
        data-testid="step-next"
        className={cx(
          "min-h-13 flex-1 rounded-full text-[16px] font-semibold",
          valid ? "bg-brand text-white" : "bg-line text-ink/50",
          busy && "opacity-70",
        )}
      >
        {busy ? "제출 중…" : nextLabel}
      </button>
    </div>
  );
}
