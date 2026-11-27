"use client";

import Link from "next/link";
import { useRef, useState, type ComponentType, type SVGProps } from "react";
import {
  BookmarkIcon, CupIcon, FlameIcon, ForkIcon, GemIcon, GlassIcon, PinIcon, SparkleIcon,
} from "@/components/icons";
import { PlaceTile } from "@/components/place";
import { cx, DevBadge, EmptyState, SectionTitle } from "@/components/ui";
import { DEV_DAILY } from "@/lib/data/daily";
import { CATEGORIES, CATEGORY_LABEL, DEV_PLACES, PLACE_STATIONS, getPlace } from "@/lib/data/places";
import { STATUS_LABEL, useActiveApplication, useApp } from "@/lib/store";
import type { PlaceCategory } from "@/lib/types";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { filled?: boolean }>;

// 시안의 아이콘 메뉴 10칸 중 지금 실제로 동작하는 8개만 둔다
const SHORTCUTS: { label: string; href: string; Icon: Icon }[] = [
  { label: "맛집", href: "/places?category=restaurant", Icon: ForkIcon },
  { label: "카페", href: "/places?category=cafe", Icon: CupIcon },
  { label: "고급", href: "/places?category=fine", Icon: GemIcon },
  { label: "바", href: "/places?category=bar", Icon: GlassIcon },
  { label: "분위기", href: "/places?category=mood", Icon: SparkleIcon },
  { label: "지역", href: "/places?panel=station", Icon: (p) => <PinIcon {...p} width={24} height={24} /> },
  { label: "데일리", href: "/daily", Icon: FlameIcon },
  { label: "저장", href: "/saved", Icon: BookmarkIcon },
];

