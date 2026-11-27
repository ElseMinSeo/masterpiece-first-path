"use client";

import { useState } from "react";
import { ClockIcon, CopyIcon, PinIcon } from "@/components/icons";
import { BookmarkButton, MiniPlaceCard, PlaceThumb } from "@/components/place";
import { cx, DevBadge, SectionTitle, TopBar } from "@/components/ui";
import { DEV_PLACES, formatKrw, NOISE_LABEL } from "@/lib/data/places";
import type { Place } from "@/lib/types";

export default function PlaceDetail({ place }: { place: Place }) {
  const [tab, setTab] = useState<"info" | "menu">("info");
  const [copied, setCopied] = useState(false);
  const recs = DEV_PLACES.filter((p) => p.id !== place.id && (p.station === place.station || p.category === place.category)).slice(0, 4);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(place.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <TopBar title={place.name} right={<BookmarkButton place={place} />} />
      <PlaceThumb place={place} className="aspect-[16/10] w-full rounded-none" label="사진 준비 중 (개발용)" />

      <section className="bg-white px-5 pb-6 pt-5">
        <div className="flex items-start gap-3">
          <PlaceThumb place={place} className="size-14 shrink-0" label="" />
          <div className="min-w-0">
            <h2 className="text-[22px] font-bold">{place.name}</h2>
            <p className="text-[13px] text-ink/60">{place.subtitle}</p>
          </div>
        </div>
        <p className="mt-3 text-[14px] text-ink/70">{place.summary}</p>
        <ul className="mt-3 space-y-1 text-[13px] text-ink/70">
          <li className="flex items-center gap-1.5"><ClockIcon /> {place.hoursText}</li>
          <li className="flex items-center gap-1.5"><PinIcon /> {place.district} · {place.station}역</li>
        </ul>
        <ul className="mt-3 flex flex-wrap gap-2">
          {place.keywords.map((k) => <li key={k} className="rounded-md bg-field px-2.5 py-1 text-[13px]">#{k}</li>)}
        </ul>
        <div className="mt-3"><DevBadge /></div>
      </section>

      <div role="tablist" aria-label="장소 정보" className="mt-2 grid grid-cols-2 border-b border-line bg-white">
        {(["info", "menu"] as const).map((t) => (
          <button
            key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)}
            className={cx("h-12 text-[16px]", tab === t ? "border-b-2 border-ink font-semibold" : "text-muted")}
          >
            {t === "info" ? "정보" : "메뉴"}
          </button>
        ))}
      </div>

      {tab === "info" ? (
        <div className="space-y-8 bg-white px-5 py-6" role="tabpanel">
          <section>
            <SectionTitle>매장정보</SectionTitle>
            <dl className="grid grid-cols-[72px_1fr] gap-y-2 text-[14px]">
              <dt className="text-muted">영업시간</dt><dd>{place.hoursText}</dd>
              <dt className="text-muted">가격대</dt><dd>1인 {formatKrw(place.priceMinKrw)} ~ {formatKrw(place.priceMaxKrw)}</dd>
              <dt className="text-muted">소음</dt><dd>{NOISE_LABEL[place.noise]}</dd>
              <dt className="text-muted">좌석</dt><dd>{place.seating}</dd>
            </dl>
            <p className="mt-3 text-[12px] text-muted">정보 확인일 {place.checkedAt} · 실시간 영업 여부는 확인하지 않아요.</p>
          </section>

          <section>
            <SectionTitle>편의시설</SectionTitle>
            <ul className="flex flex-wrap gap-2">
              {place.facilities.map((f) => <li key={f} className="rounded-xl border border-line px-3 py-2 text-[14px]">{f}</li>)}
            </ul>
          </section>

          <section>
            <SectionTitle>위치</SectionTitle>
            <div className="flex items-start justify-between gap-3 text-[14px]">
              <p className="flex min-w-0 items-start gap-1.5"><PinIcon className="mt-1 shrink-0" /> <span>{place.address}</span></p>
              <button type="button" onClick={copy} className="flex shrink-0 items-center gap-1 text-[13px] text-muted">
                <CopyIcon /> {copied ? "복사됨" : "주소복사"}
              </button>
            </div>
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(place.station + "역")}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[14px]"
            >
              {place.station}역 주변 지도 열기 (외부 링크)
            </a>
          </section>

          <section>
            <SectionTitle>매장설명</SectionTitle>
            <p className="text-[14px] leading-relaxed text-ink/80">{place.description}</p>
          </section>
        </div>
      ) : (
        <div className="bg-white px-5 py-6" role="tabpanel">
          <ul className="divide-y divide-line">
            {place.menu.map((m) => (
              <li key={m.name} className="flex justify-between gap-3 py-3 text-[15px]">
                <span className="min-w-0">{m.name}</span>
                <span className="shrink-0 font-semibold">{formatKrw(m.priceKrw)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] text-muted">메뉴와 가격은 개발용 예시이며 정보 확인일은 {place.checkedAt}이에요.</p>
        </div>
      )}

      {recs.length > 0 && (
        <section className="mt-2 bg-white px-5 py-6">
          <SectionTitle>함께 보면 좋은 장소</SectionTitle>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 [scrollbar-width:none]">
            {recs.map((p) => <MiniPlaceCard key={p.id} place={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}
