"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Word {
  id: number
  text: string
  x: number
  y: number
  found: boolean
}

interface Trap {
  id: number
  x: number
  y: number
  triggered: boolean
}

export default function GamePage() {
  const router = useRouter()
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [wordsFound, setWordsFound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes
  const [gameOver, setGameOver] = useState(false)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  // Ambedkar-related words to find
  const [words, setWords] = useState<Word[]>([
    { id: 1, text: "JUSTICE", x: 20, y: 30, found: false },
    { id: 2, text: "EQUALITY", x: 70, y: 60, found: false },
    { id: 3, text: "CONSTITUTION", x: 40, y: 80, found: false },
    { id: 4, text: "FREEDOM", x: 80, y: 20, found: false },
  ])

  // Traps that reset progress if clicked
  const [traps, setTraps] = useState<Trap[]>([
    { id: 1, x: 30, y: 50, triggered: false },
    { id: 2, x: 60, y: 40, triggered: false },
    { id: 3, x: 50, y: 70, triggered: false },
  ])

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect()
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
  }, [])

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameCompleted && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameOver(true)
    }
  }, [gameStarted, gameCompleted, gameOver, timeLeft])

  // Check if word is found
  const checkWordFound = (word: Word) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - word.x, 2) + Math.pow(mousePosition.y - word.y, 2))
    return distance < 8 // Proximity threshold
  }

  // Check if trap is triggered
  const checkTrapTriggered = (trap: Trap) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - trap.x, 2) + Math.pow(mousePosition.y - trap.y, 2))
    return distance < 5
  }

  // Handle word click
  const handleWordClick = (wordId: number) => {
    const word = words.find((w) => w.id === wordId)
    if (word && checkWordFound(word) && !word.found) {
      setWords((prev) => prev.map((w) => (w.id === wordId ? { ...w, found: true } : w)))
      setWordsFound((prev) => prev + 1)

      if (wordsFound + 1 === 4) {
        setGameCompleted(true)
      }
    }
  }

  // Handle trap click
  const handleTrapClick = (trapId: number) => {
    const trap = traps.find((t) => t.id === trapId)
    if (trap && checkTrapTriggered(trap)) {
      // Reset one found word as penalty
      const foundWords = words.filter((w) => w.found)
      if (foundWords.length > 0) {
        const randomFoundWord = foundWords[Math.floor(Math.random() * foundWords.length)]
        setWords((prev) => prev.map((w) => (w.id === randomFoundWord.id ? { ...w, found: false } : w)))
        setWordsFound((prev) => Math.max(0, prev - 1))
      }

      setTraps((prev) => prev.map((t) => (t.id === trapId ? { ...t, triggered: true } : t)))

      // Reset trap after 2 seconds
      setTimeout(() => {
        setTraps((prev) => prev.map((t) => (t.id === trapId ? { ...t, triggered: false } : t)))
      }, 2000)
    }
  }

  // Add mouse move listener
  useEffect(() => {
    if (gameStarted && gameAreaRef.current) {
      const gameArea = gameAreaRef.current
      gameArea.addEventListener("mousemove", handleMouseMove)
      return () => gameArea.removeEventListener("mousemove", handleMouseMove)
    }
  }, [gameStarted, handleMouseMove])

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Word Hunt Game
          </h1>
          <p className="text-xl mb-8 text-amber-200">
            Find 4 words related to Dr. Ambedkar's legacy using your flashlight cursor in the dark!
          </p>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 mb-8 border border-yellow-400/30">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Game Rules:</h2>
            <ul className="text-left space-y-2 text-amber-200">
              <li>• Move your cursor like a flashlight to reveal hidden words</li>
              <li>• Find all 4 words: JUSTICE, EQUALITY, CONSTITUTION, FREEDOM</li>
              <li>• Avoid red traps - they will reset your progress!</li>
              <li>• You have 2 minutes to complete the challenge</li>
              <li>• Click on words when they're illuminated to collect them</li>
            </ul>
          </div>
          <Button
            onClick={() => setGameStarted(true)}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 text-xl px-8 py-4 font-bold"
          >
            Start Game
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="ml-4 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Congratulations! 🎉
          </h1>
          <p className="text-2xl mb-8 text-amber-200">You found all 4 words and honored Dr. Ambedkar's legacy!</p>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 mb-8 border border-yellow-400/30">
            <p className="text-xl text-yellow-400 mb-4">Words Found:</p>
            <div className="grid grid-cols-2 gap-4">
              {words.map((word) => (
                <div key={word.id} className="text-green-400 font-bold">
                  ✓ {word.text}
                </div>
              ))}
            </div>
            <p className="text-lg text-amber-200 mt-4">
              Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          </div>
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 text-xl px-8 py-4 font-bold"
          >
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
            Time's Up! ⏰
          </h1>
          <p className="text-2xl mb-8 text-rose-200">
            You found {wordsFound} out of 4 words. Try again to honor Dr. Ambedkar's complete legacy!
          </p>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 mb-8 border border-red-400/30">
            <p className="text-xl text-red-400 mb-4">Words Found:</p>
            <div className="grid grid-cols-2 gap-4">
              {words.map((word) => (
                <div key={word.id} className={word.found ? "text-green-400 font-bold" : "text-gray-400"}>
                  {word.found ? "✓" : "✗"} {word.text}
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 text-xl px-8 py-4 font-bold mr-4"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Game UI */}
      <div className="absolute top-4 left-4 z-50 text-white">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/50">
          <p className="text-yellow-400 font-bold">Words Found: {wordsFound}/4</p>
          <p className="text-amber-300">
            Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      <Button
        onClick={() => router.push("/")}
        variant="outline"
        className="absolute top-4 right-4 z-50 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
      >
        Exit Game
      </Button>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        className="w-full h-screen relative cursor-none"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.95) 70%, black 100%)`,
        }}
      >
        {/* Flashlight cursor */}
        <div
          className="absolute w-8 h-8 bg-yellow-400 rounded-full pointer-events-none z-40 shadow-lg"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 20px rgba(255, 255, 0, 0.8)",
          }}
        />

        {/* Words */}
        {words.map((word) => {
          const isNearCursor = checkWordFound(word)
          return (
            <div
              key={word.id}
              className={`absolute text-2xl font-bold cursor-pointer transition-all duration-300 ${
                word.found
                  ? "text-green-400 opacity-100"
                  : isNearCursor
                    ? "text-yellow-400 opacity-100 animate-pulse"
                    : "text-transparent opacity-0"
              }`}
              style={{
                left: `${word.x}%`,
                top: `${word.y}%`,
                transform: "translate(-50%, -50%)",
                textShadow: word.found || isNearCursor ? "0 0 10px currentColor" : "none",
              }}
              onClick={() => handleWordClick(word.id)}
            >
              {word.text}
              {word.found && <span className="ml-2">✓</span>}
            </div>
          )
        })}

        {/* Traps */}
        {traps.map((trap) => {
          const isNearCursor = checkTrapTriggered(trap)
          return (
            <div
              key={trap.id}
              className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                trap.triggered
                  ? "bg-red-600 animate-ping"
                  : isNearCursor
                    ? "bg-red-500 opacity-80 animate-pulse"
                    : "bg-red-700 opacity-20"
              }`}
              style={{
                left: `${trap.x}%`,
                top: `${trap.y}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: isNearCursor || trap.triggered ? "0 0 15px rgba(255, 0, 0, 0.8)" : "none",
              }}
              onClick={() => handleTrapClick(trap.id)}
            />
          )
        })}

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white z-50">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/50">
            <p className="text-yellow-400 font-bold mb-2">Move your cursor to illuminate words</p>
            <p className="text-amber-300 text-sm">Avoid red traps! Click on illuminated words to collect them.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