function Banners() {
  const { ready, draft } = useApp();
  const active = useActiveApplication();
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const slides = [
    <section key="match" aria-labelledby="hero-title" className="flex h-full flex-col justify-between">
      {!ready ? <span aria-busy className="opacity-0">불러오는 중</span> : active ? (
        <>
          <div>
            <p className="text-[13px] opacity-90">진행 중인 신청</p>
            <h2 id="hero-title" className="mt-1 text-[20px] font-bold">신청이 접수됐어요</h2>
            <p className="mt-1 text-[14px]">신청 번호 <strong data-testid="home-app-number">{active.number}</strong> · {STATUS_LABEL[active.status]}</p>
          </div>
          <Link href="/appointments" className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-[15px] font-semibold text-brand-ink">내 약속에서 보기</Link>
        </>
      ) : (
        <>
          <div>
            <h2 id="hero-title" className="flex items-center gap-1.5 text-[20px] font-bold"><FlameIcon filled width={20} height={20} /> 데이트가 필요한 순간</h2>
            <p className="mt-1 text-[14px] leading-snug opacity-95">운영자가 직접 확인하고 소개해드려요. 파일럿 1인 9,900원 (식음료 별도)</p>
          </div>
          <Link href="/apply" className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-[15px] font-semibold text-brand-ink">
            {draft ? "작성 중인 신청 이어서 하기" : "매칭 시작하기"}
          </Link>
        </>
      )}
    </section>,
    <section key="daily" className="flex h-full flex-col justify-between">
      <div>
        <p className="text-[13px] opacity-90">운영팀 데일리</p>
        <h2 className="mt-1 text-[20px] font-bold">{DEV_DAILY[0]?.title}</h2>
        <p className="mt-1 text-[14px] opacity-95">{getPlace(DEV_DAILY[0]?.placeId ?? "")?.name} · 개발용 예시 글</p>
      </div>
      <Link href="/daily" className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 text-[15px] font-semibold text-brand-ink">데일리 보기</Link>
    </section>,
  ];

  return (
    <div>
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
        aria-roledescription="배너"
      >
        {slides.map((s, i) => (
          <div key={i} className="w-full shrink-0 snap-center px-5">
            <div className="h-[176px] rounded-2xl bg-brand p-5 text-white">{s}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1.5" aria-hidden>
        {slides.map((_, i) => (
          <span key={i} className={cx("h-1.5 rounded-full transition-all", i === index ? "w-4 bg-brand" : "w-1.5 bg-line")} />
        ))}
      </div>
    </div>
  );
}

function CategoryPopular() {
  const [cat, setCat] = useState<PlaceCategory | "all">("all");
  const list = DEV_PLACES.filter((p) => cat === "all" || p.category === cat).slice(0, 4);
  return (
    <section aria-labelledby="cat-title" className="px-5">
      <SectionTitle><span id="cat-title">카테고리별 장소</span></SectionTitle>
      <div role="group" aria-label="카테고리" className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none]">
        {(["all", ...CATEGORIES] as const).map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cx("h-9 shrink-0 rounded-full px-4 text-[14px]", cat === c ? "bg-brand font-semibold text-white" : "bg-field text-ink/80")}>
            {c === "all" ? "전체" : CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>
      {list.length === 0 ? <EmptyState title="이 카테고리에는 아직 장소가 없어요" /> : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
          {list.map((p) => <PlaceTile key={p.id} place={p} />)}
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="pb-4">
      <header className="flex h-14 items-center justify-between px-5">
        <span className="text-[22px] font-extrabold text-brand-ink">첫, 길</span>
        <DevBadge>개발 버전</DevBadge>
      </header>

      <nav aria-label="바로가기" className="grid grid-cols-4 gap-y-4 px-5 pb-5 pt-1">
        {SHORTCUTS.map(({ label, href, Icon }) => (
          <Link key={label} href={href} className="flex flex-col items-center gap-1.5 text-[12px] text-ink/80">
            <span className="grid size-14 place-items-center rounded-2xl bg-field text-ink/80"><Icon /></span>
            {label}
          </Link>
        ))}
      </nav>

      <Banners />

      <div className="mt-6 space-y-10 border-t-8 border-field pt-8">
        <section aria-labelledby="rec-title" className="px-5">
          <SectionTitle right={<Link href="/places" className="text-[14px] text-muted">더 보기</Link>}>
            <span id="rec-title">맞춤 추천 장소</span>
          </SectionTitle>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 [scrollbar-width:none]">
            {DEV_PLACES.slice(0, 5).map((p) => <PlaceTile key={p.id} place={p} className="w-[148px] shrink-0" />)}
          </div>
        </section>

        <section aria-labelledby="hot-title" className="px-5">
          <SectionTitle><span id="hot-title">지금 뜨는 장소</span></SectionTitle>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {DEV_PLACES.slice(2, 6).map((p) => <PlaceTile key={p.id} place={p} withAvatar />)}
          </div>
          <Link href="/places" className="mt-5 flex min-h-12 items-center justify-center rounded-full border border-brand text-[15px] font-semibold text-brand-ink">
            전체 보기
          </Link>
          <p className="mt-2 text-[12px] text-muted">순서는 개발용 예시예요. 실제 인기 순위가 아니에요.</p>
        </section>

        <section aria-labelledby="area-title" className="px-5">
          <SectionTitle><span id="area-title">동네별 추천</span></SectionTitle>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 [scrollbar-width:none]">
            {PLACE_STATIONS.map((s) => (
              <Link key={s} href={`/places?station=${encodeURIComponent(s)}`}
                className="flex h-[120px] w-[120px] shrink-0 flex-col justify-between rounded-3xl bg-field p-4">
                <span className="text-[16px] font-semibold">{s}</span>
                <span className="text-[12px] text-ink/60">{DEV_PLACES.filter((p) => p.station === s).length}곳</span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="theme-title" className="px-5">
          <SectionTitle right={<Link href="/daily" className="text-[14px] text-muted">데일리</Link>}>
            <span id="theme-title">테마별 추천</span>
          </SectionTitle>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 [scrollbar-width:none]">
            {DEV_DAILY.map((post) => {
              const place = getPlace(post.placeId);
              return (
                <Link key={post.id} href={`/daily#${post.id}`}
                  className="flex h-[150px] w-[160px] shrink-0 flex-col justify-end rounded-2xl p-4"
                  style={{ background: `linear-gradient(160deg, ${place?.tone ?? "#eee"}, #ffffff)` }}>
                  <span className="truncate text-[11px] text-ink/60">{place?.keywords.slice(0, 2).map((k) => `#${k}`).join(" ")}</span>
                  <span className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug">{post.title}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <CategoryPopular />

        <section aria-labelledby="how-title" className="mx-5 rounded-2xl border border-line bg-white p-4">
          <h2 id="how-title" className="text-[16px] font-bold">이렇게 진행돼요</h2>
          <ol className="mt-3 space-y-2 text-[14px] text-ink/80">
            <li>1. 신청서에 기본 정보·취향·가능한 역과 시간을 적어요.</li>
            <li>2. 운영자가 조건이 맞는 분을 직접 찾아 소개해요.</li>
            <li>3. 두 분이 모두 수락하면 시간과 장소 두 곳을 제안해요.</li>
            <li>4. 같은 시간·장소에 동의하면 결제 후 좌석을 확인해 예약을 확정해요.</li>
          </ol>
          <p className="mt-3 text-[13px] text-muted">파일럿 이용료 1인 9,900원 (식음료 별도) · 결제는 아직 연결되지 않았어요</p>
        </section>

        <footer className="border-t-8 border-field px-5 pt-6 text-[12px] text-ink/60">
          <div className="flex items-center justify-between">
            <span className="text-[18px] font-bold text-ink">첫, 길</span>
            <span>이용약관 · 개인정보처리방침 (준비 중)</span>
          </div>
          <dl className="mt-3 grid grid-cols-[52px_1fr] gap-y-1">
            <dt>상호명</dt><dd>확정 전</dd>
            <dt>대표자</dt><dd>확정 전</dd>
            <dt>주소</dt><dd>확정 전</dd>
            <dt>연락처</dt><dd>확정 전</dd>
          </dl>
        </footer>
      </div>
    </main>
  );
}
