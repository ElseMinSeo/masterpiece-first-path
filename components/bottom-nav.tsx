"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookmarkIcon, CalendarIcon, HomeIcon, PlaceIcon, UserIcon } from "./icons";
import { cx } from "./ui";

// 파일럿 제안 메뉴: 홈 · 장소 · 내 약속 · 저장 · 프로필 (데일리는 홈에서 진입)
const TABS = [
  { href: "/home", label: "홈", Icon: HomeIcon, match: ["/home", "/daily"] },
  { href: "/places", label: "장소", Icon: PlaceIcon, match: ["/places"] },
  { href: "/appointments", label: "내 약속", Icon: CalendarIcon, match: ["/appointments", "/apply"] },
  { href: "/saved", label: "저장", Icon: BookmarkIcon, match: ["/saved"] },
  { href: "/profile", label: "프로필", Icon: UserIcon, match: ["/profile"] },
];

export function BottomNav() {
  const path = usePathname();
  if (path === "/") return null;
  return (
    <nav
      aria-label="주요 메뉴"
      data-testid="bottom-nav"
      className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] border-t border-line bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {TABS.map(({ href, label, Icon, match }) => {
          const active = match.some((m) => path === m || path.startsWith(m + "/"));
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cx("flex h-16 flex-col items-center justify-center gap-1 text-[12px]", active ? "text-brand-ink" : "text-ink/80")}
              >
                <Icon filled={active} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
