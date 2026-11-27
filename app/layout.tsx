import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { AppProvider } from "@/lib/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "첫, 길",
  description: "운영자가 소개하고, 두 사람이 시간과 장소를 고르는 첫 만남 서비스 (개발 버전)",
  // 개발 데모 단계: 검색 결과에 노출하지 않음. 정식 출시 때 제거 (docs/decisions/0003)
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ef5fb4",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <AppProvider>
          <div className="mx-auto min-h-dvh max-w-[430px] overflow-x-clip bg-[var(--bg)] pb-[calc(4rem+env(safe-area-inset-bottom)+16px)] shadow-sm">
            {children}
          </div>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
