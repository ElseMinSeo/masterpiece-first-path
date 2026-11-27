// ⚠️ 개발용 가상 데이터입니다. 실제 상호·사진·평점이 아니며 출시 전에 운영 데이터로 교체해야 합니다.
import type { Cuisine, Place, PlaceCategory } from "@/lib/types";

export const CATEGORY_LABEL: Record<PlaceCategory, string> = {
  restaurant: "맛집", cafe: "카페", fine: "고급", bar: "바", mood: "분위기",
};
export const CATEGORIES = Object.keys(CATEGORY_LABEL) as PlaceCategory[];

export const CUISINE_LABEL: Record<Cuisine, string> = {
  korean: "한식", western: "양식", japanese: "일식", chinese: "중식", etc: "기타",
};
export const CUISINE_FILTERS: Cuisine[] = ["korean", "western", "japanese", "chinese"];

export const NOISE_LABEL = { quiet: "조용함", moderate: "보통", lively: "활기참" } as const;

const CHECKED = "2026-11-20";

export const DEV_PLACES: Place[] = [
  {
    id: "dev-001", name: "모래정원 키친", category: "restaurant", cuisine: "western",
    subtitle: "양식 · 파스타", district: "성수동", station: "성수",
    address: "서울 성동구 가상로 101 (개발용 주소)",
    summary: "창가 2인석이 많은 파스타집이에요. (가상 장소)",
    description: "개발용 설명입니다. 첫 만남에 대화하기 좋은 2인 테이블 위주의 가상 매장으로, 실제 매장 정보가 아닙니다.",
    keywords: ["창가석", "2인석", "대화하기 좋은"], hoursText: "11:30 ~ 21:30 (15~17시 브레이크)",
    priceMinKrw: 18000, priceMaxKrw: 32000, noise: "moderate", seating: "2인 테이블 8개",
    facilities: ["와이파이", "예약", "화장실 구분"], menu: [
      { name: "토마토 바질 파스타", priceKrw: 18000 }, { name: "버섯 크림 리조또", priceKrw: 21000 }, { name: "그릴 채소 샐러드", priceKrw: 14000 },
    ], checkedAt: CHECKED, tone: "#F6D6C8",
  },
  {
    id: "dev-002", name: "느린오후 커피", category: "cafe", cuisine: "etc",
    subtitle: "카페 · 디저트", district: "성수동", station: "뚝섬",
    address: "서울 성동구 가상로 22 (개발용 주소)",
    summary: "음악이 작게 흐르는 조용한 카페예요. (가상 장소)",
    description: "개발용 설명입니다. 좌석 간격이 넓은 가상 카페입니다.",
    keywords: ["조용한", "디저트", "좌석 간격 넓음"], hoursText: "10:00 ~ 22:00",
    priceMinKrw: 6000, priceMaxKrw: 12000, noise: "quiet", seating: "2~4인석 12개",
    facilities: ["와이파이", "콘센트", "화장실 구분"], menu: [
      { name: "핸드드립", priceKrw: 7000 }, { name: "바스크 치즈케이크", priceKrw: 7500 },
    ], checkedAt: CHECKED, tone: "#E9DCC9",
  },
  {
    id: "dev-003", name: "소담 한상", category: "restaurant", cuisine: "korean",
    subtitle: "한식 · 정식", district: "서울숲", station: "서울숲",
    address: "서울 성동구 가상숲길 7 (개발용 주소)",
    summary: "1인 한상 차림이라 부담 없는 한식집이에요. (가상 장소)",
    description: "개발용 설명입니다. 반상 차림 가상 매장입니다.",
    keywords: ["정갈한", "1인 한상", "주차 가능"], hoursText: "11:00 ~ 21:00",
    priceMinKrw: 15000, priceMaxKrw: 25000, noise: "quiet", seating: "2인 좌식·입식 혼합",
    facilities: ["주차", "예약", "단체석"], menu: [
      { name: "제철 한상", priceKrw: 19000 }, { name: "보리굴비 정식", priceKrw: 25000 },
    ], checkedAt: CHECKED, tone: "#DCE6D2",
  },
  {
    id: "dev-004", name: "스시 하루", category: "restaurant", cuisine: "japanese",
    subtitle: "일식 · 스시", district: "성수동", station: "성수",
    address: "서울 성동구 가상로 55 (개발용 주소)",
    summary: "바 좌석에서 나란히 앉는 스시집이에요. (가상 장소)",
    description: "개발용 설명입니다. 나란히 앉는 바 좌석 가상 매장입니다.",
    keywords: ["바 좌석", "런치 코스"], hoursText: "12:00 ~ 22:00 (15~18시 브레이크)",
    priceMinKrw: 30000, priceMaxKrw: 60000, noise: "quiet", seating: "바 좌석 10석",
    facilities: ["예약", "콜키지"], menu: [
      { name: "런치 스시 세트", priceKrw: 30000 }, { name: "디너 오마카세", priceKrw: 60000 },
    ], checkedAt: CHECKED, tone: "#F3E3D3",
  },
  {
    id: "dev-005", name: "홍등 반점", category: "restaurant", cuisine: "chinese",
    subtitle: "중식 · 딤섬", district: "왕십리", station: "왕십리",
    address: "서울 성동구 가상대로 300 (개발용 주소)",
    summary: "딤섬을 나눠 먹기 좋은 중식당이에요. (가상 장소)",
    description: "개발용 설명입니다. 딤섬 위주 가상 매장입니다.",
    keywords: ["딤섬", "나눠먹기"], hoursText: "11:30 ~ 22:00",
    priceMinKrw: 12000, priceMaxKrw: 28000, noise: "lively", seating: "4인 테이블 위주",
    facilities: ["단체석", "주차"], menu: [
      { name: "새우 하가우", priceKrw: 9000 }, { name: "마파두부 덮밥", priceKrw: 12000 },
    ], checkedAt: CHECKED, tone: "#F2D0CC",
  },
  {
    id: "dev-006", name: "라운지 미드나잇", category: "bar", cuisine: "etc",
    subtitle: "바 · 칵테일", district: "건대입구", station: "건대입구",
    address: "서울 광진구 가상로 88 (개발용 주소)",
    summary: "논알콜 칵테일도 있는 조용한 바예요. (가상 장소)",
    description: "개발용 설명입니다. 저조도 조명의 가상 바입니다.",
    keywords: ["논알콜", "칵테일", "저조도"], hoursText: "18:00 ~ 01:00",
    priceMinKrw: 14000, priceMaxKrw: 22000, noise: "moderate", seating: "바 좌석·2인 소파석",
    facilities: ["예약", "화장실 구분"], menu: [
      { name: "시그니처 칵테일", priceKrw: 16000 }, { name: "논알콜 하이볼", priceKrw: 12000 },
    ], checkedAt: CHECKED, tone: "#D9D2E9",
  },
  {
    id: "dev-007", name: "테라스 1987", category: "mood", cuisine: "western",
    subtitle: "분위기 · 브런치", district: "서울숲", station: "서울숲",
    address: "서울 성동구 가상숲길 19 (개발용 주소)",
    summary: "숲이 보이는 테라스 브런치 카페예요. (가상 장소)",
    description: "개발용 설명입니다. 테라스석이 있는 가상 매장입니다.",
    keywords: ["테라스", "브런치", "뷰"], hoursText: "09:00 ~ 20:00",
    priceMinKrw: 16000, priceMaxKrw: 26000, noise: "moderate", seating: "실내 2인석·테라스 6석",
    facilities: ["와이파이", "반려동물 동반"], menu: [
      { name: "에그 베네딕트", priceKrw: 17000 }, { name: "리코타 샐러드", priceKrw: 15000 },
    ], checkedAt: CHECKED, tone: "#D3E4EC",
  },
  {
    id: "dev-008", name: "다이닝 결", category: "fine", cuisine: "western",
    subtitle: "고급 · 코스", district: "성수동", station: "뚝섬",
    address: "서울 성동구 가상로 140 (개발용 주소)",
    summary: "작은 룸이 있는 코스 다이닝이에요. (가상 장소)",
    description: "개발용 설명입니다. 예약제 코스 가상 매장입니다.",
    keywords: ["코스", "룸", "기념일"], hoursText: "18:00 ~ 22:00 (예약제)",
    priceMinKrw: 65000, priceMaxKrw: 95000, noise: "quiet", seating: "2인 룸 3개",
    facilities: ["예약", "주차", "콜키지"], menu: [
      { name: "디너 코스", priceKrw: 85000 },
    ], checkedAt: CHECKED, tone: "#E7D8D0",
  },
];

export interface PlaceFilter {
  category?: PlaceCategory | "all";
  cuisine?: Cuisine | "all";
  station?: string | "all";
}

export function filterPlaces(places: Place[], f: PlaceFilter): Place[] {
  return places.filter(
    (p) =>
      (!f.category || f.category === "all" || p.category === f.category) &&
      (!f.cuisine || f.cuisine === "all" || p.cuisine === f.cuisine) &&
      (!f.station || f.station === "all" || p.station === f.station),
  );
}

export function getPlace(id: string): Place | undefined {
  return DEV_PLACES.find((p) => p.id === id);
}

export const PLACE_STATIONS = Array.from(new Set(DEV_PLACES.map((p) => p.station)));

export function formatKrw(n: number): string {
  return `${n.toLocaleString("ko-KR")}원`;
}
