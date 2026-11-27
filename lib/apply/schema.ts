import { z } from "zod";
import {
  AGE_MAX, AGE_MIN, AVOID_PLACES, BIO_MAX, BUDGET_MAX, CONTACT_STYLES, DATE_STYLES, FOODS,
  INTRO_MAX, MAX_DATES, MAX_STATIONS, MAX_TIME_SLOTS, MOODS, PERSONALITIES, STATIONS, TEMPOS, TIME_SLOTS,
} from "./options";
import { upcomingDates } from "./dates";

export interface ApplicationDraft {
  personalities: string[];
  contactStyles: string[];
  intro: string;
  bio: string;
  moods: string[];
  foods: string[];
  dateStyles: string[];
  avoidPlaces: string[];
  ageMin: number;
  ageMax: number;
  partnerPersonalities: string[];
  tempo: string;
  stations: string[];
  dates: string[];
  timeSlots: string[];
  budgetMin: number | null;
  budgetMax: number | null;
  disclose: { personalities: boolean; intro: boolean; bio: boolean };
  confirmed: boolean;
  /** 같은 초안을 두 번 제출해도 한 건만 생기도록 하는 키 */
  idempotencyKey: string;
  updatedAt: string;
}

export function emptyDraft(idempotencyKey: string): ApplicationDraft {
  return {
    personalities: [], contactStyles: [], intro: "", bio: "",
    moods: [], foods: [], dateStyles: [], avoidPlaces: [],
    ageMin: 25, ageMax: 35, partnerPersonalities: [], tempo: "",
    stations: [], dates: [], timeSlots: [], budgetMin: null, budgetMax: null,
    disclose: { personalities: true, intro: true, bio: false },
    confirmed: false, idempotencyKey, updatedAt: new Date().toISOString(),
  };
}

const tags = <T extends readonly string[]>(opts: T, min: number, minMsg: string, max?: number, maxMsg?: string) => {
  let s = z.array(z.enum(opts as unknown as [string, ...string[]], { message: "선택지에 없는 값이 있어요." }));
  s = s.min(min, { message: minMsg });
  if (max !== undefined) s = s.max(max, { message: maxMsg ?? `최대 ${max}개까지 고를 수 있어요.` });
  return s.refine((a) => new Set(a).size === a.length, { message: "중복 선택이 있어요." });
};

export const step1Schema = z.object({
  personalities: tags(PERSONALITIES, 1, "나의 성격을 1개 이상 골라주세요."),
  contactStyles: tags(CONTACT_STYLES, 1, "연락 스타일을 1개 이상 골라주세요."),
  intro: z
    .string()
    .transform((s) => s.trim())
    .pipe(
      z.string()
        .min(1, { message: "한 줄 소개를 입력해주세요. 공백만으로는 저장되지 않아요." })
        .max(INTRO_MAX, { message: `한 줄 소개는 ${INTRO_MAX}자 이내로 써주세요.` }),
    ),
  bio: z.string().max(BIO_MAX, { message: `상세 소개는 ${BIO_MAX}자 이내로 써주세요.` }),
});

export const step2Schema = z.object({
  moods: tags(MOODS, 1, "선호하는 분위기를 1개 이상 골라주세요."),
  foods: tags(FOODS, 1, "선호하는 음식을 1개 이상 골라주세요."),
  dateStyles: tags(DATE_STYLES, 1, "데이트 스타일을 1개 이상 골라주세요."),
  avoidPlaces: tags(AVOID_PLACES, 0, ""),
});

export const step3Schema = z
  .object({
    ageMin: z.number().int().min(AGE_MIN, { message: `${AGE_MIN}살 이상만 고를 수 있어요.` }).max(AGE_MAX),
    ageMax: z.number().int().min(AGE_MIN).max(AGE_MAX, { message: `${AGE_MAX}살 이하로 골라주세요.` }),
    partnerPersonalities: tags(PERSONALITIES, 0, ""),
    tempo: z.union([z.literal(""), z.enum(TEMPOS as unknown as [string, ...string[]])]),
  })
  .refine((v) => v.ageMin <= v.ageMax, { path: ["ageMin"], message: "최소 나이가 최대 나이보다 클 수 없어요." });

