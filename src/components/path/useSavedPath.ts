"use client";

import { useMemo, useSyncExternalStore } from "react";
import { parseStudentPath, StudentPath } from "@/lib/studentPath";

const KEY = "netcentral.student-path.v1";
const EVENT = "netcentral:path-saved";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}
function snapshot() {
  try { return window.localStorage.getItem(KEY); } catch { return null; }
}
const serverSnapshot = () => null;

export function useSavedPath() {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return useMemo(() => parseStudentPath(raw), [raw]);
}

export function saveStudentPath(path: StudentPath) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(path));
    window.dispatchEvent(new Event(EVENT));
    return true;
  } catch { return false; }
}
