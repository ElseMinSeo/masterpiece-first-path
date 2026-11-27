"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { BackIcon } from "./icons";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** 상단 바: 뒤로가기 · 제목 · 우측 액션 (시안 공통 헤더) */
export function TopBar({ title, back = true, right }: { title: string; back?: boolean | string; right?: ReactNode }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-20 grid h-14 grid-cols-[48px_1fr_auto] items-center bg-[var(--bg)]/95 px-2 backdrop-blur">
      {back ? (
        <button
          type="button"
          aria-label="뒤로 가기"
          className="grid size-11 place-items-center rounded-full text-ink"
          onClick={() => (typeof back === "string" ? router.push(back) : window.history.length > 1 ? router.back() : router.push("/home"))}
        >
          <BackIcon />
        </button>
      ) : <span />}
      <h1 className="truncate text-center text-[17px] font-bold">{title}</h1>
      <div className="flex min-w-[48px] justify-end gap-1 pr-1">{right}</div>
    </header>
  );
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "white"; block?: boolean };
export function Button({ variant = "primary", block, className, ...rest }: BtnProps) {
  return (
    <button
      {...rest}
      className={cx(
        "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-[16px] font-semibold transition-colors disabled:cursor-not-allowed",
        variant === "primary" && "bg-brand text-white active:bg-brand-dark disabled:bg-line disabled:text-muted",
        variant === "outline" && "border border-line bg-white text-ink active:bg-gray-50",
        variant === "ghost" && "text-ink",
        variant === "white" && "bg-white text-brand-ink shadow-sm",
        block && "w-full",
        className,
      )}
    />
  );
}

export function LinkButton({ href, children, variant = "primary", className }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "white"; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-[16px] font-semibold",
        variant === "primary" && "bg-brand text-white",
        variant === "outline" && "border border-line bg-white text-ink",
        variant === "white" && "bg-white text-brand-ink shadow-sm",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** 카드 컨테이너 */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-2xl border border-line bg-white p-4", className)}>{children}</div>;
}

/** 개발용 데이터임을 알리는 배지 */
export function DevBadge({ children = "개발용 가상 데이터" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-amber-200">{children}</span>;
}

/** 빈 상태 */
export function EmptyState({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center gap-2 px-6 py-14 text-center">
      <p className="text-[16px] font-semibold">{title}</p>
      {body && <p className="text-[14px] leading-relaxed text-muted">{body}</p>}
      {action && <div className="mt-3 w-full max-w-[240px]">{action}</div>}
    </div>
  );
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-[17px] font-bold">{children}</h2>
      {right}
    </div>
  );
}

export function Loading() {
  return <p role="status" className="px-5 py-10 text-center text-[14px] text-muted">불러오는 중…</p>;
}

export function StatusBadge({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-[12px] font-semibold text-brand-ink">{children}</span>;
}
