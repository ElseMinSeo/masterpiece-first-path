"use client";

import { useRouter } from "next/navigation";
import { ApplyShell, StepActions, useStepValidation } from "@/components/apply-shell";
import { Field, OptionCard, TagGroup, TextArea, TextInput } from "@/components/form";
import { BIO_MAX, CONTACT_STYLES, INTRO_MAX, PERSONALITIES } from "@/lib/apply/options";
import type { ApplicationDraft } from "@/lib/apply/schema";
import { useApp } from "@/lib/store";

function Step1({ draft }: { draft: ApplicationDraft }) {
  const { updateDraft } = useApp();
  const router = useRouter();
  const { errors, valid, attempt } = useStepValidation(1, draft);
  const toggle = (v: string) =>
    updateDraft({ contactStyles: draft.contactStyles.includes(v) ? draft.contactStyles.filter((x) => x !== v) : [...draft.contactStyles, v] });

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (attempt()) router.push("/apply/2"); }} noValidate>
      <Field id="personalities" as="fieldset" label="나의 성격" hint="복수선택" error={errors.personalities}>
        <TagGroup label="나의 성격" options={PERSONALITIES} value={draft.personalities} onChange={(v) => updateDraft({ personalities: v })} />
      </Field>
      <Field id="contactStyles" as="fieldset" label="연락 스타일" hint="복수선택" error={errors.contactStyles}>
        <div className="flex gap-2">
          {CONTACT_STYLES.map((c) => (
            <OptionCard key={c} selected={draft.contactStyles.includes(c)} onClick={() => toggle(c)}>{c}</OptionCard>
          ))}
        </div>
      </Field>
      <Field id="intro" label="한 줄 소개" hint="필수" error={errors.intro}>
        <TextInput id="intro-input" label="한 줄 소개" value={draft.intro} maxLength={INTRO_MAX}
          placeholder="예: 조용한 카페 데이트를 좋아해요!" invalid={!!errors.intro}
          onChange={(v) => updateDraft({ intro: v })} />
        <p className="mt-1 text-right text-[12px] text-muted">{draft.intro.trim().length}/{INTRO_MAX}</p>
      </Field>
      <Field id="bio" label="상세 소개" hint="선택" hintTone="muted" error={errors.bio}>
        <TextArea id="bio-input" label="상세 소개" value={draft.bio} maxLength={BIO_MAX}
          placeholder="더 자세한 이야기를 들려주세요." invalid={!!errors.bio}
          onChange={(v) => updateDraft({ bio: v })} />
      </Field>
      <StepActions valid={valid} onNext={() => { if (attempt()) router.push("/apply/2"); }} />
    </form>
  );
}

export default function Step1Page() {
  return <ApplyShell step={1} title="나를 조금 더 소개해볼까요?">{(d) => <Step1 draft={d} />}</ApplyShell>;
}
