import Link from "next/link";

export default function Landing() {
  return (
    <main className="brand-gradient fixed inset-0 z-40 mx-auto flex max-w-[430px] flex-col items-center justify-center px-8 text-center text-white">
      <p className="text-[15px] opacity-90">첫 만남까지 가는 길</p>
      <h1 className="mt-3 text-[56px] font-extrabold tracking-tight">첫, 길</h1>
      <p className="mt-4 text-[15px] leading-relaxed opacity-90">
        운영자가 직접 소개하고,<br />두 사람이 시간과 장소를 고르면 예약까지 도와드려요.
      </p>
      <Link href="/home" className="mt-12 inline-flex min-h-12 w-full max-w-[280px] items-center justify-center rounded-full bg-white text-[16px] font-semibold text-brand-ink">
        둘러보기
      </Link>
      <p className="mt-6 text-[12px] opacity-80">개발 버전 · 모든 인물과 장소는 가상 데이터입니다</p>
    </main>
  );
}
