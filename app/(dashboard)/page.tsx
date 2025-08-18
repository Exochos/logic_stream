import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import companyInfo from "@/lib/companyInfo.json";

export default function HomePage() {
  return (
    <main>
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Hero content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="font-bold tracking-tight text-gray-100">
                <span className="block text-sky-500 text-xl sm:text-2xl mb-2">
                  {companyInfo.hero}
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-amber-400">
                  {companyInfo.heroDescription}
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-300">
                {companyInfo.tagline}
              </p>
              <p className="mt-4 text-base sm:text-lg text-fuchsia-400">
                {companyInfo.productDescription}
              </p>

              {/* Waitlist / email capture */}
              <div className="mt-8 flex gap-2 sm:flex-row sm:justify-start sm:gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full max-w-xs rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Button className="bg-sky-500 hover:bg-sky-600 text-white px-6 rounded-md">
                  Join Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right-hand demo card */}
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full">
                <p className="text-sm text-sky-400 font-mono">Example Signal</p>
                <p className="mt-2 text-gray-200 font-mono text-sm">
                  ⚠ $XYZ: Revenue anomaly detected. <br />
                  API diff flagged in filings data. <br />
                  Options flow: unusual puts @ $25 strike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}