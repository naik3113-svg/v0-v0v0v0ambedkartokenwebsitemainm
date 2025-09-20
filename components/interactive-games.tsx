"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Brain, Gamepad2, Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function InteractiveGames() {
  const [quizGame, setQuizGame] = useState({ score: 0, currentQuestion: 0, active: false })
  const router = useRouter()

  const quizQuestions = [
    {
      question: "In which year was the Indian Constitution adopted?",
      options: ["1947", "1949", "1950", "1951"],
      correct: 1,
    },
    {
      question: "Dr. Ambedkar was the chairman of which committee?",
      options: ["Drafting Committee", "Planning Committee", "Finance Committee", "Education Committee"],
      correct: 0,
    },
    {
      question: "Which university did Dr. Ambedkar attend in the US?",
      options: ["Harvard", "Columbia", "Yale", "Princeton"],
      correct: 1,
    },
  ]

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4 bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Interactive Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-balance bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Constitutional Games
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Engage with Dr. Ambedkar's teachings through interactive games and immersive experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Word Hunt Game */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border border-yellow-400/30 bg-black/60 backdrop-blur-sm hover:border-yellow-400/60 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-b border-yellow-400/30">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black shadow-lg">
                  <Lightbulb className="w-5 h-5" />
                </div>
                Light in Darkness
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 animate-pulse" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce shadow-lg">
                    <Lightbulb className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Word Hunt Challenge</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Use your flashlight cursor to find constitutional words hidden in the darkness!
                  </p>
                  <Button
                    onClick={() => router.push("/game")}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Quest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Constitutional Quiz */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border border-purple-400/30 bg-black/60 backdrop-blur-sm hover:border-purple-400/60 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 border-b border-purple-400/30">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <Brain className="w-5 h-5" />
                </div>
                Constitutional Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 animate-pulse" />
                <div className="relative z-10">
                  {quizGame.active ? (
                    <div>
                      <div className="mb-4">
                        <Badge variant="outline" className="mb-2 border-purple-400/50 text-purple-400">
                          Question {quizGame.currentQuestion + 1} of {quizQuestions.length}
                        </Badge>
                        <h3 className="text-base sm:text-lg font-semibold mb-4 text-white">
                          {quizQuestions[quizGame.currentQuestion]?.question}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {quizQuestions[quizGame.currentQuestion]?.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start bg-transparent text-xs sm:text-sm p-2 sm:p-3 border-gray-600 text-gray-300 hover:bg-purple-400/20 hover:border-purple-400/50"
                            onClick={() => {
                              const isCorrect = index === quizQuestions[quizGame.currentQuestion].correct
                              const newScore = isCorrect ? quizGame.score + 1 : quizGame.score
                              const nextQuestion = quizGame.currentQuestion + 1

                              if (nextQuestion >= quizQuestions.length) {
                                setQuizGame({ score: newScore, currentQuestion: 0, active: false })
                                alert(`Quiz completed! Score: ${newScore}/${quizQuestions.length}`)
                              } else {
                                setQuizGame({ score: newScore, currentQuestion: nextQuestion, active: true })
                              }
                            }}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-purple-400 mt-4">Score: {quizGame.score}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse shadow-lg">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-purple-400 mb-2">Knowledge Test</h3>
                      <p className="mb-4 text-sm text-gray-300">
                        Test your knowledge about Dr. Ambedkar and the Constitution
                      </p>
                      <Button
                        onClick={() => setQuizGame({ score: 0, currentQuestion: 0, active: true })}
                        className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Start Quiz
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portal Runner Game - Updated to Coming Soon status */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border border-cyan-400/30 bg-black/60 backdrop-blur-sm hover:border-cyan-400/60 hover:scale-105">
            <CardHeader className="bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border-b border-cyan-400/30">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                Portal Runner
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 animate-pulse" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse shadow-lg">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">Justice Runner</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    An exciting constitutional adventure game is in development. Stay tuned for the launch!
                  </p>
                  <Button
                    disabled
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 cursor-not-allowed font-bold shadow-lg"
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">Explore More Games</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover additional interactive experiences and educational games that bring constitutional values to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/games">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 font-bold"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  More Games
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
