import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Award, Users, Scale, Home } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const lifeEvents = [
    {
      year: "1891",
      title: "Birth in Mhow",
      description: "Born on April 14, 1891, in Mhow, Central Provinces (now Madhya Pradesh) into a Dalit family",
      icon: "🌟",
    },
    {
      year: "1907",
      title: "First Dalit Graduate",
      description: "Became the first Dalit to obtain a college education in India, graduating from Elphinstone College",
      icon: "🎓",
    },
    {
      year: "1913-1923",
      title: "International Education",
      description: "Earned degrees from Columbia University (MA, PhD) and London School of Economics (MSc, DSc)",
      icon: "🌍",
    },
    {
      year: "1936",
      title: "Political Leadership",
      description: "Founded the Independent Labour Party to fight for the rights of the depressed classes",
      icon: "⚖️",
    },
    {
      year: "1947-1950",
      title: "Constitution Architect",
      description: "Served as Chairman of the Drafting Committee and principal architect of the Indian Constitution",
      icon: "📜",
    },
    {
      year: "1956",
      title: "Buddhist Conversion",
      description: "Converted to Buddhism along with 500,000 followers, establishing a new path for social equality",
      icon: "☸️",
    },
  ]

  const achievements = [
    {
      title: "Constitutional Architect",
      description: "Principal architect of the Indian Constitution, ensuring fundamental rights and social justice",
      icon: <Scale className="w-6 h-6" />,
    },
    {
      title: "Social Reformer",
      description: "Fought against caste discrimination and worked tirelessly for the upliftment of Dalits",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Scholar & Author",
      description: "Authored numerous books including 'The Annihilation of Caste' and other seminal works",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: "Political Leader",
      description: "First Law Minister of independent India and founder of multiple political organizations",
      icon: <Award className="w-6 h-6" />,
    },
  ]

  const quotes = [
    "Cultivation of mind should be the ultimate aim of human existence.",
    "I measure the progress of a community by the degree of progress which women have achieved.",
    "Education is the milk of a lioness, whoever drinks it will roar.",
    "Be educated, be agitated and be organized.",
    "Lost rights are never regained by appeals to the conscience of the usurpers, but by relentless struggle.",
    "Religion is for man and not man for religion.",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-yellow-500 text-black">
              The Architect of Modern India
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
              Dr. B.R. Ambedkar
            </h1>
            <p className="text-xl sm:text-2xl text-amber-200 max-w-3xl mx-auto text-pretty">
              Babasaheb Bhimrao Ramji Ambedkar - The Father of the Indian Constitution and Champion of Social Justice
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <img
              src="/placeholder.svg?height=300&width=300"
              alt="Dr. B.R. Ambedkar"
              className="w-64 h-64 rounded-full border-4 border-yellow-400 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Life Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Life Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Timeline of Greatness</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              From humble beginnings to becoming the architect of modern India's constitutional framework
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {lifeEvents.map((event, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className={`flex-shrink-0 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-500 rounded-full flex items-center justify-center text-sm md:text-base font-bold text-black">
                    {event.year}
                  </div>
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                        <span className="text-xl md:text-2xl">{event.icon}</span>
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm md:text-base">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Achievements */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Legacy
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Major Achievements</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Dr. Ambedkar's contributions that shaped modern India and continue to inspire millions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                    {achievement.icon}
                  </div>
                  <CardTitle className="text-base md:text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Famous Quotes */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Wisdom
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Words of Wisdom</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              Timeless quotes that continue to inspire and guide us toward justice and equality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {quotes.map((quote, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-50 to-blue-50 border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4 md:p-6">
                  <blockquote className="text-base md:text-lg italic text-slate-700 mb-4 text-pretty">
                    "{quote}"
                  </blockquote>
                  <cite className="text-xs md:text-sm font-semibold text-slate-600">- Dr. B.R. Ambedkar</cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-amber-500 text-black">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Continue the Legacy</h2>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-pretty">
            Honor Dr. Ambedkar's vision by supporting the AMBEDKAR TOKEN - a digital tribute to his enduring legacy of
            justice, equality, and social reform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-black text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
            >
              Buy AMBEDKAR Token
            </a>
            <a
              href="/#games"
              className="w-full sm:w-auto bg-white text-black px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Play Interactive Games
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
