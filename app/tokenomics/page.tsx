"use client"

import { Navigation } from "@/components/navigation"
import { TokenomicsSection } from "@/components/tokenomics-section"
import { Footer } from "@/components/footer"

export default function TokenomicsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <TokenomicsSection />
      </div>
      <Footer />
    </main>
  )
}
