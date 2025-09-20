"use client"
import { useState } from "react"

interface AmbedkarPortraitProps {
  animationPhase: "scatter" | "forming" | "complete"
}

export function AmbedkarPortrait({ animationPhase }: AmbedkarPortraitProps) {
  const [imageError, setImageError] = useState(false)

  const defaultImageUrl = "/placeholder.svg?height=220&width=220"
  const fallbackImageUrl = "/placeholder.svg?height=220&width=220"

  return (
    <div className="mb-6 sm:mb-8 animate-float relative z-40">
      <div className="relative">
        <img
          src={!imageError ? defaultImageUrl : fallbackImageUrl}
          alt="Dr. B.R. Ambedkar"
          className={`w-32 h-32 sm:w-56 sm:h-56 mx-auto rounded-full border-4 border-white shadow-2xl transition-all duration-3000 ${
            animationPhase === "complete" ? "opacity-100 scale-110" : "opacity-70"
          }`}
          onError={() => setImageError(true)}
        />
        {animationPhase === "complete" && (
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ping opacity-50"></div>
        )}
      </div>
    </div>
  )
}
