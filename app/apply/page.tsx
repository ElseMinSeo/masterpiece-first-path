"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { STEP_PATH } from "@/components/apply-shell";
import { Loading } from "@/components/ui";
import { firstInvalidStep } from "@/lib/apply/schema";
import { useActiveApplication, useApp } from "@/lib/store";

/** 홈 '매칭 시작하기'와 프로필 '매칭 신청하기'가 함께 쓰는 진입점: 같은 초안의 이어 쓸 단계로 보낸다 */
export default function ApplyEntry() {
  const { ready, draft, ensureDraft } = useApp();
  const active = useActiveApplication();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (active) return router.replace("/appointments");
    const d = draft ?? ensureDraft();
    router.replace(STEP_PATH[firstInvalidStep(d) ?? 5]);
  }, [ready, active, draft, ensureDraft, router]);

  return <Loading />;
}
