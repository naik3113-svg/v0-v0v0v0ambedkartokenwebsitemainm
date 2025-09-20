"use client"

interface QuoteDisplayProps {
  currentQuote: number
  quotes: string[]
}

export function QuoteDisplay({ currentQuote, quotes }: QuoteDisplayProps) {
  return (
    <div className="h-16 sm:h-24 flex items-center justify-center mb-6 sm:mb-8 relative z-40">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4">
        <blockquote
          className="text-sm sm:text-lg md:text-xl italic font-medium animate-fade-in-up text-amber-100 text-center px-2"
          key={currentQuote}
        >
          "{quotes[currentQuote]}"
        </blockquote>
      </div>
    </div>
  )
}
