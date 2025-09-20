"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Target, Eye, Trophy } from "lucide-react"

export function WordHuntGame() {
  const [cursorGame, setCursorGame] = useState({
    score: 0,
    active: false,
    foundWords: new Set<string>(),
    gameCompleted: false,
  })
  const [showHint, setShowHint] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const gameRef = useRef<HTMLDivElement>(null)

  const gameWords = ["Education", "Justice", "Liberty", "Equality"]

  const wordHints = [
    "Find the foundation of all progress - the key to enlightenment",
    "Seek the principle that ensures fairness for all",
    "Discover the essence of freedom from oppression",
    "Locate the cornerstone of equal treatment",
  ]

  const wordPositions = [
    { x: 20, y: 30 },
    { x: 80, y: 25 },
    { x: 15, y: 70 },
    { x: 75, y: 75 },
  ]

  const isWordVisible = (wordPosition: { x: number; y: number }) => {
    if (!cursorGame.active) return false
    const gameRect = gameRef.current?.getBoundingClientRect()
    if (!gameRect) return false

    const wordX = gameRect.left + (gameRect.width * wordPosition.x) / 100
    const wordY = gameRect.top + (gameRect.height * wordPosition.y) / 100

    const distance = Math.sqrt(Math.pow(mousePosition.x - wordX, 2) + Math.pow(mousePosition.y - wordY, 2))
    return distance < 120 // Increased torch radius
  }

  useEffect(() => {
    if (!cursorGame.active) {
      document.body.style.cursor = "auto"
      document.body.style.overflow = "auto"
      return
    }

    document.body.style.cursor = "none"
    document.body.style.overflow = "hidden"

    // Create torch cursor element
    const torchCursor = document.createElement("div")
    torchCursor.id = "torch-cursor"
    torchCursor.className = "fixed pointer-events-none z-[9999] transition-opacity duration-200"
    torchCursor.style.width = "40px"
    torchCursor.style.height = "40px"
    torchCursor.style.transform = "translate(-50%, -50%)"
    torchCursor.innerHTML = `
      <div class="relative w-full h-full">
        <!-- Torch flame -->
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div class="w-6 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse opacity-90"></div>
          <div class="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-pulse"></div>
        </div>
        <!-- Torch handle -->
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-amber-700 to-amber-900 rounded-sm"></div>
        <!-- Light glow -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-yellow-300/30 via-orange-300/20 to-transparent rounded-full animate-pulse"></div>
      </div>
    `
    document.body.appendChild(torchCursor)

    const spawnWord = (wordIndex: number) => {
      const word = gameWords[wordIndex]
      const position = wordPositions[wordIndex]

      if (cursorGame.foundWords.has(word)) return
      if (!isWordVisible(position)) return

      const gameRect = gameRef.current?.getBoundingClientRect()
      if (!gameRect) return

      const wordElement = document.createElement("div")
      wordElement.className =
        "absolute pointer-events-auto z-50 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-lg font-bold cursor-pointer transition-all hover:scale-110 animate-pulse shadow-lg border-2 border-yellow-300"
      wordElement.style.left = position.x + "%"
      wordElement.style.top = position.y + "%"
      wordElement.style.transform = "translate(-50%, -50%)"
      wordElement.textContent = word

      wordElement.onclick = () => {
        if (!cursorGame.foundWords.has(word)) {
          const newFoundWords = new Set(cursorGame.foundWords)
          newFoundWords.add(word)

          setCursorGame((prev) => ({
            ...prev,
            score: prev.score + 25,
            foundWords: newFoundWords,
            gameCompleted: newFoundWords.size === 4,
          }))

          // Enhanced light effect with torch theme
          const lightEffect = document.createElement("div")
          lightEffect.className =
            "absolute pointer-events-none z-40 w-40 h-40 sm:w-48 sm:h-48 rounded-full opacity-75 animate-ping"
          lightEffect.style.left = position.x + "%"
          lightEffect.style.top = position.y + "%"
          lightEffect.style.transform = "translate(-50%, -50%)"
          lightEffect.style.background =
            "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,165,0,0.6) 30%, rgba(255,69,0,0.4) 60%, transparent 100%)"
          gameRef.current?.appendChild(lightEffect)

          // Add flame particles
          for (let i = 0; i < 8; i++) {
            const particle = document.createElement("div")
            particle.className = "absolute pointer-events-none z-40 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
            particle.style.left = position.x + "%"
            particle.style.top = position.y + "%"
            particle.style.transform = `translate(-50%, -50%) translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px)`
            gameRef.current?.appendChild(particle)
            setTimeout(() => particle.remove(), 1000)
          }

          setTimeout(() => lightEffect.remove(), 2000)

          if (newFoundWords.size === 4) {
            setTimeout(() => {
              document.body.style.cursor = "auto"
              document.body.style.overflow = "auto"
              const torchElement = document.getElementById("torch-cursor")
              if (torchElement) torchElement.remove()
              setCursorGame((prev) => ({ ...prev, active: false }))

              const completionDiv = document.createElement("div")
              completionDiv.className = "fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
              completionDiv.innerHTML = `
                <div class="bg-gradient-to-br from-yellow-400 to-amber-500 text-black p-8 rounded-xl text-center max-w-md mx-4 shadow-2xl border-4 border-yellow-300">
                  <div class="text-6xl mb-4">🔥</div>
                  <h2 class="text-2xl font-bold mb-4">Torch Master!</h2>
                  <p class="mb-6">You've found all 4 words and your torch has illuminated the wisdom of Dr. Ambedkar! The light of knowledge burns bright!</p>
                  <button onclick="this.parentElement.parentElement.remove()" class="bg-black text-yellow-400 px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors border-2 border-yellow-400">
                    Continue Your Journey
                  </button>
                </div>
              `
              document.body.appendChild(completionDiv)
            }, 1000)
          }
        }
        wordElement.remove()
      }

      gameRef.current?.appendChild(wordElement)

      setTimeout(() => {
        if (gameRef.current?.contains(wordElement)) {
          wordElement.remove()
        }
      }, 4000) // Increased visibility time
    }

    const wordCheckInterval = setInterval(() => {
      if (cursorGame.foundWords.size < 4) {
        gameWords.forEach((word, index) => {
          if (!cursorGame.foundWords.has(word)) {
            spawnWord(index)
          }
        })
      }
    }, 100)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Update torch cursor position
      const torchElement = document.getElementById("torch-cursor")
      if (torchElement) {
        torchElement.style.left = e.clientX + "px"
        torchElement.style.top = e.clientY + "px"
      }

      // Enhanced torch trail effect
      if (gameRef.current?.contains(e.target as Node)) {
        const gameRect = gameRef.current.getBoundingClientRect()
        const trail = document.createElement("div")
        trail.className = "absolute pointer-events-none z-30 w-4 h-4 rounded-full opacity-60 animate-pulse"
        trail.style.left = ((e.clientX - gameRect.left) / gameRect.width) * 100 + "%"
        trail.style.top = ((e.clientY - gameRect.top) / gameRect.height) * 100 + "%"
        trail.style.transform = "translate(-50%, -50%)"
        trail.style.background =
          "radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.4) 50%, transparent 100%)"
        gameRef.current.appendChild(trail)
        setTimeout(() => trail.remove(), 800)
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (gameRef.current?.contains(e.target as Node)) {
        const gameRect = gameRef.current.getBoundingClientRect()
        const burst = document.createElement("div")
        burst.className =
          "absolute pointer-events-none z-30 w-20 h-20 sm:w-28 sm:h-28 rounded-full opacity-75 animate-ping"
        burst.style.left = ((e.clientX - gameRect.left) / gameRect.width) * 100 + "%"
        burst.style.top = ((e.clientY - gameRect.top) / gameRect.height) * 100 + "%"
        burst.style.transform = "translate(-50%, -50%)"
        burst.style.background =
          "radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,140,0,0.6) 40%, transparent 70%)"
        gameRef.current.appendChild(burst)
        setTimeout(() => burst.remove(), 800)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("click", handleClick)
      document.body.style.cursor = "auto"
      document.body.style.overflow = "auto"
      const torchElement = document.getElementById("torch-cursor")
      if (torchElement) torchElement.remove()
      clearInterval(wordCheckInterval)
    }
  }, [cursorGame.active, cursorGame.foundWords, mousePosition, gameWords])

  const showNextHint = () => {
    const remainingWords = gameWords.filter((word) => !cursorGame.foundWords.has(word))
    if (remainingWords.length > 0) {
      const nextWordIndex = gameWords.indexOf(remainingWords[0])
      setCurrentHintIndex(nextWordIndex)
      setShowHint(true)
      setTimeout(() => setShowHint(false), 5000) // Increased hint display time
    }
  }

  return (
    <div
      ref={gameRef}
      className={`relative transition-all duration-500 ${
        cursorGame.active
          ? "fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 cursor-none"
          : "h-[70vh] min-h-[500px] bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg overflow-hidden border-2 border-yellow-400/30"
      }`}
    >
      {cursorGame.active ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-40">
          <div className="text-center mb-4 bg-black/80 rounded-lg p-4 border-2 border-yellow-400/50 backdrop-blur-sm">
            <p className="text-xl sm:text-2xl font-bold mb-2 text-yellow-400">🔥 Torch Score: {cursorGame.score}</p>
            <p className="text-sm opacity-75 mb-2 text-white">Words Illuminated: {cursorGame.foundWords.size}/4</p>
            {cursorGame.gameCompleted ? (
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="text-lg font-bold text-yellow-400 mb-2">Torch Master Complete!</p>
                <p className="text-sm opacity-75 text-white">Your torch has revealed all the wisdom!</p>
              </div>
            ) : (
              <p className="text-sm opacity-60 text-gray-300">Guide your torch near hidden words to illuminate them!</p>
            )}
          </div>
          <div className="flex gap-2 mb-4">
            <Button
              onClick={showNextHint}
              variant="outline"
              size="sm"
              className="bg-yellow-500 text-black hover:bg-yellow-400 border-yellow-400"
            >
              <Eye className="w-4 h-4 mr-1" />
              Light the Way
            </Button>
            <Button
              onClick={() => {
                setCursorGame({
                  score: 0,
                  active: false,
                  foundWords: new Set(),
                  gameCompleted: false,
                })
                document.body.style.cursor = "auto"
                document.body.style.overflow = "auto"
                const torchElement = document.getElementById("torch-cursor")
                if (torchElement) torchElement.remove()
              }}
              variant="outline"
              size="sm"
              className="bg-red-500 text-white hover:bg-red-400 border-red-400"
            >
              Extinguish Torch
            </Button>
          </div>
          {showHint && (
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black p-4 rounded-lg text-sm max-w-xs text-center animate-pulse border-2 border-yellow-400 shadow-lg">
              <p className="font-semibold mb-2">🔥 Torch Guidance for "{gameWords[currentHintIndex]}":</p>
              <p>{wordHints[currentHintIndex]}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <div className="text-6xl mb-4">🔥</div>
            <Target className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
            <p className="mb-2 font-semibold text-xl">The Torch of Wisdom Quest</p>
            <p className="text-sm opacity-75 mb-4">
              Light your torch and find 4 key words of Dr. Ambedkar's wisdom hidden in the darkness!
            </p>
            <p className="text-xs opacity-60 mb-4">
              Your torch will illuminate words when you move close to them - click to collect them!
            </p>
            <Button
              onClick={() => {
                setCursorGame({
                  score: 0,
                  active: true,
                  foundWords: new Set(),
                  gameCompleted: false,
                })
              }}
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-400 hover:to-amber-400 font-bold px-6 py-3 border-2 border-yellow-400 shadow-lg"
            >
              🔥 Light Your Torch
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
