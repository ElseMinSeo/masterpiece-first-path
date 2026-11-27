"use client";

import { ApplicationCard } from "@/components/application";
import { Card, EmptyState, LinkButton, Loading, TopBar } from "@/components/ui";
import { useApp } from "@/lib/store";

export default function AppointmentsPage() {
  const { ready, applications, draft } = useApp();
  return (
    <main>
      <TopBar title="내 약속" back="/home" />
      {!ready ? <Loading /> : (
        <div className="space-y-4 px-5 pt-2">
          {draft && applications.length === 0 && (
            <Card>
              <p className="text-[15px] font-semibold">작성 중인 신청서가 있어요</p>
              <p className="mt-1 text-[13px] text-muted">입력한 내용은 이 기기에 임시 저장돼 있어요.</p>
              <LinkButton href="/apply" className="mt-3">이어서 작성하기</LinkButton>
            </Card>
          )}
          {applications.length === 0 && !draft && (
            <EmptyState
              title="아직 신청한 내역이 없어요"
              body="신청서를 보내면 운영자가 확인한 뒤 진행 상황을 여기에서 알려드려요."
              action={<LinkButton href="/apply">매칭 시작하기</LinkButton>}
            />
          )}
          {applications.map((a) => <ApplicationCard key={a.id} app={a} />)}
          {applications.length > 0 && (
            <p className="px-1 text-[13px] leading-relaxed text-muted">
              소개가 도착하면 상대가 공개에 동의한 프로필을 확인하고 24시간 안에 수락하거나 넘길 수 있어요.
              소개·수락·일정 합의 화면은 다음 개발 단계에서 연결돼요.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
