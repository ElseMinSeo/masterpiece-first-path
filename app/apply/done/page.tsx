"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckIcon } from "@/components/icons";
import { Card, LinkButton, Loading, StatusBadge, TopBar } from "@/components/ui";
import { STATUS_LABEL, useApp } from "@/lib/store";

function Done() {
  const { ready, applications } = useApp();
  const no = useSearchParams().get("no");
  const app = applications.find((a) => a.number === no) ?? applications[0];

  if (!ready) return <Loading />;
  if (!app) {
    return (
      <div className="px-5 pt-8">
        <Card>
          <p className="font-semibold">신청 내역을 찾지 못했어요</p>
          <LinkButton href="/apply" className="mt-4">매칭 신청하기</LinkButton>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6">
      <div className="flex flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-full bg-brand text-white"><CheckIcon className="size-8" /></span>
        <h2 className="mt-4 text-[22px] font-bold">신청이 접수됐어요</h2>
        <p className="mt-2 text-[14px] text-muted">운영자가 신청 내용을 직접 확인한 뒤 연락드려요.</p>
      </div>

      <Card className="mt-6">
        <p className="text-[13px] text-muted">신청 번호</p>
        <p className="text-[22px] font-bold tracking-wide" data-testid="done-number">{app.number}</p>
        <div className="mt-2"><StatusBadge>{STATUS_LABEL[app.status]}</StatusBadge></div>
      </Card>

      <Card className="mt-3">
        <p className="text-[15px] font-semibold">다음에 일어나는 일</p>
        <ul className="mt-2 space-y-2 text-[14px] leading-relaxed text-ink/80">
          <li>· 운영자가 가능한 역·시간·예산과 서로의 선호가 맞는 분을 찾아요.</li>
          <li>· 맞는 분이 있으면 소개를 보내드려요. 소개를 받으면 24시간 안에 수락하거나 넘길 수 있어요.</li>
          <li>· 신청 수정·취소와 소개 알림은 다음 개발 단계에서 연결돼요.</li>
        </ul>
      </Card>

      <div className="mt-6 space-y-2">
        <LinkButton href="/appointments">내 약속에서 보기</LinkButton>
        <LinkButton href="/home" variant="outline">홈으로</LinkButton>
      </div>
    </div>
  );
}

export default function DonePage() {
  return (
    <main>
      <TopBar title="신청 완료" back="/home" />
      <Suspense fallback={<Loading />}><Done /></Suspense>
    </main>
  );
}