const SLOT_IDS = TIME_SLOTS.map((t) => t.id) as unknown as [string, ...string[]];

export function confirmSchema(now: Date = new Date()) {
  const allowed = new Set(upcomingDates(now));
  const won = (label: string) =>
    z.number({ message: `${label}을 입력해주세요.` })
      .int({ message: "원 단위 숫자로 입력해주세요." })
      .min(0, { message: "0원 이상으로 입력해주세요." })
      .max(BUDGET_MAX, { message: `${BUDGET_MAX.toLocaleString("ko-KR")}원 이하로 입력해주세요.` });
  return z
    .object({
      stations: tags(STATIONS, 1, "가능한 역을 1곳 이상 골라주세요.", MAX_STATIONS, `역은 최대 ${MAX_STATIONS}곳까지 고를 수 있어요.`),
      dates: z
        .array(z.string())
        .min(1, { message: "앞으로 2주 안에서 가능한 날짜를 1개 이상 골라주세요." })
        .max(MAX_DATES, { message: `날짜는 최대 ${MAX_DATES}개까지 고를 수 있어요.` })
        .refine((a) => a.every((d) => allowed.has(d)), { message: "앞으로 2주 안의 날짜만 고를 수 있어요." })
        .refine((a) => new Set(a).size === a.length, { message: "중복 선택이 있어요." }),
      timeSlots: z
        .array(z.enum(SLOT_IDS, { message: "선택지에 없는 시간대예요." }))
        .min(1, { message: "가능한 시간대를 1개 이상 골라주세요." })
        .max(MAX_TIME_SLOTS, { message: `시간대는 최대 ${MAX_TIME_SLOTS}개까지 고를 수 있어요.` }),
      budgetMin: won("최소 예산").nullable().refine((v) => v !== null, { message: "1인 최소 예산을 입력해주세요." }),
      budgetMax: won("최대 예산").nullable().refine((v) => v !== null, { message: "1인 최대 예산을 입력해주세요." }),
      disclose: z.object({ personalities: z.boolean(), intro: z.literal(true), bio: z.boolean() }),
      confirmed: z.literal(true, { message: "공개할 소개 내용을 확인하고 체크해주세요." }),
    })
    .refine((v) => v.budgetMin === null || v.budgetMax === null || v.budgetMin <= v.budgetMax, {
      path: ["budgetMax"],
      message: "최대 예산은 최소 예산보다 크거나 같아야 해요.",
    });
}

export type StepKey = 1 | 2 | 3 | 4; // 4 = 제출 전 확인
export type FieldErrors = Partial<Record<string, string>>;

function toErrors(result: { success: boolean; error?: z.ZodError }): FieldErrors {
  if (result.success || !result.error) return {};
  const out: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "_form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export function validateStep(step: StepKey, draft: ApplicationDraft, now: Date = new Date()): FieldErrors {
  switch (step) {
    case 1: return toErrors(step1Schema.safeParse(draft));
    case 2: return toErrors(step2Schema.safeParse(draft));
    case 3: return toErrors(step3Schema.safeParse(draft));
    case 4: return toErrors(confirmSchema(now).safeParse(draft));
  }
}

/** 처음으로 통과하지 못한 단계. 모두 통과하면 null */
export function firstInvalidStep(draft: ApplicationDraft, now: Date = new Date()): StepKey | null {
  for (const s of [1, 2, 3, 4] as const) {
    if (Object.keys(validateStep(s, draft, now)).length > 0) return s;
  }
  return null;
}

/** 제출 시 서버(현재는 데모 저장소)가 다시 검증하는 전체 스키마 */
export function parseSubmission(draft: ApplicationDraft, now: Date = new Date()) {
  const errors: FieldErrors = {};
  for (const s of [1, 2, 3, 4] as const) Object.assign(errors, validateStep(s, draft, now));
  if (Object.keys(errors).length > 0) return { ok: false as const, errors };
  return {
    ok: true as const,
    value: {
      ...step1Schema.parse(draft),
      ...step2Schema.parse(draft),
      ...step3Schema.parse(draft),
      ...confirmSchema(now).parse(draft),
    },
  };
}

export type SubmittedApplication = Extract<ReturnType<typeof parseSubmission>, { ok: true }>["value"];
