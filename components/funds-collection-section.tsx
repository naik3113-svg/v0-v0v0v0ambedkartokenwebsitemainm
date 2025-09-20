"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, GraduationCap, Users, TrendingUp } from "lucide-react"

export function FundsCollectionSection() {
  const handleBuyToken = () => {
    // This will be handled by the navigation buy button
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            Social Impact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">Empowering Education Through Token</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Every token purchase contributes to Dr. Ambedkar's vision of education for all
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Education Fund</h3>
                  <p className="text-blue-600 font-semibold">Supporting Dreams</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-gray-700">Supporting underprivileged students</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Providing scholarships & resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Building educational infrastructure</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg mb-6">
                <h4 className="text-xl font-bold mb-2">Your Impact Matters</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  When you buy AMBEDKAR tokens, you're not just investing in crypto - you're investing in education. We
                  use funds collected from token sales to pay for students who cannot afford quality education,
                  continuing Dr. Ambedkar's mission of empowerment through learning.
                </p>
              </div>

              <Button
                onClick={handleBuyToken}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Buy Token & Support Education 🎓
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">₹</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Funds Collected</h4>
                    <p className="text-2xl font-bold text-green-600">₹2,45,000+</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Raised for educational support</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Students Helped</h4>
                    <p className="text-2xl font-bold text-blue-600">150+</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Beneficiaries of our education fund</p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Scholarships</h4>
                    <p className="text-2xl font-bold text-purple-600">75</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Full scholarships provided</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
