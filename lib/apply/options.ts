// 신청서 선택지.
// 1·2단계는 새 Figma 시안(Matching1·2), 3·4단계는 시안 10·11, 제출 전 확인은 START.md 명세를 따른다.
// 시안의 '키워드' 자리 선택지(취미·선호 장소)는 임시안이다.

export const GENDERS = ["남성", "여성"] as const;
export const SMOKING = ["흡연", "비흡연"] as const;
export const HOBBIES = ["운동", "독서", "영화·드라마", "음악", "여행", "요리", "사진", "게임", "전시 관람"] as const;
export const PREFERRED_PLACES = ["맛집", "카페", "바", "전시·공연", "공원·산책", "팝업 스토어"] as const;
export const NICKNAME_MAX = 12;

export const PERSONALITIES = [
  "활발한", "조용한", "웃긴", "지적인", "엉뚱한", "어른스러운", "애교있는", "다정한", "솔직한",
] as const;

export const CONTACT_STYLES = ["자주", "적당히", "필요 시"] as const;

export const MOODS = ["조용한", "아늑한", "활기찬", "감성적인", "뷰가 좋은"] as const;
export const FOODS = ["한식", "양식", "일식", "중식", "카페·디저트", "와인·바"] as const;
export const AVOID_PLACES = ["시끄러운 곳", "좁은 좌석", "웨이팅 긴 곳", "술 위주 매장", "고가 매장"] as const;

export const TEMPOS = ["바로 가능", "일정 확인 후 결정"] as const;

// 파일럿 생활권 후보 역 (개발용 가정값, 운영 권역 확정 전)
export const STATIONS = ["성수", "뚝섬", "건대입구", "왕십리", "서울숲"] as const;

export const TIME_SLOTS = [
  { id: "weekday-evening", label: "평일 저녁 (19~21시)" },
  { id: "weekend-lunch", label: "주말 점심 (12~14시)" },
  { id: "weekend-afternoon", label: "주말 오후 (15~17시)" },
  { id: "weekend-evening", label: "주말 저녁 (18~20시)" },
] as const;

export const AGE_MIN = 20;
export const AGE_MAX = 45;
export const INTRO_MAX = 80;
export const BIO_MAX = 500;
export const MAX_STATIONS = 2;
export const MAX_TIME_SLOTS = 2;
export const MAX_DATES = 6;
export const BUDGET_MAX = 200_000;
export const PLAN_DAYS = 14;
