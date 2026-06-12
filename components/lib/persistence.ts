import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export function loadState<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem('noorish_' + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveState<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('noorish_' + key, JSON.stringify(value));
  } catch {
    // ignore quota / privacy errors
  }
}

export function usePersistedState<T>(
  key: string,
  fallback: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => loadState(key, fallback));
  useEffect(() => {
    saveState(key, value);
  }, [key, value]);
  return [value, setValue];
}
