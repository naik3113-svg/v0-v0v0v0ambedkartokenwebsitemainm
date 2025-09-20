"use client"

import { Twitter, MessageCircle, Send, Github, Mail, Coins, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/AmbedkarToken", label: "Twitter" },
    { icon: <MessageCircle className="h-5 w-5" />, href: "https://discord.gg/ambedkartoken", label: "Discord" },
    { icon: <Send className="h-5 w-5" />, href: "https://t.me/ambedkartoken", label: "Telegram" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/ambedkartoken", label: "GitHub" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:contact@ambedkartoken.com", label: "Email" },
  ]

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Games", href: "/#games" },
    { name: "Features", href: "/#features" },
    { name: "Community", href: "/#community" },
  ]

  const resources = [
    { name: "Whitepaper", href: "/whitepaper" },
    { name: "Documentation", href: "/docs" },
    { name: "Smart Contract", href: "https://solscan.io/token/AmbedkarTokenAddress" },
    { name: "Audit Report", href: "/audit-report.pdf" },
    { name: "Brand Kit", href: "/brand-kit.zip" },
  ]

  const handleBuyToken = () => {
    window.open("https://pump.fun/coin/AmbedkarTokenAddress", "_blank", "noopener,noreferrer")
  }

  return (
    <footer className="bg-gradient-to-br from-card to-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AMBEDKAR TOKEN
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md text-pretty">
              Honoring Dr. B.R. Ambedkar's legacy through blockchain technology, building a community-driven
              cryptocurrency focused on equality, education, and social impact.
            </p>

            <Button
              onClick={handleBuyToken}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white mb-6"
            >
              <Coins className="mr-2 h-4 w-4" />
              Buy AMBEDKAR Token
            </Button>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-primary/10"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-card-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.href}
                    target={resource.href.startsWith("http") || resource.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel={
                      resource.href.startsWith("http") || resource.href.endsWith(".pdf")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>© 2024 Ambedkar Token. Built with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for equality and justice.</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a href="/disclaimer" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Disclaimer
              </a>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-border/50">
            <blockquote className="text-sm italic text-muted-foreground">
              "Be educated, be agitated and be organized." - Dr. B.R. Ambedkar
            </blockquote>
          </div>
        </div>
      </div>
    </footer>
  )
}
