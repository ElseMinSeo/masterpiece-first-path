"use client";

import { useRouter } from "next/navigation";
import { ApplyShell, StepActions, useStepValidation } from "@/components/apply-shell";
import { Field, SegmentGroup, TextArea, TextInput } from "@/components/form";
import { cx } from "@/components/ui";
import { BIO_MAX, GENDERS, NICKNAME_MAX } from "@/lib/apply/options";
import { birthYearOptions, type ApplicationDraft } from "@/lib/apply/schema";
import { useApp } from "@/lib/store";

function Step1({ draft }: { draft: ApplicationDraft }) {
  const { updateDraft } = useApp();
  const router = useRouter();
  const { errors, valid, attempt } = useStepValidation(1, draft);
  const next = () => { if (attempt()) router.push("/apply/2"); };
  return (
    <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
      <Field id="nickname" label="닉네임" hint="필수" error={errors.nickname}>
        <TextInput id="nickname-input" label="닉네임" value={draft.nickname} maxLength={NICKNAME_MAX}
          placeholder="상대에게 보여줄 이름을 입력해주세요" invalid={!!errors.nickname}
          onChange={(v) => updateDraft({ nickname: v })} />
        <p className="mt-1 text-[12px] text-muted">실명은 받지 않아요. 소개할 때 이 닉네임으로 불러드려요.</p>
      </Field>

      <Field id="birthYear" label="태어난 연도" hint="필수" error={errors.birthYear}>
        <div className="relative">
          <select
            id="birth-year" aria-label="태어난 연도" aria-invalid={!!errors.birthYear || undefined}
            value={draft.birthYear ?? ""}
            onChange={(e) => updateDraft({ birthYear: e.target.value === "" ? null : Number(e.target.value) })}
            className={cx(
              "h-13 w-full appearance-none rounded-xl bg-field px-4 pr-10 text-[16px] outline-none focus:ring-2 focus:ring-brand/40",
              draft.birthYear === null && "text-muted",
              errors.birthYear && "ring-2 ring-red-400",
            )}
          >
            <option value="">연도를 선택해주세요</option>
            {birthYearOptions().map((y) => <option key={y} value={y}>{y}년</option>)}
          </select>
          <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/50">⌄</span>
        </div>
        <p className="mt-1 text-[12px] text-muted">직접 입력한 값이에요. 성인·본인 확인은 다음 단계에서 따로 진행해요.</p>
      </Field>

      <Field id="gender" as="fieldset" label="성별" hint="필수" error={errors.gender}>
        <SegmentGroup label="성별" options={GENDERS} value={draft.gender} onChange={(v) => updateDraft({ gender: v })} />
      </Field>

      <Field id="bio" label="자기소개" hint="선택" hintTone="muted" error={errors.bio}>
        <TextArea id="bio-input" label="자기소개" value={draft.bio} maxLength={BIO_MAX}
          placeholder="간단한 소개를 작성해주세요" invalid={!!errors.bio}
          onChange={(v) => updateDraft({ bio: v })} />
      </Field>

      <StepActions valid={valid} onNext={next} />
    </form>
  );
}

export default function Step1Page() {
  return (
    <ApplyShell step={1} title={"당신에게 어울리는\n설렘을 추천해드릴게요."} subtitle="매칭 신청을 위해 기본 정보를 입력해주세요.">
      {(d) => <Step1 draft={d} />}
    </ApplyShell>
  );
}
