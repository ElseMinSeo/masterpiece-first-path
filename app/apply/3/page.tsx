"use client";

import { useRouter } from "next/navigation";
import { AgeRange } from "@/components/age-range";
import { ApplyShell, StepActions, useStepValidation } from "@/components/apply-shell";
import { Field, OptionCard, TagGroup } from "@/components/form";
import { PERSONALITIES, TEMPOS } from "@/lib/apply/options";
import type { ApplicationDraft } from "@/lib/apply/schema";
import { useApp } from "@/lib/store";

function Step3({ draft }: { draft: ApplicationDraft }) {
  const { updateDraft } = useApp();
  const router = useRouter();
  const { errors, valid, attempt } = useStepValidation(3, draft);
  return (
    <div>
      <Field id="ageMin" label="선호 나이 범위" hint="필수" error={errors.ageMin ?? errors.ageMax}>
        <AgeRange min={draft.ageMin} max={draft.ageMax} onChange={(ageMin, ageMax) => updateDraft({ ageMin, ageMax })} />
        <p className="mt-1 text-[12px] text-muted">성인 대상 서비스로 만 20세부터 고를 수 있어요.</p>
      </Field>
      <Field id="partnerPersonalities" as="fieldset" label="선호하는 성격" hint="복수선택" error={errors.partnerPersonalities}>
        <TagGroup label="선호하는 성격" options={PERSONALITIES} value={draft.partnerPersonalities}
          onChange={(v) => updateDraft({ partnerPersonalities: v })} />
      </Field>
      <Field id="tempo" as="fieldset" label="만남 템포" hint="선택" hintTone="muted" error={errors.tempo}>
        <div className="flex gap-2" role="radiogroup" aria-label="만남 템포">
          {TEMPOS.map((t) => (
            <OptionCard key={t} role="radio" selected={draft.tempo === t}
              onClick={() => updateDraft({ tempo: draft.tempo === t ? "" : t })}>{t}</OptionCard>
          ))}
        </div>
      </Field>
      <StepActions valid={valid} onPrev={() => router.push("/apply/2")} onNext={() => { if (attempt()) router.push("/apply/confirm"); }} />
    </div>
  );
}

export default function Step3Page() {
  return <ApplyShell step={3} title="어떤 사람을 만나고 싶나요?">{(d) => <Step3 draft={d} />}</ApplyShell>;
}
