import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { onScrollFrame } from "../lib/scrollFrame";

const positions = new Map<string, number>();
const storageKey = "starter:scroll-positions";
const maxEntries = 50;

try {
  const stored = sessionStorage.getItem(storageKey);
  if (stored) {
    for (const [key, value] of Object.entries(
      JSON.parse(stored) as Record<string, number>,
    )) {
      positions.set(key, Number(value));
    }
  }
} catch {
  // In-memory restoration still works when sessionStorage is unavailable.
}

function persist() {
  try {
    while (positions.size > maxEntries) {
      const oldest = positions.keys().next().value;
      if (oldest === undefined) break;
      positions.delete(oldest);
    }
    sessionStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(positions)));
  } catch {
    // Ignore quota and privacy-mode failures.
  }
}

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const activeKey = useRef(key);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onScrollFrame(() => {
      positions.set(activeKey.current, window.scrollY);
    });
    window.addEventListener("beforeunload", persist);
    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", persist);
      persist();
    };
  }, []);

  useLayoutEffect(() => {
    activeKey.current = key;

    if (hash) {
      const target = document.querySelector<HTMLElement>(hash);
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }

    if (navigationType === "POP" && positions.has(key)) {
      const savedPosition = positions.get(key)!;
      window.scrollTo(0, savedPosition);

      let frame = 0;
      let cancelled = false;
      const startedAt = performance.now();
      const budgetMs = 1200;
      const cancel = () => {
        cancelled = true;
      };
      const restore = () => {
        if (cancelled) return;
        const maximum = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const target = Math.min(savedPosition, maximum);
        if (Math.abs(window.scrollY - target) > 2) window.scrollTo(0, target);
        if (maximum < savedPosition - 2 && performance.now() - startedAt < budgetMs) {
          frame = window.requestAnimationFrame(restore);
        }
      };

      frame = window.requestAnimationFrame(restore);
      window.addEventListener("wheel", cancel, { passive: true });
      window.addEventListener("touchstart", cancel, { passive: true });
      window.addEventListener("keydown", cancel);
      persist();

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("wheel", cancel);
        window.removeEventListener("touchstart", cancel);
        window.removeEventListener("keydown", cancel);
      };
    }

    window.scrollTo(0, 0);
    persist();
  }, [hash, key, navigationType, pathname]);

  return null;
}
