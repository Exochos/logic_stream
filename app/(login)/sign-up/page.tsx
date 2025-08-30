// app/(login)/sign-up/page.tsx (Server Component)
import { Suspense } from "react";
import LoginClient from "../login-client";

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <LoginClient mode="signup" />
    </Suspense>
  );
}
