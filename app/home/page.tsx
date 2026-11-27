"use client";

import Link from "next/link";
import { FlameIcon } from "@/components/icons";
import { MiniPlaceCard } from "@/components/place";
import { DevBadge, LinkButton, SectionTitle, StatusBadge } from "@/components/ui";
import { DEV_DAILY } from "@/lib/data/daily";
import { DEV_PLACES, getPlace } from "@/lib/data/places";
import { STATUS_LABEL, useActiveApplication, useApp } from "@/lib/store";

function MatchingHero() {
  const { ready, draft } = useApp();
  const active = useActiveApplication();

  if (!ready) return <div className="brand-gradient h-[188px] rounded-2xl opacity-60" aria-busy />;

  return (
    <section className="brand-gradient rounded-2xl p-5 text-white" aria-labelledby="hero-title">
      {active ? (
        <>
          <p className="text-[13px] opacity-90">진행 중인 신청</p>
          <h2 id="hero-title" className="mt-1 text-[20px] font-bold">신청이 접수됐어요</h2>
          <p className="mt-2 text-[14px] opacity-95">
            신청 번호 <strong data-testid="home-app-number">{active.number}</strong>
          </p>
          <span className="mt-2 inline-block rounded-full bg-white/20 px-2.5 py-1 text-[12px] font-semibold">{STATUS_LABEL[active.status]}</span>
          <LinkButton href="/appointments" variant="white" className="mt-4">내 약속에서 보기</LinkButton>
        </>
      ) : (
        <>
          <h2 id="hero-title" className="flex items-center gap-1.5 text-[21px] font-bold"><FlameIcon filled /> 데이트가 필요한 순간</h2>
          <p className="mt-2 text-[14px] leading-relaxed opacity-95">
            취향과 가능한 시간을 알려주시면 운영자가 직접 확인하고 소개해드려요.
          </p>
          <LinkButton href="/apply" variant="white" className="mt-4">
            {draft ? "작성 중인 신청 이어서 하기" : "매칭 시작하기"}
          </LinkButton>
        </>
      )}
    </section>
  );
}

export default function HomePage() {
  const posts = DEV_DAILY.slice(0, 2);
  return (
    <main>
      <header className="flex h-14 items-center justify-between px-5">
        <span className="text-[22px] font-extrabold text-brand">첫, 길</span>
        <DevBadge>개발 버전</DevBadge>
      </header>

      <div className="space-y-8 px-5 pt-2">
        <MatchingHero />

        <section aria-labelledby="how-title" className="rounded-2xl border border-line bg-white p-4">
          <h2 id="how-title" className="text-[16px] font-bold">이렇게 진행돼요</h2>
          <ol className="mt-3 space-y-2 text-[14px] text-ink/80">
            <li>1. 신청서에 성향·취향·가능한 역과 시간을 적어요.</li>
            <li>2. 운영자가 조건이 맞는 분을 직접 찾아 소개해요.</li>
            <li>3. 두 분이 모두 수락하면 시간과 장소 두 곳을 제안해요.</li>
            <li>4. 같은 시간·장소에 동의하면 결제 후 좌석을 확인해 예약을 확정해요.</li>
          </ol>
          <p className="mt-3 text-[13px] text-muted">
            파일럿 이용료 1인 9,900원 (식음료 별도) · 결제는 아직 연결되지 않았어요
          </p>
        </section>

        <section aria-labelledby="daily-title">
          <SectionTitle right={<Link href="/daily" className="text-[14px] text-muted">전체 보기</Link>}>
            <span id="daily-title">운영팀 데일리</span>
          </SectionTitle>
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.id}>
                <Link href={`/daily#${p.id}`} className="block rounded-2xl border border-line bg-white p-4">
                  <p className="text-[15px] font-semibold">{p.title}</p>
                  <p className="mt-1 text-[13px] text-muted">{getPlace(p.placeId)?.name} · {p.publishedAt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="rec-title">
          <SectionTitle right={<Link href="/places" className="text-[14px] text-muted">장소 더 보기</Link>}>
            <span id="rec-title">첫 만남 추천 장소</span>
          </SectionTitle>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
            {DEV_PLACES.slice(0, 5).map((p) => <MiniPlaceCard key={p.id} place={p} />)}
          </div>
          <p className="mt-2"><StatusBadge>장소 정보는 모두 개발용 가상 데이터예요</StatusBadge></p>
        </section>
      </div>
    </main>
  );
}
