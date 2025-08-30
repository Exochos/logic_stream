// app/(login)/sign-in/page.tsx (Server Component)
import { Suspense } from "react";
import LoginClient from "../login-client";

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <LoginClient mode="signin" />
    </Suspense>
  );
}
