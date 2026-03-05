"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const GINGER_CODE = "ginger";

export function GingerCodeListener() {
  const router = useRouter();
  const indexRef = useRef(0);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const expected = GINGER_CODE[indexRef.current];
      if (key === expected) {
        indexRef.current += 1;
        if (indexRef.current === GINGER_CODE.length) {
          indexRef.current = 0;
          router.push("/ginger");
        }
      } else {
        indexRef.current = 0;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
