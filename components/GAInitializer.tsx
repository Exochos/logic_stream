"use client";

import { useEffect } from "react";
import { initializeGA, logPageView } from "@/lib/utils/googleAnalytics";
import { usePathname, useSearchParams } from "next/navigation";

export default function GAInitializer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    // Track page view on route change
    const path = `${pathname}?${searchParams.toString()}`;
    logPageView(path);
  }, [pathname, searchParams]);

  return null;
}
