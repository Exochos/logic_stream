// // app/(investor)/tools/page.tsx
import { Suspense } from "react";
import ToolsPageClient from "./investortools";
export default function Page() {
  return (
    <Suspense fallback={null}>
      <ToolsPageClient />
    </Suspense>
  );
}