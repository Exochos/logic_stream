"use client";

import Link from "next/link";
import { Microchip, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";

// UI Components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CircleIcon, Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Actions & Types
import { signOut } from "@/app/(login)/actions";
import { User } from "@/lib/db/schema";

// Constants for animation variants
const ANIMATIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { duration: 0.3 }
  }
};

// Navigation menu data structure
const NAV_ITEMS = [
  {
    label: "Investor",
    className: "bg-black text-amber-500 hover:bg-amber-600 hover:text-black",
    dropdownBg: "bg-amber-500",
    links: [
      { href: "/investor/tools", label: "Tools" },
      { href: "/investor/signals", label: "Signals" },
      { href: "/investor/pricing", label: "Pricing" }
    ]
  },
  {
    label: "Personal Finance",
    className: "bg-black text-sky-500 hover:bg-sky-500 hover:text-black",
    dropdownBg: "bg-sky-500/10 backdrop-blur",
    links: [
      { href: "/finance/budgeting", label: "Budgeting" },
      { href: "/finance/savings", label: "Savings" },
      { href: "/finance/investing", label: "Investing" }
    ]
  },
  {
    label: "About Us",
    className: "bg-black text-fuchsia-600 hover:bg-fuchsia-500 hover:text-black",
    dropdownBg: "bg-fuchsia-500/10 backdrop-blur",
    links: [
      { href: "/about/team", label: "Team" },
      { href: "/about/careers", label: "Careers" },
      { href: "/about/contact", label: "Contact" }
    ]
  }
];

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Navigation component for non-authenticated users
 * Includes desktop navigation menu and mobile menu button
 */
function GuestNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu viewport={false} className="hidden lg:flex">
        <NavigationMenuList>
          {NAV_ITEMS.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger 
                className={`${item.className} px-6 py-2 rounded-md transition-all duration-300 hover:scale-105`}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.div
                  {...ANIMATIONS.fadeInUp}
                  className={`grid w-[200px] gap-2 p-4 ${item.dropdownBg} rounded-lg shadow-xl border border-white/20`}
                >
                  <ul className="space-y-2">
                    {item.links.map((link, index) => (
                      <motion.li
                        key={`${item.label}-${link.label}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <NavigationMenuLink asChild>
                          <Link 
                            href={link.href}
                            className="block px-3 py-2 rounded-md hover:bg-white/20 transition-colors capitalize font-medium"
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Login Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button asChild className="rounded-md bg-amber-500 text-black hover:bg-amber-600 transition-all duration-300">
          <Link href="/sign-up">Login</Link>
        </Button>
      </motion.div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <AnimatePresence mode="wait">
          {mobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-black border-t border-fuchsia-600 lg:hidden"
          >
            <nav className="p-4 space-y-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-1"
                >
                  <h3 className={`font-semibold text-sm ${item.className.split(' ')[1]} mb-2`}>
                    {item.label}
                  </h3>
                  {item.links.map((link) => (
                    <Link
                      key={`mobile-${item.label}-${link.label}`}
                      href={link.href}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button asChild className="w-full bg-amber-500 text-black hover:bg-amber-600">
                  <Link href="/sign-up">Login</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * User menu component for authenticated users
 * Displays avatar with dropdown menu
 */
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
    return <GuestNavigation />;
  }

  const initials = user.email
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="focus:outline-none"
        >
          <Avatar className="cursor-pointer size-9 ring-2 ring-transparent hover:ring-amber-500 transition-all duration-300">
            <AvatarImage alt={user.email} />
            <AvatarFallback className="bg-gradient-to-br from-amber-500 to-fuchsia-600 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-1"
        >
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/dashboard" className="flex w-full items-center">
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer text-red-600 focus:text-red-600"
            onSelect={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Main header component
 * Contains logo and navigation/user menu
 */
function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-fuchsia-600 bg-black text-gray-100 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Microchip className="h-6 w-6 text-amber-500" />
            <motion.div
              className="absolute inset-0 h-6 w-6 bg-amber-500 blur-xl opacity-50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <span className="ml-2 text-xl font-semibold text-gray-100 group-hover:text-amber-500 transition-colors duration-300">
            Logicstream
          </span>
        </Link>

        {/* Navigation/User Menu */}
        <div className="flex items-center space-x-4">
          <Suspense 
            fallback={
              <div className="h-9 w-9 rounded-full bg-gray-700 animate-pulse" />
            }
          >
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </motion.header>
  );
}

/**
 * Main layout component
 * Wraps children with header and consistent styling
 */
export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </section>
  );
}