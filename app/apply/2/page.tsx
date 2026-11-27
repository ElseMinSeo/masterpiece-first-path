"use client";

import { useRouter } from "next/navigation";
import { ApplyShell, StepActions, useStepValidation } from "@/components/apply-shell";
import { Field, SegmentGroup, TagGroup } from "@/components/form";
import { AVOID_PLACES, FOODS, HOBBIES, MOODS, PREFERRED_PLACES, SMOKING } from "@/lib/apply/options";
import type { ApplicationDraft } from "@/lib/apply/schema";
import { useApp } from "@/lib/store";

function Step2({ draft }: { draft: ApplicationDraft }) {
  const { updateDraft } = useApp();
  const router = useRouter();
  const { errors, valid, attempt } = useStepValidation(2, draft);
  return (
    <div>
      <Field id="hobbies" as="fieldset" label="취미" hint="복수선택" error={errors.hobbies}>
        <TagGroup label="취미" options={HOBBIES} value={draft.hobbies} onChange={(v) => updateDraft({ hobbies: v })} />
      </Field>
      <Field id="preferredPlaces" as="fieldset" label="선호 장소" hint="복수선택" error={errors.preferredPlaces}>
        <TagGroup label="선호 장소" options={PREFERRED_PLACES} value={draft.preferredPlaces} onChange={(v) => updateDraft({ preferredPlaces: v })} />
      </Field>
      <Field id="moods" as="fieldset" label="선호하는 분위기" hint="복수선택" error={errors.moods}>
        <TagGroup label="선호하는 분위기" options={MOODS} value={draft.moods} onChange={(v) => updateDraft({ moods: v })} />
      </Field>
      <Field id="foods" as="fieldset" label="좋아하는 음식" hint="복수선택" error={errors.foods}>
        <TagGroup label="좋아하는 음식" options={FOODS} value={draft.foods} onChange={(v) => updateDraft({ foods: v })} />
      </Field>
      <Field id="avoidPlaces" as="fieldset" label="피하고 싶은 장소" hint="선택" hintTone="muted" error={errors.avoidPlaces}>
        <TagGroup label="피하고 싶은 장소" options={AVOID_PLACES} value={draft.avoidPlaces} onChange={(v) => updateDraft({ avoidPlaces: v })} />
      </Field>
      <Field id="smoking" as="fieldset" label="흡연 여부" hint="필수" error={errors.smoking}>
        <SegmentGroup label="흡연 여부" options={SMOKING} value={draft.smoking} onChange={(v) => updateDraft({ smoking: v })} />
      </Field>
      <StepActions valid={valid} onPrev={() => router.push("/apply/1")} onNext={() => { if (attempt()) router.push("/apply/3"); }} />
    </div>
  );
}

export default function Step2Page() {
  return (
    <ApplyShell step={2} title={"당신에게 어울리는\n설렘을 추천해드릴게요."} subtitle="매칭 신청을 위해 선호 정보를 선택해주세요.">
      {(d) => <Step2 draft={d} />}
    </ApplyShell>
  );
}
