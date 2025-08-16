import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Database } from "lucide-react";
import { Terminal } from "./terminal";
import Image from "next/image";
import logo from "@/lib/logo.png";

export default function HomePage() {
  return (
    <main>
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-100 tracking-tight sm:text-5xl md:text-6xl">
                
                <span className="block text-sky-500">Let us help you build</span>
                <span className="block text-amber-400">Your Business</span>
              </h1>
              <Image
                  src={logo}
                  alt="Logicstream Logo"
                  width={200}
                  height={200}/>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                At logicstream.io, we provide a comprehensive set of web design
                and development services to help you create a stunning online
                presence. Our team of experts specializes in building modern,
                responsive websites that are tailored to your unique business
                needs. Whether you need a simple landing page or a complex web
                application, we have the skills and expertise to bring your
                vision to life. From design and development to hosting and
                maintenance, we offer end-to-end solutions that ensure your
                website is fast, secure, and user-friendly.
                <br />
              </p>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

  
    </main>
  );
}
