// app/(personalfinance)/personalfinance/page.tsx
import { Suspense } from "react";
import PersonalFinancePageClient from "./personalfinance-client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PersonalFinancePageClient />
    </Suspense>
  );
}