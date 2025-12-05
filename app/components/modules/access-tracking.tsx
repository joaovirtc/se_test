"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props {
  version?: "light" | "full";
}

const TrackingAccess = ({ version }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !version) return;

    // console.log("[TrackingAccess] Disparando evento:", {
    //   path: pathname,
    //   version,
    // });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "demo_suite_view",
      user_type_version: version,
      page_path: pathname,
    });
  }, [pathname, version]);

  return null;
};

export default TrackingAccess;
