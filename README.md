# 첫, 길 — 모바일 웹 MVP (단계 0~1)

운영자가 첫 만남을 소개하고, 두 사람이 시간과 장소를 고르면 예약까지 연결하는 서비스의 모바일 웹 MVP입니다.
현재는 **로컬 데모 단계**로, 외부 계정이나 API 키 없이 실행됩니다. 모든 인물·장소·글은 개발용 가상 데이터입니다.

> 이 저장소 루트의 `index.html`, `1~5.html` 등은 이전 정적 페이지로, Next.js 앱과 관계없이 그대로 두었습니다.

## 실행

```bash
npm install
npm run dev          # http://localhost:3000
```

| 명령 | 내용 |
|---|---|
| `npm run dev` | 개발 서버 (포트 3000) |
| `npm run build` / `npm start` | 프로덕션 빌드 / 실행 |
| `npm run typecheck` | TypeScript strict 타입 검사 |
| `npm test` | Vitest 단위 테스트 (검증 규칙·저장소·필터) |
| `npm run build && npm run test:e2e` | Playwright E2E (포트 3100에서 빌드본 실행, 320/375/430px 포함) |

## 스택

Next.js 16 App Router · React 19 · TypeScript strict · Tailwind CSS 4 · Zod 4 · Vitest · Playwright

## 구조

```
app/                 화면 (home, places, places/[id], daily, saved, appointments, profile, apply/1·2·3·confirm·done)
components/          재사용 UI: TopBar, BottomNav, Button, Card, TagChip/TagGroup, OptionCard, TextInput/TextArea,
                     StepIndicator, PlaceCard, BookmarkButton, ApplicationCard, AgeRange
lib/apply/           신청서 선택지, Zod 검증(단계별·제출 전체), 날짜 도우미
lib/data/            개발용 가상 장소·데일리 글 (출시 전 교체 대상)
lib/repo/            데이터 접근 계약(AppRepository)과 localStorage 데모 구현
lib/store.tsx        화면 전체가 공유하는 상태(저장 목록·초안·신청) — 목록/상세/프로필 저장 상태 일치
tests/unit, tests/e2e
docs/                시안 대비 차이와 다음 단계 메모
```

### 데이터 계층 교체 방법 (단계 2)

화면은 `getRepository()`가 돌려주는 `AppRepository`만 사용합니다. 단계 2에서 Supabase 구현을 추가하고
`lib/repo/index.ts`에서 `NEXT_PUBLIC_DATA_SOURCE`에 따라 고르도록 바꾸면 됩니다. 제출 검증(`parseSubmission`)은
서버 액션에서도 그대로 재사용할 수 있게 순수 함수로 분리했습니다.

### 중복 제출 방지

1. 버튼: 진행 중 플래그(ref)로 같은 틱의 연속 클릭을 차단
2. 저장소: 초안마다 `idempotencyKey`를 두고, 같은 키의 동시 요청은 하나의 Promise로 합치며 이미 만든 신청을 돌려줌
3. 저장소: 진행 중(`submitted/reviewing/offered`) 신청이 있으면 새 신청을 만들지 않음 (DB 단계에서 회차별 유일 제약으로 대체)

## 브라우저 저장소

`localStorage`의 `cheotgil.demo.v1.*` 키에 데모 데이터(닉네임·저장 목록·신청 초안·신청 내역)만 저장합니다.
프로필 화면의 **데모 데이터 초기화**로 지울 수 있습니다.
