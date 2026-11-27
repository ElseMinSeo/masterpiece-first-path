"use client";

import Link from "next/link";
import { CUISINE_LABEL, formatKrw } from "@/lib/data/places";
import { useApp } from "@/lib/store";
import type { Place } from "@/lib/types";
import { BookmarkIcon, ClockIcon, PinIcon } from "./icons";
import { cx } from "./ui";

/** 실제 사진 대신 쓰는 개발용 자리표시 이미지 */
export function PlaceThumb({ place, className, label }: { place: Place; className?: string; label?: string }) {
  return (
    <div
      className={cx("grid place-items-center overflow-hidden rounded-xl text-[12px] text-ink/50", className)}
      style={{ background: `linear-gradient(135deg, ${place.tone}, #ffffff)` }}
      role="img"
      aria-label={`${place.name} 사진 자리 (개발용)`}
    >
      {label ?? "사진 준비 중"}
    </div>
  );
}

export function BookmarkButton({ place, className, onDark }: { place: Place; className?: string; onDark?: boolean }) {
  const { isSaved, toggleBookmark, ready } = useApp();
  const saved = isSaved(place.id);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `${place.name} 저장 취소` : `${place.name} 저장`}
      disabled={!ready}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void toggleBookmark(place.id);
      }}
      className={cx("grid size-11 shrink-0 place-items-center rounded-full", saved ? "text-brand" : onDark ? "text-white" : "text-ink/50", className)}
    >
      <BookmarkIcon filled={saved} />
    </button>
  );
}

/** 시안 04의 장소 카드: 이름·분류, 사진 가로 스크롤, 시간·지역 */
export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="border-b border-line/70 bg-white px-5 py-5" data-testid="place-card">
      <div className="flex items-start gap-3">
        <PlaceThumb place={place} className="size-12 shrink-0" label="" />
        <Link href={`/places/${place.id}`} className="min-w-0 flex-1">
          <h3 className="truncate text-[19px] font-bold">{place.name}</h3>
          <p className="mt-0.5 text-[13px] text-ink/60">{place.subtitle}</p>
        </Link>
        <BookmarkButton place={place} />
      </div>
      <Link href={`/places/${place.id}`} aria-label={`${place.name} 상세 보기`} className="mt-3 -mr-5 flex gap-2 overflow-x-auto pr-5 [scrollbar-width:none]">
        {[0, 1, 2].map((i) => (
          <PlaceThumb key={i} place={place} className="aspect-square w-[42%] shrink-0" />
        ))}
      </Link>
      <ul className="mt-3 space-y-1 text-[13px] text-ink/70">
        <li className="flex items-center gap-1.5"><ClockIcon /> <span className="min-w-0 break-keep">{place.hoursText}</span></li>
        <li className="flex items-center gap-1.5"><PinIcon /> {place.district} · {place.station}역 · {CUISINE_LABEL[place.cuisine] !== "기타" ? `${CUISINE_LABEL[place.cuisine]} · ` : ""}{formatKrw(place.priceMinKrw)}~</li>
      </ul>
    </article>
  );
}

/** 가로 스크롤 추천 카드 (시안 07 맞춤 추천 장소) */
export function MiniPlaceCard({ place }: { place: Place }) {
  return (
    <div className="relative w-[160px] shrink-0">
      <Link href={`/places/${place.id}`} className="block">
        <PlaceThumb place={place} className="aspect-square w-full" />
        <p className="mt-2 text-[12px] text-ink/60">{place.district}</p>
        <p className="truncate text-[15px] font-semibold">{place.name}</p>
        <p className="mt-1 truncate text-[12px] text-ink/60">#{place.keywords[0]}</p>
      </Link>
      <BookmarkButton place={place} className="absolute right-1 top-1 bg-white/80" />
    </div>
  );
}
