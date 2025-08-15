"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleIcon, Loader2 } from "lucide-react";
import { signIn, signUp } from "./actions";
import { ActionState } from "@/lib/auth/middleware";
import logicStream from "@/lib/logicstream.json";
import logo from "@/lib/logo.png";
import googleLogo from "@/public/icons/google-icon-logo.svg";
import githubLogo from "@/public/icons/github-icon-logo.svg";

/**
 * Login component for handling user sign-in and sign-up.
 * It supports both modes and integrates with Google and GitHub for authentication.
 *
 * @param {Object} props - Component properties.
 * @param {"signin" | "signup"} [props.mode="signin"] - The mode of the login form.
 * @returns {JSX.Element} The rendered login form.
 */

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const inviteId = searchParams.get("inviteId");
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === "signin" ? signIn : signUp,
    { error: "" }
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12">
      <Card className="w-full max-w-md bg-linear-160 from-grey-50 to-sky-50 shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-black-200 text-xl font-bold">
            <Image
              src={logo}
              alt={logicStream.title}
              width={100}
              height={100}
              className="rounded-full mb-4"
            />
          </CardTitle>
          <h2 className="text-lg text-gray-900 font-medium">
            {mode === "signin"
              ? "Sign in to your account"
              : "Create your account"}
          </h2>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ""} />
            <input type="hidden" name="priceId" value={priceId || ""} />
            <input type="hidden" name="inviteId" value={inviteId || ""} />

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="border-2 border-sky-900 hover:border-gray-400 shadow-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="border-2 border-sky-900 hover:border-gray-400 shadow-sm"
                placeholder="Enter your password"
              />
            </div>

            {state?.error && (
              <div className="text-red-500 text-sm">{state.error}</div>
            )}

            <Button type="submit" variant="outline" className="w-full border-2 border-sky-900 hover:border-gray-400 shadow-sm" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : mode === "signin" ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-sky-900 hover:border-gray-400 shadow-sm"
              onClick={() => signIn("google")}
            >
              <Image
                src={googleLogo}
                alt="Google Icon"
                width={20}
                height={20}
              />
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-2 border-gray-900 hover:border-gray-400"
              onClick={() => signIn("github")}
            >
              <Image
                src={githubLogo}
                alt="GitHub Icon"
                width={20}
                height={20}
              />
              Sign up with GitHub
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === "signin"
              ? "New to our platform?"
              : "Already have an account?"}
            <br />
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                redirect ? `?redirect=${redirect}` : ""
              }${priceId ? `&priceId=${priceId}` : ""}`}
              className="text-sky-600 hover:underline"
            >
              {mode === "signin"
                ? "Create an account"
                : "Sign in to existing account"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Login;
