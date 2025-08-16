import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "@/lib/logo.png";
import logicstream from "@/lib/logicstream.json";

export default function HomePage() {
  return (
    <main>
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-100 tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-sky-500">{logicstream.hero}</span>
                <span className="block text-amber-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-2">
                  {logicstream.heroDescription}
                </span>
              </h1>
              <p className="mt-6 text-lg text-fuchsia-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {logicstream.tagline}
              </p>
              <p className="mt-4 text-gray-50">
                Logicstream cleans and structures SEC filings at scale so you don’t have to. Spot footnote shenanigans,
                detect accounting anomalies, and overlay options flow — all in a lightning-fast database designed for
                forensic finance.
              </p>

              {/* Waitlist / email capture */}
              <div className="mt-8 flex gap-2 sm:flex-row sm:justify-start sm:gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full max-w-xs rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Button className="bg-grey-50 hover:bg-sky-400 text-amber-500 px-6 border border-gray-400 rounded-md">
                  Join Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* right-hand side (future space for chart / terminal demo) */}
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full">
                <p className="text-sm text-sky-400 font-mono">Example Signal</p>
                <p className="mt-2 text-gray-200 font-mono text-sm">
                  ⚠ $XYZ: R&D expenses down 40% while headcount up 20%. <br />
                  SEC Note C buried restatement flagged. <br />
                  Options flow: Unusual puts @ $25 strike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
