# 0001. 기술 스택

- 날짜: 2026-11-27
- 상태: 결정됨

## 상황
첫, 길 모바일 웹 MVP를 만들 기술을 정해야 했습니다.

## 결정
Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Zod 4,
테스트는 Vitest(단위)와 Playwright(화면).

## 이유
- 모바일 웹 하나로 시작하고, 나중에 서버 기능(Supabase 연결, 서버 액션)을 같은 코드에 붙일 수 있습니다.
- 입력 검증(Zod)을 화면과 서버에서 함께 쓸 수 있습니다.
- 데이터 접근을 `lib/repo/`로 분리해, 데모(localStorage)에서 실제 DB로 바꿀 때 화면 코드를 고치지 않아도 됩니다.

## 결과
- 외부 키 없이 로컬에서 바로 실행할 수 있습니다.
- Next.js 최신 버전은 예전 방식과 다른 점이 있어, 작업 전에 `AGENTS.md`의 안내를 따라야 합니다.
