"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-7G1X0Z2Y54", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
