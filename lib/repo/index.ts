import { LocalDemoRepository, type KeyValueStore } from "./local";
import type { AppRepository } from "./types";

const memory = new Map<string, string>();
const memoryStore: KeyValueStore = {
  getItem: (k) => memory.get(k) ?? null,
  setItem: (k, v) => void memory.set(k, v),
  removeItem: (k) => void memory.delete(k),
};

function browserStore(): KeyValueStore {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const t = "__cheotgil_probe__";
      window.localStorage.setItem(t, "1");
      window.localStorage.removeItem(t);
      return window.localStorage;
    }
  } catch {
    // 사파리 개인정보 보호 모드 등: 메모리로 대체 (새로고침 시 사라짐)
  }
  return memoryStore;
}

let instance: AppRepository | null = null;

/** 단계 2에서 NEXT_PUBLIC_DATA_SOURCE=supabase 분기를 추가해 교체한다. */
export function getRepository(): AppRepository {
  if (!instance) instance = new LocalDemoRepository(browserStore());
  return instance;
}

export type { AppRepository, Application, SubmitResult } from "./types";
