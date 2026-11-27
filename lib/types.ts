export type PlaceCategory = "restaurant" | "cafe" | "fine" | "bar" | "mood";
export type Cuisine = "korean" | "western" | "japanese" | "chinese" | "etc";
export type NoiseLevel = "quiet" | "moderate" | "lively";

export interface MenuItem {
  name: string;
  description: string;
  priceKrw: number;
}

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  cuisine: Cuisine;
  subtitle: string; // 예: "양식 · 파스타"
  district: string; // 동네
  station: string; // 가까운 역
  address: string;
  summary: string;
  description: string;
  keywords: string[];
  hoursText: string;
  priceMinKrw: number;
  priceMaxKrw: number;
  noise: NoiseLevel;
  seating: string;
  facilities: string[];
  menu: MenuItem[];
  checkedAt: string; // YYYY-MM-DD, 정보 확인일
  tone: string; // 사진 대신 쓰는 플레이스홀더 색
}

export interface DailyPost {
  id: string;
  title: string;
  body: string;
  placeId: string;
  category: PlaceCategory;
  publishedAt: string; // YYYY-MM-DD
}

export interface Profile {
  nickname: string;
}

export type ApplicationStatus =
  | "submitted" // 운영자 검토 대기
  | "reviewing"
  | "offered"
  | "closed"
  | "withdrawn";
