"use client";

import { PlaceCard } from "@/components/place";
import { EmptyState, LinkButton, Loading, TopBar } from "@/components/ui";
import { getPlace } from "@/lib/data/places";
import { useApp } from "@/lib/store";
import type { Place } from "@/lib/types";

export default function SavedPage() {
  const { ready, bookmarks } = useApp();
  const places = bookmarks.map(getPlace).filter((p): p is Place => Boolean(p));
  return (
    <main>
      <TopBar title="저장" back="/home" />
      {!ready ? <Loading /> : places.length === 0 ? (
        <EmptyState
          title="아직 저장한 장소가 없어요"
          body="마음에 드는 장소의 저장 버튼을 누르면 여기에 모여요."
          action={<LinkButton href="/places">장소 둘러보기</LinkButton>}
        />
      ) : (
        <>
          <p className="px-5 py-3 text-[13px] text-muted" data-testid="saved-count">저장한 장소 {places.length}곳</p>
          {places.map((p) => <PlaceCard key={p.id} place={p} />)}
        </>
      )}
    </main>
  );
}
