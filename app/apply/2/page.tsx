"use client";

import { useRouter } from "next/navigation";
import { ApplyShell, StepActions, useStepValidation } from "@/components/apply-shell";
import { Field, TagGroup } from "@/components/form";
import { AVOID_PLACES, DATE_STYLES, FOODS, MOODS } from "@/lib/apply/options";
import type { ApplicationDraft } from "@/lib/apply/schema";
import { useApp } from "@/lib/store";

function Step2({ draft }: { draft: ApplicationDraft }) {
  const { updateDraft } = useApp();
  const router = useRouter();
  const { errors, valid, attempt } = useStepValidation(2, draft);
  return (
    <div>
      <Field id="moods" as="fieldset" label="선호하는 분위기" hint="복수선택" error={errors.moods}>
        <TagGroup label="선호하는 분위기" options={MOODS} value={draft.moods} onChange={(v) => updateDraft({ moods: v })} />
      </Field>
      <Field id="foods" as="fieldset" label="좋아하는 음식" hint="복수선택" error={errors.foods}>
        <TagGroup label="좋아하는 음식" options={FOODS} value={draft.foods} onChange={(v) => updateDraft({ foods: v })} />
      </Field>
      <Field id="dateStyles" as="fieldset" label="데이트 스타일" hint="복수선택" error={errors.dateStyles}>
        <TagGroup label="데이트 스타일" options={DATE_STYLES} value={draft.dateStyles} onChange={(v) => updateDraft({ dateStyles: v })} />
      </Field>
      <Field id="avoidPlaces" as="fieldset" label="피하고 싶은 장소" hint="선택" hintTone="muted" error={errors.avoidPlaces}>
        <TagGroup label="피하고 싶은 장소" options={AVOID_PLACES} value={draft.avoidPlaces} onChange={(v) => updateDraft({ avoidPlaces: v })} />
      </Field>
      <StepActions valid={valid} onPrev={() => router.push("/apply/1")} onNext={() => { if (attempt()) router.push("/apply/3"); }} />
    </div>
  );
}

export default function Step2Page() {
  return <ApplyShell step={2} title="어떤 데이트를 좋아하나요?">{(d) => <Step2 draft={d} />}</ApplyShell>;
}
