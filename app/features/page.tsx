"use client"

import { Navigation } from "@/components/navigation"
import { TokenFeatures } from "@/components/token-features"
import { Footer } from "@/components/footer"

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <TokenFeatures />
      </div>
      <Footer />
    </main>
  )
}
