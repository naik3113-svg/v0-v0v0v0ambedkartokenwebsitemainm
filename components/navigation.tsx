"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Coins, ExternalLink, FileText } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Games", href: "/games" },
    { name: "Features", href: "/#features" },
    { name: "Tokenomics", href: "/#tokenomics" },
    { name: "Whitepaper", href: "/whitepaper" },
  ]

  const buyOptions = [
    {
      name: "Pump.fun",
      url: "https://pump.fun/coin/AmbedkarTokenAddress",
      icon: "🚀",
      description: "Primary trading platform",
    },
    {
      name: "DexScreener",
      url: "https://dexscreener.com/solana/AmbedkarTokenAddress",
      icon: "📊",
      description: "View charts and analytics",
    },
    {
      name: "Jupiter",
      url: "https://jup.ag/swap/SOL-AmbedkarTokenAddress",
      icon: "🪐",
      description: "Decentralized exchange",
    },
  ]

  const handleBuyOption = (url: string) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Failed to open buy link:", error)
      // Fallback to location.href if window.open fails
      window.location.href = url
    }
  }

  const handleWatchLive = () => {
    try {
      window.open("https://pump.fun/coin/AmbedkarTokenAddress", "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Failed to open live link:", error)
      window.location.href = "https://pump.fun"
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AMBEDKAR
              </h1>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-muted flex items-center gap-1"
                  >
                    {item.name}
                    <FileText className="w-3 h-3" />
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-muted"
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-md hover:shadow-lg transition-all duration-300">
                  <Coins className="mr-2 h-4 w-4" />
                  Buy Token
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {buyOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.name}
                    onClick={() => handleBuyOption(option.url)}
                    className="cursor-pointer flex flex-col items-start p-3"
                  >
                    <div className="flex items-center w-full">
                      <span className="mr-2">{option.icon}</span>
                      <span className="font-medium">{option.name}</span>
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={handleWatchLive}
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 bg-transparent"
            >
              📺 Watch Live
            </Button>
          </div>

          {/* Mobile navigation button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/98 backdrop-blur-sm border-b border-border">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <FileText className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}

            <div className="pt-2 space-y-2">
              {buyOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  className="w-full justify-start bg-transparent text-left"
                  onClick={() => {
                    handleBuyOption(option.url)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex flex-col items-start w-full">
                    <div className="flex items-center w-full">
                      <span className="mr-2">{option.icon}</span>
                      <span className="font-medium">Buy on {option.name}</span>
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
                  </div>
                </Button>
              ))}
              <Button
                variant="outline"
                className="w-full justify-start border-primary text-primary bg-transparent"
                onClick={() => {
                  handleWatchLive()
                  setIsOpen(false)
                }}
              >
                📺 Watch Live Trading
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
