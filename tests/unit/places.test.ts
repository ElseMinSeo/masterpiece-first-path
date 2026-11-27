import { describe, expect, it } from "vitest";
import { DEV_PLACES, filterPlaces } from "@/lib/data/places";

describe("장소 필터", () => {
  it("분류·음식·역을 함께 적용한다", () => {
    const r = filterPlaces(DEV_PLACES, { category: "restaurant", cuisine: "korean" });
    expect(r.map((p) => p.id)).toEqual(["dev-003"]);
    expect(filterPlaces(DEV_PLACES, { station: "성수" }).every((p) => p.station === "성수")).toBe(true);
  });
  it("결과가 없을 수 있다", () => {
    expect(filterPlaces(DEV_PLACES, { category: "cafe", cuisine: "korean" })).toHaveLength(0);
  });
  it("개발용 데이터에는 평점 필드가 없고 확인일이 있다", () => {
    for (const p of DEV_PLACES) {
      expect(p).not.toHaveProperty("rating");
      expect(p.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
