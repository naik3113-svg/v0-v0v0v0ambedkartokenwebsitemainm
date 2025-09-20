"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Info, Monitor } from "lucide-react"
import Link from "next/link"

export default function PortalRunnerPage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showDesktopWarning, setShowDesktopWarning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
      if (mobile && gameStarted) {
        setShowDesktopWarning(true)
        setGameStarted(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [gameStarted])

  const startGame = () => {
    if (isMobile) {
      setShowDesktopWarning(true)
      return
    }
    setGameStarted(true)
  }

  if (showDesktopWarning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-8 max-w-md text-center border border-blue-500/30">
          <Monitor className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Desktop Required</h2>
          <p className="text-gray-300 mb-6">
            Portal Runner is optimized for desktop play. Please open this website on a desktop or laptop computer for
            the best gaming experience.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowDesktopWarning(false)}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setShowDesktopWarning(false)
                setGameStarted(true)
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Play Anyway
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-black relative">
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="outline"
            onClick={() => setGameStarted(false)}
            className="bg-black/60 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
        </div>

        <iframe
          src="/portal-runner-game.html"
          className="w-full h-screen border-0"
          title="Portal Runner Game"
          style={{ width: "100vw", height: "100vh" }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              href="/games"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Link>
            <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portal Runner
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
              A fast-paced anime-style runner game where you collect coins to charge a portal. Master the enhanced
              controls and time-slow mechanics to navigate through challenging obstacles.
            </p>
          </div>

          {/* Game Preview */}
          <div className="bg-black/60 rounded-xl p-8 mb-8 border border-cyan-500/30 backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-blue-900 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-pulse" />
              <div className="text-center text-white z-10">
                <Play className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-2xl font-bold mb-2">Ready to Run?</h3>
                <p className="text-gray-300">Experience enhanced anime-style graphics and improved controls</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold px-8 py-3 shadow-lg shadow-cyan-500/25"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Game
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowInstructions(!showInstructions)}
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-cyan-500/50"
              >
                <Info className="w-5 h-5 mr-2" />
                Instructions
              </Button>
            </div>
          </div>

          {/* Instructions */}
          {showInstructions && (
            <div className="bg-black/40 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Enhanced Controls</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Move: ← → or A D</li>
                    <li>• Jump: ↑ or W or Space</li>
                    <li>• Time-slow: Shift (2.5s duration)</li>
                    <li>• Pause: P</li>
                    <li>• Start/Restart: Enter</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Objective</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Collect 15 coins to charge the portal</li>
                    <li>• Avoid all hazards (pillars, spikes, sweeps)</li>
                    <li>• Use double-jump and time-slow strategically</li>
                    <li>• Reach the portal to win</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-cyan-900/30 rounded-lg border border-cyan-600/30">
                <p className="text-cyan-200 text-sm">
                  <strong>New Features:</strong> Enhanced anime-style graphics, improved physics, player trail effects,
                  and better performance optimization!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
