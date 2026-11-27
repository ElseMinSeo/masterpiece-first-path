import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { filled?: boolean };
const base = (p: P) => ({
  width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true, ...p, filled: undefined,
});

export const HomeIcon = (p: P) => (<svg {...base(p)}><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" fill={p.filled ? "currentColor" : "none"} /></svg>);
export const PlaceIcon = (p: P) => (<svg {...base(p)}><rect x="6" y="3.5" width="13" height="15" rx="3" /><path d="M4 7v11a3 3 0 0 0 3 3h9" /><path d="M12.5 13.5s-3-1.8-3-3.6a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.8-3 3.6-3 3.6Z" fill={p.filled ? "currentColor" : "none"} /></svg>);
export const CalendarIcon = (p: P) => (<svg {...base(p)}><rect x="4" y="5" width="16" height="15" rx="2.5" fill={p.filled ? "currentColor" : "none"} /><path d="M8 3v4M16 3v4M4 10h16" stroke={p.filled ? "white" : "currentColor"} /></svg>);
export const BookmarkIcon = (p: P) => (<svg {...base(p)}><path d="M6 4h12v17l-6-4-6 4z" fill={p.filled ? "currentColor" : "none"} /></svg>);
export const UserIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="8" r="4" fill={p.filled ? "currentColor" : "none"} /><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z" fill={p.filled ? "currentColor" : "none"} /></svg>);
export const BackIcon = (p: P) => (<svg {...base(p)}><path d="m15 5-7 7 7 7" /></svg>);
export const ClockIcon = (p: P) => (<svg {...base(p)} width={14} height={14}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const PinIcon = (p: P) => (<svg {...base(p)} width={14} height={14}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const FilterIcon = (p: P) => (<svg {...base(p)} width={20} height={20}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>);
export const FlameIcon = (p: P) => (<svg {...base(p)}><path d="M12 21c-4 0-6.5-2.7-6.5-6.3 0-4.2 4-6.4 4.5-10.7 2.5 1.6 4 4.2 4 6.5 1-.6 1.6-1.7 1.8-2.8 1.7 1.7 2.7 4 2.7 6.4C18.5 18.4 16 21 12 21Z" fill={p.filled ? "currentColor" : "none"} /></svg>);
export const ShareIcon = (p: P) => (<svg {...base(p)} width={20} height={20}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></svg>);
export const CopyIcon = (p: P) => (<svg {...base(p)} width={16} height={16}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base(p)} width={16} height={16}><path d="m5 12 5 5 9-10" /></svg>);
export const ForkIcon = (p: P) => (<svg {...base(p)}><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 21V3c-2 1.5-3 4-3 7h3" /></svg>);
export const CupIcon = (p: P) => (<svg {...base(p)}><path d="M4 10h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3" /></svg>);
export const GemIcon = (p: P) => (<svg {...base(p)}><path d="M6 4h12l3 5-9 11L3 9zM3 9h18M9 4l3 16 3-16" /></svg>);
export const GlassIcon = (p: P) => (<svg {...base(p)}><path d="M8 3h8l-.5 6a3.5 3.5 0 0 1-7 0zM12 12.5V21M9 21h6" /></svg>);
export const SparkleIcon = (p: P) => (<svg {...base(p)}><path d="M11 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7ZM18 15c.3 1.7 1 2.4 2.7 2.7-1.7.3-2.4 1-2.7 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1 2.7-2.7Z" /></svg>);
