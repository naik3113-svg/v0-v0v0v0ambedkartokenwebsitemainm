"use client"

import { useState, useEffect } from "react"

export function AmbedkarPhotoSection() {
  const [showPopups, setShowPopups] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [backgroundImageError, setBackgroundImageError] = useState(false)
  const [popupImages, setPopupImages] = useState<
    Array<{
      id: number
      x: number
      y: number
      delay: number
      visible: boolean
    }>
  >([])

  const defaultBackgroundUrl = "/placeholder.svg?height=1080&width=1920"
  const fallbackBackgroundUrl = "/placeholder.svg?height=1080&width=1920"
  const defaultPopupUrl = "/placeholder.svg?height=80&width=80"
  const fallbackPopupUrl = "/placeholder.svg?height=80&width=80"

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const generatePopupImages = () => {
    const images = []
    const cols = isMobile ? 8 : 15
    const rows = isMobile ? 8 : 10
    const minSpacing = isMobile ? 12 : 6

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const id = row * cols + col
        const xPercent = col * (100 / cols) + 100 / cols / 2
        const yPercent = row * (100 / rows) + 100 / rows / 2

        const adjustedX = Math.max(minSpacing, Math.min(100 - minSpacing, xPercent))
        const adjustedY = Math.max(minSpacing, Math.min(100 - minSpacing, yPercent))

        images.push({
          id,
          x: adjustedX,
          y: adjustedY,
          delay: id * (isMobile ? 40 : 25), // Faster animation for more images
          visible: false,
        })
      }
    }
    return images
  }

  useEffect(() => {
    const mainTimer = setTimeout(() => {
      setShowPopups(true)
      const images = generatePopupImages()
      setPopupImages(images)

      images.forEach((image) => {
        setTimeout(() => {
          setPopupImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, visible: true } : img)))
        }, image.delay)
      })

      const displayTime = isMobile ? 12000 : 10000 // Longer display time for more images
      setTimeout(() => {
        setPopupImages((prev) => prev.map((img) => ({ ...img, visible: false })))
      }, displayTime)

      setTimeout(() => {
        setShowPopups(false)
        setPopupImages([])
      }, displayTime + 1000)
    }, 3000)

    const cycleTime = isMobile ? 18000 : 15000 // Longer cycle time
    const cycleTimer = setInterval(() => {
      setShowPopups(true)
      const images = generatePopupImages()
      setPopupImages(images)

      images.forEach((image) => {
        setTimeout(() => {
          setPopupImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, visible: true } : img)))
        }, image.delay)
      })

      const displayTime = isMobile ? 12000 : 10000
      setTimeout(() => {
        setPopupImages((prev) => prev.map((img) => ({ ...img, visible: false })))
      }, displayTime)

      setTimeout(() => {
        setShowPopups(false)
        setPopupImages([])
      }, displayTime + 1000)
    }, cycleTime)

    return () => {
      clearTimeout(mainTimer)
      clearInterval(cycleTimer)
    }
  }, [isMobile])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${!backgroundImageError ? defaultBackgroundUrl : fallbackBackgroundUrl})`,
        }}
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {showPopups &&
        popupImages.map((image) => (
          <div
            key={image.id}
            className={`absolute transition-all duration-500 transform z-20 ${
              image.visible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-45"
            }`}
            style={{
              left: `${image.x}%`,
              top: `${image.y}%`,
              transform: `translate(-50%, -50%) ${image.visible ? "scale(1) rotate(0deg)" : "scale(0) rotate(45deg)"}`,
            }}
          >
            <div className="relative">
              <img
                src={defaultPopupUrl || "/placeholder.svg"}
                alt={`Historical moment ${image.id + 1}`}
                className={`object-cover rounded-lg border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200 ${
                  isMobile ? "w-16 h-16 sm:w-20 sm:h-20" : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                }`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = fallbackPopupUrl
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10" />
    </section>
  )
}
