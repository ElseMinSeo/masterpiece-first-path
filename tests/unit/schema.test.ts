import { describe, expect, it } from "vitest";
import { upcomingDates } from "@/lib/apply/dates";
import { birthYearOptions, firstInvalidStep, normalizeDraft, parseSubmission, validateStep } from "@/lib/apply/schema";
import { NOW, validDraft } from "./helpers";

describe("신청서 검증", () => {
  it("올바른 초안은 모든 단계를 통과한다", () => {
    expect(firstInvalidStep(validDraft(), NOW)).toBeNull();
    expect(parseSubmission(validDraft(), NOW).ok).toBe(true);
  });

  it("1단계 기본 정보: 닉네임 공백·연도·성별 누락", () => {
    const e = validateStep(1, { ...validDraft(), nickname: "  ", birthYear: null, gender: "" }, NOW);
    expect(Object.keys(e).sort()).toEqual(["birthYear", "gender", "nickname"]);
  });

  it("만 20세 미만 출생 연도와 목록 밖 성별을 거절", () => {
    expect(validateStep(1, { ...validDraft(), birthYear: 2010 }, NOW).birthYear).toMatch(/만 20/);
    expect(validateStep(1, { ...validDraft(), gender: "기타값" }, NOW).gender).toBeDefined();
    expect(birthYearOptions(NOW)[0]).toBe(2006);
  });

  it("예전 형식 초안도 빈 칸을 채워 읽는다", () => {
    const d = normalizeDraft({ idempotencyKey: "old", intro: "예전 초안" });
    expect(d.hobbies).toEqual([]);
    expect(d.intro).toBe("예전 초안");
    expect(firstInvalidStep(d, NOW)).toBe(1);
  });

  it("한 줄 소개가 공백뿐이면 intro 필드 오류", () => {
    const e = validateStep(3, { ...validDraft(), intro: "    " }, NOW);
    expect(e.intro).toMatch(/한 줄 소개/);
  });

  it("한 줄 소개 80자 초과, 상세 소개 500자 초과를 거절한다", () => {
    expect(validateStep(3, { ...validDraft(), intro: "가".repeat(81) }, NOW).intro).toBeDefined();
    expect(validateStep(1, { ...validDraft(), bio: "가".repeat(501) }, NOW).bio).toBeDefined();
  });

  it("목록에 없는 태그를 거절한다", () => {
    expect(validateStep(3, { ...validDraft(), personalities: ["무서운"] }, NOW).personalities).toBeDefined();
  });

  it("성격·연락 스타일 미선택 시 각 필드에 오류", () => {
    const e = validateStep(3, { ...validDraft(), personalities: [], contactStyles: [] }, NOW);
    expect(Object.keys(e).sort()).toEqual(["contactStyles", "personalities"]);
  });

  it("2단계 필수 선택 누락", () => {
    const e = validateStep(2, { ...validDraft(), hobbies: [], preferredPlaces: [], moods: [], foods: [], smoking: "" }, NOW);
    expect(Object.keys(e).sort()).toEqual(["foods", "hobbies", "moods", "preferredPlaces", "smoking"]);
  });

  it("나이 범위가 뒤집히거나 20세 미만이면 거절", () => {
    expect(validateStep(4, { ...validDraft(), ageMin: 36, ageMax: 30 }, NOW).ageMin).toBeDefined();
    expect(validateStep(4, { ...validDraft(), ageMin: 18 }, NOW).ageMin).toBeDefined();
  });

  it("역은 최대 2곳", () => {
    expect(validateStep(5, { ...validDraft(), stations: ["성수", "뚝섬", "왕십리"] }, NOW).stations).toMatch(/최대 2곳/);
  });

  it("2주 밖의 날짜와 오늘 날짜를 거절", () => {
    expect(validateStep(5, { ...validDraft(), dates: ["2026-11-27"] }, NOW).dates).toBeDefined();
    expect(validateStep(5, { ...validDraft(), dates: ["2026-12-30"] }, NOW).dates).toBeDefined();
    expect(upcomingDates(NOW)).toHaveLength(14);
    expect(upcomingDates(NOW)[0]).toBe("2026-11-28");
  });

  it("예산 누락·역전을 해당 필드에 표시", () => {
    expect(validateStep(5, { ...validDraft(), budgetMin: null }, NOW).budgetMin).toBeDefined();
    expect(validateStep(5, { ...validDraft(), budgetMin: 50000, budgetMax: 30000 }, NOW).budgetMax).toMatch(/최대 예산/);
  });

  it("공개 내용 확인 체크가 없으면 제출 불가", () => {
    expect(validateStep(5, { ...validDraft(), confirmed: false }, NOW).confirmed).toBeDefined();
  });

  it("첫 번째로 막힌 단계를 알려준다", () => {
    expect(firstInvalidStep({ ...validDraft(), foods: [] }, NOW)).toBe(2);
  });

  it("제출 값은 한 줄 소개 앞뒤 공백을 제거한다", () => {
    const r = parseSubmission({ ...validDraft(), intro: "  안녕하세요  " }, NOW);
    expect(r.ok && r.value.intro).toBe("안녕하세요");
  });
});
