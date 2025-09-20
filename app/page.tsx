"use client"

import { useState } from "react"
import { IntroLoading } from "@/components/intro-loading"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TokenFeatures } from "@/components/token-features"
import { TokenomicsSection } from "@/components/tokenomics-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { ConstitutionalValues } from "@/components/constitutional-values"
import { InteractiveGames } from "@/components/interactive-games"
import { ScrollVideoSection } from "@/components/scroll-video-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { FundsCollectionSection } from "@/components/funds-collection-section"
import { AmbedkarPhotoSection } from "@/components/ambedkar-photo-section"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <IntroLoading onComplete={() => setShowIntro(false)} />
  }

  return (
    <main className="min-h-screen relative">
      {/* Full screen background image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('/dr--b-r--ambedkar-large-portrait.jpg')",
        }}
      />
      {/* Semi-transparent overlay for better content readability */}
      <div className="fixed inset-0 bg-black/40 -z-10" />

      {/* Content with backdrop blur for better readability */}
      <div className="relative z-10 backdrop-blur-sm">
        <Navigation />
        <HeroSection />
        <FundsCollectionSection />
        <AboutSection />
        <ScrollVideoSection />
        <AmbedkarPhotoSection />
        <ConstitutionalValues />
        <TokenFeatures />
        <InteractiveGames />
        <TokenomicsSection />
        <RoadmapSection />
        <Footer />
      </div>
    </main>
  )
}
