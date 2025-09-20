"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Palette, Music, Gamepad2, Home } from "lucide-react"
import Link from "next/link"

export default function ExperimentsPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const experiments = [
    {
      id: "sound-justice",
      title: "Sound of Justice",
      description: "Interactive audio visualization of constitutional articles",
      icon: Music,
      color: "from-blue-500 to-cyan-500",
      status: "beta",
    },
    {
      id: "constitution-game",
      title: "Constitution Builder",
      description: "Interactive game to build your own constitutional framework",
      icon: Gamepad2,
      color: "from-orange-500 to-red-500",
      status: "coming-soon",
    },
    {
      id: "particle-democracy",
      title: "Particle Democracy",
      description: "Visualize democratic processes through particle physics",
      icon: Sparkles,
      color: "from-indigo-500 to-purple-500",
      status: "active",
    },
    {
      id: "color-equality",
      title: "Color of Equality",
      description: "Synesthetic representation of constitutional values",
      icon: Palette,
      color: "from-yellow-500 to-orange-500",
      status: "beta",
    },
  ]

  const ParticleExperiment = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      const particles: Array<{
        x: number
        y: number
        vx: number
        vy: number
        size: number
        color: string
        life: number
        maxLife: number
      }> = []

      const colors = ["#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e"]

      const createParticle = (x: number, y: number) => {
        const maxLife = 2 + Math.random() * 3
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6 - 2,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: maxLife,
          maxLife,
        })
      }

      let animationId: number

      const animate = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i]

          particle.x += particle.vx * 0.5
          particle.y += particle.vy * 0.5
          particle.vy += 0.1 // gravity
          particle.life -= 0.02
          particle.size *= 0.995

          if (particle.life <= 0 || particle.size < 0.5) {
            particles.splice(i, 1)
            continue
          }

          const alpha = particle.life / particle.maxLife
          ctx.globalAlpha = alpha
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.globalAlpha = 1
        animationId = requestAnimationFrame(animate)
      }

      const handleClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        for (let i = 0; i < 15; i++) {
          createParticle(x, y)
        }
      }

      canvas.addEventListener("click", handleClick)
      animate()

      return () => {
        canvas.removeEventListener("click", handleClick)
        if (animationId) cancelAnimationFrame(animationId)
      }
    }, [])

    return (
      <canvas
        ref={canvasRef}
        className="w-full h-64 bg-black rounded-lg cursor-pointer border border-yellow-500/30"
        style={{ width: "100%", height: "256px" }}
      />
    )
  }

  const SoundOfJustice = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [frequency, setFrequency] = useState(440)
    const audioContextRef = useRef<AudioContext | null>(null)
    const oscillatorRef = useRef<OscillatorNode | null>(null)
    const gainNodeRef = useRef<GainNode | null>(null)

    const initAudioContext = () => {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        } catch (error) {
          console.error("Web Audio API not supported:", error)
          return false
        }
      }
      return true
    }

    const startSound = () => {
      if (!initAudioContext() || !audioContextRef.current) return

      try {
        // Resume audio context if suspended (required by browser policies)
        if (audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume()
        }

        // Create oscillator and gain nodes
        oscillatorRef.current = audioContextRef.current.createOscillator()
        gainNodeRef.current = audioContextRef.current.createGain()

        // Configure oscillator
        oscillatorRef.current.type = "sine"
        oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)

        // Configure gain (volume)
        gainNodeRef.current.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)

        // Connect nodes
        oscillatorRef.current.connect(gainNodeRef.current)
        gainNodeRef.current.connect(audioContextRef.current.destination)

        // Start oscillator
        oscillatorRef.current.start()
        setIsPlaying(true)
      } catch (error) {
        console.error("Failed to start audio:", error)
        setIsPlaying(false)
      }
    }

    const stopSound = () => {
      try {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop()
          oscillatorRef.current.disconnect()
          oscillatorRef.current = null
        }
        if (gainNodeRef.current) {
          gainNodeRef.current.disconnect()
          gainNodeRef.current = null
        }
        setIsPlaying(false)
      } catch (error) {
        console.error("Failed to stop audio:", error)
        setIsPlaying(false)
      }
    }

    const updateFrequency = (newFrequency: number) => {
      setFrequency(newFrequency)
      if (oscillatorRef.current && audioContextRef.current) {
        try {
          oscillatorRef.current.frequency.setValueAtTime(newFrequency, audioContextRef.current.currentTime)
        } catch (error) {
          console.error("Failed to update frequency:", error)
        }
      }
    }

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        stopSound()
        if (audioContextRef.current) {
          audioContextRef.current.close()
        }
      }
    }, [])

    return (
      <div className="space-y-4">
        <div className="h-32 bg-gradient-to-r from-blue-900 to-cyan-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-blue-500/30">
          {isPlaying && (
            <>
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-cyan-400/40 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 15 + 8}px`,
                    height: `${Math.random() * 15 + 8}px`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </>
          )}
          <Music className="w-12 h-12 text-cyan-400 opacity-60" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Frequency: {frequency}Hz</label>
          <input
            type="range"
            min="200"
            max="800"
            value={frequency}
            onChange={(e) => updateFrequency(Number(e.target.value))}
            className="w-full accent-cyan-500"
            disabled={!isPlaying}
          />
        </div>
        <Button
          onClick={isPlaying ? stopSound : startSound}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          variant={isPlaying ? "destructive" : "default"}
        >
          {isPlaying ? "Stop" : "Play"} Sound of Justice
        </Button>
        <p className="text-xs text-gray-400 text-center">
          Uses Web Audio API to generate constitutional frequency tones
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Constitutional Experiments
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Explore innovative digital experiences that push the boundaries of web technology while honoring
            constitutional principles and Dr. Ambedkar's vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {experiments.map((experiment) => {
            const Icon = experiment.icon
            return (
              <Card
                key={experiment.id}
                className={`bg-black/40 border-gray-700 hover:border-gray-500 transition-all duration-300 cursor-pointer transform hover:scale-105 backdrop-blur-sm ${
                  activeExperiment === experiment.id ? "ring-2 ring-yellow-400" : ""
                }`}
                onClick={() => setActiveExperiment(activeExperiment === experiment.id ? null : experiment.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${experiment.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge
                      variant={
                        experiment.status === "active"
                          ? "default"
                          : experiment.status === "beta"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {experiment.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{experiment.title}</CardTitle>
                  <CardDescription className="text-gray-400">{experiment.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Active Experiment Display */}
        {activeExperiment && (
          <Card className="bg-black/60 border-gray-600 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                {experiments.find((e) => e.id === activeExperiment)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeExperiment === "particle-democracy" && (
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm mb-4">
                    Click anywhere on the canvas to create particle bursts representing democratic participation.
                  </p>
                  <ParticleExperiment />
                </div>
              )}
              {activeExperiment === "sound-justice" && <SoundOfJustice />}
              {activeExperiment === "constitution-game" && (
                <div className="text-center py-8">
                  <Gamepad2 className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-white">Constitution Builder Game - In Development</p>
                  <p className="text-gray-400 text-sm">
                    Build and test your own constitutional framework through interactive gameplay
                  </p>
                </div>
              )}
              {activeExperiment === "color-equality" && (
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-lg animate-pulse border border-purple-500/30" />
                  <p className="text-white text-center">
                    Synesthetic representation of constitutional values through color and motion
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
