import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Users,
  Target,
  TrendingUp,
  Shield,
  Globe,
  Coins,
  BookOpen,
  Heart,
  Scale,
  Lightbulb,
  Award,
  Building,
  Handshake,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Comprehensive Whitepaper
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AMBEDKAR Token
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Honoring the legacy of Dr. B.R. Ambedkar through blockchain innovation and social justice
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <FileText className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Dr. Ambedkar's Legacy */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Dr. B.R. Ambedkar's Legacy
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Constitutional Architect</h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Dr. Bhimrao Ramji Ambedkar (1891-1956) was the principal architect of the Indian Constitution and a
                  champion of human rights. His vision of justice, liberty, equality, and fraternity forms the
                  foundation of modern India's democratic principles.
                </p>
                <h4 className="font-semibold mb-3 text-primary">Social Reformer</h4>
                <p className="text-muted-foreground leading-relaxed">
                  A tireless advocate for the rights of marginalized communities, Dr. Ambedkar fought against social
                  discrimination and worked to create an inclusive society where every individual has equal
                  opportunities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Educational Pioneer</h4>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Believing that "education is the milk of lioness," Dr. Ambedkar emphasized the transformative power of
                  education in breaking the chains of oppression and creating social mobility.
                </p>
                <h4 className="font-semibold mb-3 text-primary">Economic Visionary</h4>
                <p className="text-muted-foreground leading-relaxed">
                  His economic philosophy focused on creating opportunities for the underprivileged and building a
                  society where economic justice prevails alongside social justice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The AMBEDKAR Token represents a revolutionary approach to combining blockchain technology with social
              justice principles. This comprehensive ecosystem aims to create lasting impact through education,
              equality, and economic empowerment, directly inspired by Dr. Ambedkar's constitutional vision.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission extends beyond traditional cryptocurrency applications to create a sustainable platform that
              funds educational initiatives, supports social justice causes, and provides economic opportunities for
              underrepresented communities worldwide.
            </p>
          </CardContent>
        </Card>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                To create a global movement that leverages blockchain technology to promote Dr. Ambedkar's ideals of
                justice, liberty, equality, and fraternity in the digital age.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Global educational accessibility</li>
                <li>• Decentralized social justice funding</li>
                <li>• Economic empowerment for all</li>
                <li>• Constitutional principles in digital governance</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                To build a sustainable ecosystem that funds educational initiatives, supports social justice causes, and
                creates economic opportunities for underrepresented communities worldwide.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Scholarship and educational funding</li>
                <li>• Legal aid and advocacy support</li>
                <li>• Microfinance and entrepreneurship</li>
                <li>• Community-driven governance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Core Principles */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              Core Principles
            </CardTitle>
            <CardDescription>Inspired by Dr. Ambedkar's constitutional values</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <Scale className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Justice</h4>
                <p className="text-sm text-muted-foreground">Fair distribution and transparent governance</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <Lightbulb className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Liberty</h4>
                <p className="text-sm text-muted-foreground">Freedom through education and economic opportunity</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Equality</h4>
                <p className="text-sm text-muted-foreground">Equal access to resources and opportunities</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Fraternity</h4>
                <p className="text-sm text-muted-foreground">Building inclusive communities worldwide</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tokenomics */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-primary" />
              Comprehensive Tokenomics
            </CardTitle>
            <CardDescription>Fair and transparent distribution model with detailed allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="text-3xl font-bold text-primary mb-2">1B</div>
                <div className="text-sm text-muted-foreground">Total Supply</div>
                <div className="text-xs text-muted-foreground mt-1">Fixed supply, no inflation</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                <div className="text-3xl font-bold text-blue-600 mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Community</div>
                <div className="text-xs text-muted-foreground mt-1">400M tokens</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                <div className="text-sm text-muted-foreground">Development</div>
                <div className="text-xs text-muted-foreground mt-1">300M tokens</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
                <div className="text-sm text-muted-foreground">Social Impact</div>
                <div className="text-xs text-muted-foreground mt-1">300M tokens</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Community Allocation (40%)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Public sale: 25%</li>
                  <li>• Community rewards: 10%</li>
                  <li>• Airdrops: 3%</li>
                  <li>• Liquidity provision: 2%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Development Fund (30%)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Platform development: 15%</li>
                  <li>• Team allocation: 10%</li>
                  <li>• Advisors: 3%</li>
                  <li>• Marketing: 2%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">Social Impact (30%)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Educational scholarships: 15%</li>
                  <li>• Legal aid fund: 8%</li>
                  <li>• Microfinance: 5%</li>
                  <li>• Emergency relief: 2%</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology & Innovation */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Technology & Innovation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Blockchain Infrastructure</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Built on a secure, scalable blockchain platform with smart contract functionality for transparent fund
                  management and automated distribution.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Multi-signature wallet security</li>
                  <li>• Automated smart contract execution</li>
                  <li>• Cross-chain compatibility</li>
                  <li>• Energy-efficient consensus mechanism</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Governance Platform</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Decentralized governance system allowing token holders to participate in decision-making processes for
                  fund allocation and project selection.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Proposal submission system</li>
                  <li>• Voting mechanisms</li>
                  <li>• Transparent result tracking</li>
                  <li>• Community feedback integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expanded Use Cases */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Comprehensive Use Cases & Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Educational Funding</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Supporting scholarships and educational programs for underprivileged students
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Merit-based scholarships</li>
                  <li>• Vocational training programs</li>
                  <li>• Digital literacy initiatives</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Scale className="h-6 w-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Social Justice Initiatives</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Funding legal aid and advocacy programs for marginalized communities
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Free legal consultation</li>
                  <li>• Human rights advocacy</li>
                  <li>• Anti-discrimination campaigns</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Users className="h-6 w-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Community Governance</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Decentralized decision-making for fund allocation and project selection
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Democratic voting system</li>
                  <li>• Transparent fund tracking</li>
                  <li>• Community proposals</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Building className="h-6 w-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Economic Empowerment</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Microfinance and entrepreneurship support for underserved populations
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Small business loans</li>
                  <li>• Startup incubation</li>
                  <li>• Skills development</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Heart className="h-6 w-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Healthcare Access</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Providing healthcare support and medical aid to underserved communities
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Medical emergency fund</li>
                  <li>• Health insurance support</li>
                  <li>• Preventive care programs</li>
                </ul>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Handshake className="h-6 w-6 text-primary mb-2" />
                <h4 className="font-semibold mb-2">Global Partnerships</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Collaborating with NGOs and institutions worldwide for maximum impact
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• NGO partnerships</li>
                  <li>• University collaborations</li>
                  <li>• Government initiatives</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Development Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  Q1
                </div>
                <div>
                  <h4 className="font-semibold">Token Launch & Community Building</h4>
                  <p className="text-muted-foreground text-sm">
                    Initial token distribution and community establishment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/70 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  Q2
                </div>
                <div>
                  <h4 className="font-semibold">Educational Platform Development</h4>
                  <p className="text-muted-foreground text-sm">
                    Launch of scholarship and educational funding programs
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/50 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  Q3
                </div>
                <div>
                  <h4 className="font-semibold">Governance Implementation</h4>
                  <p className="text-muted-foreground text-sm">
                    Decentralized governance system for community decisions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  Q4
                </div>
                <div>
                  <h4 className="font-semibold">Global Expansion</h4>
                  <p className="text-muted-foreground text-sm">International partnerships and program scaling</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Compliance */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Smart Contract Security</h4>
                <p className="text-muted-foreground text-sm">
                  All smart contracts undergo rigorous auditing by leading security firms
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
                <p className="text-muted-foreground text-sm">
                  Full compliance with applicable regulations in all operating jurisdictions
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Transparency</h4>
                <p className="text-muted-foreground text-sm">
                  Regular public reporting on fund usage and project outcomes
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Community Oversight</h4>
                <p className="text-muted-foreground text-sm">
                  Community-driven monitoring and accountability mechanisms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Join the Movement</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Be part of a revolutionary initiative that combines blockchain innovation with social justice. Together,
                we can honor Dr. Ambedkar's legacy and build a more equitable future for all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  <Coins className="mr-2 h-5 w-5" />
                  Buy AMBEDKAR Token
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/#community">
                    <Users className="mr-2 h-5 w-5" />
                    Join Community
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
