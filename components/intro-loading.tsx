"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface IntroLoadingProps {
  onComplete: () => void
}

export function IntroLoading({ onComplete }: IntroLoadingProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationPhase, setAnimationPhase] = useState<"intro" | "talking" | "complete">("intro")
  const [audioError, setAudioError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const defaultPortraitUrl = "/dr--b-r--ambedkar-large-portrait.jpg"
  const fallbackPortraitUrl = "/placeholder.svg?height=400&width=400"

  useEffect(() => {
    setMounted(true)
  }, [])

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
      }, 8000)
    }, 1500)

    const completeTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500)
    }, 20000)

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
    setIsVisible(false)
    setTimeout(onComplete, 500)
  }

  const handleImageError = () => {
    if (mounted) {
      setImageError(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('${!imageError ? defaultPortraitUrl : fallbackPortraitUrl}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-gradient-to-br from-yellow-400/80 via-amber-500/60 to-orange-500/80 glass-effect backdrop-blur-xl bg-white/10">
          {mounted ? (
            <img
              src={!imageError ? defaultPortraitUrl : fallbackPortraitUrl}
              alt="Dr. B.R. Ambedkar Portrait"
              className="w-full h-full object-cover object-center opacity-95 hover:opacity-100 transition-opacity duration-500"
              onError={handleImageError}
            />
          ) : (
            <img
              src={defaultPortraitUrl || "/placeholder.svg"}
              alt="Dr. B.R. Ambedkar Portrait"
              className="w-full h-full object-cover object-center opacity-95"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-amber-500/20 pointer-events-none"></div>
        </div>
        <div className="mt-4 text-center glass-effect rounded-xl p-3 bg-black/30 backdrop-blur-md">
          <p className="text-yellow-400 font-bold text-lg neon-text-cyan animate-neon-pulse">Dr. B.R. Ambedkar</p>
          <p className="text-amber-300 text-sm neon-text-purple">Father of Indian Constitution</p>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={skipIntro}
        className="absolute top-6 right-6 z-50 glass-effect border-2 border-yellow-400/80 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 backdrop-blur-xl bg-black/40 hover:shadow-xl hover:shadow-yellow-400/50 animate-pulse-glow"
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

      <div className="text-center text-white z-30 max-w-4xl px-4 sm:px-6 relative flex flex-col items-center justify-center min-h-screen glass-effect rounded-3xl lg:mr-96 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border border-white/20">
        <div className="mb-8 relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-1 shadow-2xl animate-float">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-black/95 via-black/90 to-black/95 flex items-center justify-center border-2 border-yellow-400/70 glass-effect">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-lg sm:text-xl neon-text-cyan animate-neon-pulse">
                  AMBEDKAR
                </div>
                <div className="text-amber-300 font-semibold text-xs sm:text-sm neon-text-purple">TOKEN</div>
              </div>
            </div>
          </div>

          {animationPhase === "talking" && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400/50 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-pulse scale-125"></div>
              <div className="absolute inset-0 rounded-full border border-orange-400/20 animate-pulse scale-150"></div>
            </>
          )}
        </div>

        <div className="relative z-40 glass-effect rounded-3xl p-6 sm:p-8 mb-8 border-2 border-gradient-to-r from-yellow-400/50 via-amber-400/40 to-orange-400/50 max-w-2xl bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-amber-200 hover:to-orange-400 transition-all duration-500 cursor-default animate-gradient-shift">
            Honoring Legacy, Building Future
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mb-4 text-pretty neon-text-cyan">
            A tribute to Dr. B.R. Ambedkar's vision of justice, equality, and constitutional democracy
          </p>
        </div>

        {animationPhase === "talking" && (
          <div className="mb-6 text-yellow-400 animate-pulse relative z-40 glass-effect rounded-2xl px-6 py-4 backdrop-blur-xl bg-gradient-to-r from-black/70 to-black/50 border border-yellow-400/30">
            <p className="text-sm sm:text-base font-semibold neon-text-pink">
              {audioError ? "📜" : "🎙️"} "Justice is the virtue of the soul..."
            </p>
            <p className="text-xs sm:text-sm text-amber-300 mt-1 neon-text-purple">
              Dr. B.R. Ambedkar's Constitutional Vision
              {audioError && <span className="text-red-400 ml-2">(Audio unavailable)</span>}
            </p>
          </div>
        )}

        <div className="w-64 sm:w-80 h-3 bg-black/40 rounded-full mx-auto mb-8 border-2 border-yellow-400/60 relative z-40 shadow-xl glass-effect backdrop-blur-sm">
          <div
            className="h-full rounded-full shadow-inner animate-gradient-shift"
            style={{
              background: "linear-gradient(90deg, #fbbf24, #f59e0b, #d97706, #92400e)",
              backgroundSize: "200% 100%",
              width: animationPhase === "intro" ? "20%" : animationPhase === "talking" ? "80%" : "100%",
              transition: "width 1.5s ease-in-out",
              boxShadow: "0 0 15px rgba(251, 191, 36, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            }}
          ></div>
        </div>

        <Button
          variant="outline"
          onClick={skipIntro}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 border-2 border-yellow-400 text-black hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 text-sm sm:text-base px-8 py-3 font-bold shadow-xl hover:shadow-2xl relative z-40 rounded-full glass-effect backdrop-blur-sm hover:scale-105 animate-pulse-glow"
        >
          Enter Website
        </Button>
      </div>
    </div>
  )
}
