"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CupIcon, FilterIcon, ForkIcon, GemIcon, GlassIcon, SparkleIcon } from "@/components/icons";
import { PlaceCard } from "@/components/place";
import { Button, cx, DevBadge, EmptyState, TopBar } from "@/components/ui";
import {
  CATEGORIES, CATEGORY_LABEL, CUISINE_FILTERS, CUISINE_LABEL, DEV_PLACES, filterPlaces, PLACE_STATIONS,
} from "@/lib/data/places";
import type { Cuisine, PlaceCategory } from "@/lib/types";

const CAT_ICON = { restaurant: ForkIcon, cafe: CupIcon, fine: GemIcon, bar: GlassIcon, mood: SparkleIcon } as const;

export default function PlacesView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = (params.get("category") ?? "all") as PlaceCategory | "all";
  const cuisine = (params.get("cuisine") ?? "all") as Cuisine | "all";
  const station = params.get("station") ?? "all";
  const showStations = params.get("panel") === "station" || station !== "all";

  const set = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "all") next.delete(k);
      else next.set(k, v);
    }
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const list = useMemo(() => filterPlaces(DEV_PLACES, { category, cuisine, station }), [category, cuisine, station]);
  const title = category === "all" ? "장소" : CATEGORY_LABEL[category];

  return (
    <main>
      <TopBar title={title} back="/home" />

      <div role="tablist" aria-label="장소 분류" className="grid grid-cols-5 gap-1 px-3 pb-3">
        {CATEGORIES.map((c) => {
          const Icon = CAT_ICON[c];
          const active = category === c;
          return (
            <button
              key={c} role="tab" aria-selected={active} type="button"
              onClick={() => set({ category: active ? "all" : c })}
              className={cx(
                "flex min-h-[72px] flex-col items-center justify-center gap-1 rounded-xl border text-[13px]",
                active ? "border-brand text-ink" : "border-transparent text-ink/70",
              )}
            >
              <Icon className={active ? "text-brand" : ""} />
              {CATEGORY_LABEL[c]}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-y border-line bg-white px-4 py-2.5">
        <button
          type="button"
          aria-label="지역 필터"
          aria-expanded={showStations}
          onClick={() => set({ panel: showStations ? null : "station", station: showStations ? null : station })}
          className={cx("grid h-10 w-14 shrink-0 place-items-center rounded-full border", station !== "all" ? "border-brand text-brand" : "border-line")}
        >
          <FilterIcon />
        </button>
        <span aria-hidden className="h-6 w-px shrink-0 bg-line" />
        <div role="group" aria-label="음식 종류" className="flex min-w-0 gap-2 overflow-x-auto [scrollbar-width:none]">
          {(["all", ...CUISINE_FILTERS] as const).map((c) => (
            <button
              key={c} type="button" aria-pressed={cuisine === c}
              onClick={() => set({ cuisine: c })}
              className={cx(
                "h-10 shrink-0 rounded-full border px-4 text-[15px]",
                cuisine === c ? "border-brand bg-brand font-semibold text-white" : "border-line bg-white text-ink/80",
              )}
            >
              {c === "all" ? "전체" : CUISINE_LABEL[c]}
            </button>
          ))}
        </div>
      </div>

      {showStations && (
        <div role="group" aria-label="가까운 역" className="flex flex-wrap gap-2 border-b border-line bg-white px-4 py-3">
          {(["all", ...PLACE_STATIONS] as const).map((s) => (
            <button
              key={s} type="button" aria-pressed={station === s}
              onClick={() => set({ station: s, panel: "station" })}
              className={cx("h-9 rounded-full border px-3.5 text-[14px]", station === s ? "border-brand bg-brand-soft text-brand" : "border-line text-ink/70")}
            >
              {s === "all" ? "모든 역" : `${s}역`}
            </button>
          ))}
        </div>
      )}

      <p className="flex items-center justify-between gap-2 px-5 py-3 text-[13px] text-muted">
        <span aria-live="polite">{list.length}곳</span>
        <DevBadge />
      </p>

      {list.length === 0 ? (
        <EmptyState
          title="조건에 맞는 장소가 없어요"
          body="분류나 음식 종류, 지역을 바꿔보세요."
          action={<Button variant="outline" block onClick={() => router.replace(pathname, { scroll: false })}>필터 초기화</Button>}
        />
      ) : (
        <div>{list.map((p) => <PlaceCard key={p.id} place={p} />)}</div>
      )}
    </main>
  );
}
