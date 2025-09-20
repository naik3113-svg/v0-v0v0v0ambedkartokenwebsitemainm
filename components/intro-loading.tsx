"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { SmallImagesAnimation } from "@/components/small-images-animation"

interface IntroLoadingProps {
  onComplete: () => void
}

export function IntroLoading({ onComplete }: IntroLoadingProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationPhase, setAnimationPhase] = useState<"intro" | "talking" | "complete">("intro")
  const [audioError, setAudioError] = useState(false)
  const [showPersistentImages, setShowPersistentImages] = useState(false)
  const [imageError, setImageError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const defaultPortraitUrl = "/placeholder.svg?height=400&width=400"
  const fallbackPortraitUrl = "/placeholder.svg?height=400&width=400"

  useEffect(() => {
    const talkingTimer = setTimeout(() => {
      setAnimationPhase("talking")

      if (audioRef.current) {
        audioRef.current.currentTime = 0
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio play failed:", error)
            setAudioError(true)
          })
        }
      }

      setTimeout(() => {
        setAnimationPhase("complete")
        setTimeout(() => {
          setShowPersistentImages(true)
        }, 3000)
      }, 8000)
    }, 1500)

    const completeTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500)
    }, 10000)

    return () => {
      clearTimeout(talkingTimer)
      clearTimeout(completeTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [onComplete])

  const skipIntro = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setShowPersistentImages(true)
    setIsVisible(false)
    setTimeout(onComplete, 500)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const persistentImages = showPersistentImages && <SmallImagesAnimation animationPhase="complete" />

  if (!isVisible) return persistentImages

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105 opacity-60"
        style={{
          backgroundImage: `url('${!imageError ? "/dr--b-r--ambedkar-large-portrait.jpg" : defaultPortraitUrl}')`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <SmallImagesAnimation
        animationPhase={animationPhase === "intro" ? "scatter" : animationPhase === "talking" ? "forming" : "complete"}
      />

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="w-80 h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400/50 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 backdrop-blur-sm">
          <img
            src={!imageError ? "/dr--b-r--ambedkar-large-portrait.jpg" : defaultPortraitUrl}
            alt="Dr. B.R. Ambedkar Portrait"
            className="w-full h-full object-cover object-center"
            onError={handleImageError}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-yellow-400 font-bold text-lg">Dr. B.R. Ambedkar</p>
          <p className="text-amber-300 text-sm">Father of Indian Constitution</p>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={skipIntro}
        className="absolute top-6 right-6 z-50 bg-black/80 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 backdrop-blur-sm"
      >
        Skip Intro
      </Button>

      <audio
        ref={audioRef}
        preload="metadata"
        onError={(e) => {
          console.log("Audio error:", e)
          setAudioError(true)
        }}
        onLoadedData={() => console.log("Audio loaded successfully")}
        onCanPlay={() => setAudioError(false)}
      >
        <source src="/ambedkar-speech.mp3" type="audio/mpeg" />
        <source src="/ambedkar-speech.ogg" type="audio/ogg" />
        <source src="/ambedkar-speech.wav" type="audio/wav" />
      </audio>

      <div className="text-center text-white z-30 max-w-4xl px-4 sm:px-6 relative flex flex-col items-center justify-center min-h-screen bg-black/10 backdrop-blur-sm rounded-3xl lg:mr-96">
        <div className="mb-8 relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-1 shadow-2xl animate-pulse">
            <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center border-2 border-yellow-400/50">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg sm:text-xl">AMBEDKAR</div>
                <div className="text-amber-300 font-semibold text-xs sm:text-sm">TOKEN</div>
              </div>
            </div>
          </div>

          {animationPhase === "talking" && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-pulse scale-125"></div>
            </>
          )}
        </div>

        <div className="relative z-40 bg-black/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8 border border-yellow-400/30 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-amber-200 hover:to-orange-500 transition-all duration-500 cursor-default">
            Honoring Legacy, Building Future
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mb-4 text-pretty">
            A tribute to Dr. B.R. Ambedkar's vision of justice, equality, and constitutional democracy
          </p>
        </div>

        {animationPhase === "talking" && (
          <div className="mb-6 text-yellow-400 animate-pulse relative z-40 bg-black/60 rounded-lg px-4 py-2 backdrop-blur-sm">
            <p className="text-sm sm:text-base font-semibold">
              {audioError ? "📜" : "🎙️"} "Justice is the virtue of the soul..."
            </p>
            <p className="text-xs sm:text-sm text-amber-300 mt-1">
              Dr. B.R. Ambedkar's Constitutional Vision
              {audioError && <span className="text-red-400 ml-2">(Audio unavailable)</span>}
            </p>
          </div>
        )}

        <div className="w-64 sm:w-80 h-2 bg-white/20 rounded-full mx-auto mb-8 border border-yellow-400/50 relative z-40 shadow-lg">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-full shadow-inner"
            style={{
              width: animationPhase === "intro" ? "20%" : animationPhase === "talking" ? "80%" : "100%",
              transition: "width 1s ease-in-out",
            }}
          ></div>
        </div>

        <Button
          variant="outline"
          onClick={skipIntro}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 border-yellow-400 text-black hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 text-sm sm:text-base px-8 py-3 font-bold shadow-lg hover:shadow-xl relative z-40 rounded-full"
        >
          Enter Website
        </Button>
      </div>
    </div>
  )
}
