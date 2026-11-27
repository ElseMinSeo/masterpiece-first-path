"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/icons";
import { BookmarkButton, PlaceThumb } from "@/components/place";
import { cx, DevBadge, EmptyState, TopBar } from "@/components/ui";
import { DEV_DAILY } from "@/lib/data/daily";
import { CATEGORY_LABEL, getPlace } from "@/lib/data/places";
import type { PlaceCategory } from "@/lib/types";
import Link from "next/link";

export default function DailyPage() {
  const [cat, setCat] = useState<PlaceCategory | "all">("all");
  const [toast, setToast] = useState("");
  const cats = Array.from(new Set(DEV_DAILY.map((p) => p.category)));
  const posts = DEV_DAILY.filter((p) => cat === "all" || p.category === cat);

  const share = async (id: string, title: string) => {
    const url = `${window.location.origin}/daily#${id}`;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setToast("링크를 복사했어요");
      }
    } catch {
      return;
    }
    setTimeout(() => setToast(""), 1800);
  };

  return (
    <main>
      <TopBar title="데일리" back="/home" />
      <div role="group" aria-label="분류" className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
        {(["all", ...cats] as const).map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cx("h-9 shrink-0 rounded-full border px-4 text-[14px]", cat === c ? "border-brand bg-brand font-semibold text-white" : "border-line bg-white")}>
            {c === "all" ? "전체" : CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      {posts.length === 0 ? <EmptyState title="아직 올라온 글이 없어요" /> : (
        <ul className="space-y-6 px-4">
          {posts.map((post) => {
            const place = getPlace(post.placeId);
            return (
              <li key={post.id} id={post.id} className="scroll-mt-16">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-[14px] font-semibold">
                    <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-[12px] text-brand-ink">운영</span>
                    첫, 길 운영팀
                  </p>
                  <span className="text-[12px] text-muted">{post.publishedAt}</span>
                </div>
                {place && <PlaceThumb place={place} className="aspect-[4/5] w-full" label="사진 준비 중 (개발용)" />}
                {place && (
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-line bg-white p-3">
                    <PlaceThumb place={place} className="size-11 shrink-0" label="" />
                    <Link href={`/places/${place.id}`} className="min-w-0 flex-1">
                      <p className="truncate text-[16px] font-semibold">{place.name}</p>
                      <p className="text-[12px] text-ink/60">{place.district} · {place.subtitle}</p>
                    </Link>
                    <BookmarkButton place={place} />
                  </div>
                )}
                <h2 className="mt-3 text-[16px] font-bold">{post.title}</h2>
                <p className="mt-1 text-[14px] leading-relaxed text-ink/75">{post.body}</p>
                <button type="button" onClick={() => share(post.id, post.title)} className="mt-2 flex min-h-10 items-center gap-1.5 text-[14px] text-ink/70">
                  <ShareIcon /> 공유
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p className="px-4 pt-6"><DevBadge>운영자 글 예시 · 개발용</DevBadge></p>
      {toast && <p role="status" className="fixed inset-x-0 bottom-24 mx-auto w-fit rounded-full bg-ink px-4 py-2 text-[13px] text-white">{toast}</p>}
    </main>
  );
}
