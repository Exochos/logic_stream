"use client";

import Link from "next/link";
import logicstream from "@/lib/logicstream.json";
import { Microchip, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { use, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { CircleIcon, Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/app/(login)/actions";
import { useRouter } from "next/navigation";
import { User } from "@/lib/db/schema";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>("/api/user", fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate("/api/user");
    router.push("/");
  }

  if (!user) {
    return (
      <>
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-black text-amber-500 hover:bg-amber-600 hover:text-black px-6 py-2 rounded-md transition-colors">
              Investor
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid w-[200px] gap-4 p-4 bg-white rounded-lg shadow-lg"
              >
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">tools</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">signals</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">pricing</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </motion.div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-black text-sky-500 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-md transition-colors">
              Personal Finance 
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid w-[200px] gap-4 p-4 bg-white rounded-lg shadow-lg"
              >
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">budgeting</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">savings</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">investing</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </motion.div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-black text-fuchsia-600 hover:bg-amber-500 hover:text-black px-4 py-2 rounded-md transition-colors">
              About Us
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid w-[200px] gap-4 p-4 bg-white rounded-lg shadow-lg"
              >
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">team</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">careers</Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">contact</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </motion.div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>

        <Button asChild className="rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200">
          <Link href="/sign-up">Login</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ""} />
          <AvatarFallback>
            {user.email
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  return (
    <header className="border-b border-gray-200 bg-black dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center ml-2">
          <span className="ml-2 text-xl font-semibold text-gray-100">
            <Microchip className="inline-block mr-2 h-6 w-6 text-amber-500 transform rotate-45" />
            Logicstream
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
