"use client"

import { useState, useEffect } from "react"

interface SmallImage {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  delay: number
}

interface SmallImagesAnimationProps {
  animationPhase: "scatter" | "forming" | "complete"
}

export function SmallImagesAnimation({ animationPhase }: SmallImagesAnimationProps) {
  const [images, setImages] = useState<SmallImage[]>([])

  useEffect(() => {
    const imageArray: SmallImage[] = []
    const gridCols = 10
    const gridRows = 4
    const blockWidth = 800 // Increased width for better coverage
    const blockHeight = 320 // Adjusted height for better aspect ratio
    const imageSize = 64 // Optimized size for better visibility without overwhelming

    for (let i = 0; i < 40; i++) {
      const row = Math.floor(i / gridCols)
      const col = i % gridCols

      const targetX = col * (blockWidth / gridCols) + (blockWidth / gridCols - imageSize) / 2
      const targetY = row * (blockHeight / gridRows) + (blockHeight / gridRows - imageSize) / 2

      const scatterRadius = 600
      const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.5
      const distance = Math.random() * scatterRadius + 200
      const scatterX = Math.cos(angle) * distance
      const scatterY = Math.sin(angle) * distance

      imageArray.push({
        id: i,
        x: scatterX,
        y: scatterY,
        targetX,
        targetY,
        size: imageSize,
        delay: i * 40, // Adjusted delay for smoother staggered animation
      })
    }

    setImages(imageArray)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
      <div className="relative w-[800px] h-[320px]">
        {images.map((image) => (
          <div
            key={image.id}
            className="absolute transition-all ease-in-out"
            style={{
              transitionDuration: "2500ms", // Slightly faster animation for better flow
              transitionDelay: `${image.delay}ms`,
              left: `${image.targetX}px`,
              top: `${image.targetY}px`,
              width: `${image.size}px`,
              height: `${image.size}px`,
              transform:
                animationPhase === "scatter"
                  ? `translate(${image.x - image.targetX}px, ${image.y - image.targetY}px) scale(0.8)`
                  : animationPhase === "forming"
                    ? "translate(0, 0) scale(1)"
                    : "translate(0, 0) scale(1.1)", // Added scale variations for better visual impact
              opacity: animationPhase === "complete" ? 1 : 0.9,
            }}
          >
            <div
              className="w-full h-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full shadow-lg border-2 border-yellow-300 flex items-center justify-center hover:scale-110 transition-transform duration-200"
              style={{
                animation: animationPhase === "complete" ? "coin-formation 0.8s ease-out" : "none",
                boxShadow:
                  animationPhase === "complete"
                    ? "0 0 20px rgba(251, 191, 36, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)"
                    : "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="text-yellow-900 font-bold text-xl drop-shadow-sm">A</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
