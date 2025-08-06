import Features from "@/components/features";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/navbar";
import CTABanner from "@/components/cta-banner";
import Pricing from "@/components/Pricing";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="text-[length:inherit]  min-h-screen">
        <Navbar />
        <main className="pt-16 xs:pt-20 sm:pt-24">
          <Hero />
          <Features />
          <Pricing />
          <CTABanner />
          <Footer />
        </main>
      </div>
    </>
  );
}
