"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TrackHistory() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fullUrl = window.location.href;

    const history = JSON.parse(sessionStorage.getItem("history") || "[]");
    const last = history[history.length - 1];

    // Só salva se a URL for diferente da última
    if (last !== fullUrl) {
      history.push(fullUrl);
      sessionStorage.setItem("history", JSON.stringify(history));
    }

    // console.log(sessionStorage.getItem("history"));
  }, [pathname]); // pathname continua sendo o gatilho

  return null;
}