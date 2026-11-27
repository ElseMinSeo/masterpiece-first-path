// ⚠️ 개발용 운영자 글(가상). 실제 사용자 계정·반응 수는 넣지 않는다.
import type { DailyPost } from "@/lib/types";

export const DEV_DAILY: DailyPost[] = [
  { id: "d-001", title: "첫 만남엔 조용한 창가석", body: "운영팀이 평일 저녁에 다녀온 기준으로, 대화 소리가 잘 들리는 창가 2인석을 골랐어요. (개발용 예시 글)", placeId: "dev-001", category: "restaurant", publishedAt: "2026-11-24" },
  { id: "d-002", title: "디저트 하나 나눠 먹기 좋은 카페", body: "좌석 간격이 넓어서 옆 테이블을 신경 쓰지 않아도 돼요. (개발용 예시 글)", placeId: "dev-002", category: "cafe", publishedAt: "2026-11-22" },
  { id: "d-003", title: "술 대신 논알콜로 가볍게", body: "논알콜 메뉴가 있어 부담 없이 2차로 이어가기 좋아요. (개발용 예시 글)", placeId: "dev-006", category: "bar", publishedAt: "2026-11-19" },
  { id: "d-004", title: "주말 낮, 숲이 보이는 테라스", body: "주말 점심 만남이라면 테라스 자리를 먼저 문의해보세요. (개발용 예시 글)", placeId: "dev-007", category: "mood", publishedAt: "2026-11-17" },
];
