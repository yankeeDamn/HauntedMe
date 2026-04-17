import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Clock, 
  Users, 
  Shield, 
  Star, 
  Phone, 
  MessageCircle,
  ChevronRight,
  Check,
  AlertTriangle,
  Sparkles
} from 'lucide-react'

// Package data
const packages = [
  {
    name: 'Basic Package',
    price: 5000,
    duration: '1 Day',
    bestFor: 'Solo travelers, Devotees',
    highlights: ['Temple darshan', 'Station pickup/drop', 'Guided tour', 'Refreshments'],
    slug: 'basic-tarapith',
    featured: false,
  },
  {
    name: 'Standard Package',
    price: 7500,
    duration: '2 Days / 1 Night',
    bestFor: 'Couples, Small groups',
    highlights: ['Temple darshan', '1 Night hotel', '1 Side destination', 'All transport'],
    slug: 'standard-tarapith',
    featured: true,
  },
  {
    name: 'Premium Experience',
    price: 10000,
    duration: '3 Days / 2 Nights',
    bestFor: 'Groups, Adventure seekers',
    highlights: ['Complete temple tour', 'Premium hotel', 'Multiple destinations', 'Folklore night walk'],
    slug: 'premium-tarapith',
    featured: false,
  },
]

const highlights = [
  {
    icon: Sparkles,
    title: 'Sacred Mandir Visit',
    description: 'Experience the divine energy of Tarapith Kali Mandir, one of the 51 Shakti Peethas.',
  },
  {
    icon: MapPin,
    title: 'Side Destinations',
    description: 'Explore nearby spiritual sites like Birchandrapur and Nitai Bari.',
  },
  {
    icon: Users,
    title: 'Guided Folklore Experience',
    description: 'Learn about local legends and traditions through respectful cultural night walks.',
  },
  {
    icon: Shield,
    title: 'Safe & Respectful',
    description: 'All tours operate with permissions, following local rules and respecting sacred sites.',
  },
]

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    content: 'Amazing experience! The guide was knowledgeable and the folklore walk was fascinating. Highly recommended!',
  },
  {
    name: 'Priya Sharma',
    location: 'Kolkata',
    rating: 5,
    content: 'Perfect organization! The premium package was worth every rupee. A complete spiritual journey.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-amber-600/20 text-amber-500 border-amber-600/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Discover the Mystical Side of Tarapith
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Tarapith Haunted</span>
              <br />
              <span className="text-foreground">Travel Experience</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Journey through ancient temples, folklore, and cultural heritage. 
              Our guided tours offer a respectful exploration of Tarapith&apos;s mystical traditions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/packages">
                  View Packages
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/customize">
                  Customize Your Trip
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="tel:+919876543210">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-amber-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-amber-600/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Safety Disclaimer Banner */}
      <section className="bg-amber-950/30 border-y border-amber-900/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-200/80">
              <strong>Important:</strong> Our folklore experience is a guided cultural walk - respectful, safe, and permission-based. 
              <Link href="/faq" className="underline ml-1 hover:text-amber-500">Learn more about safety</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete travel packages including temple visits, accommodations, transport, and unique cultural experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="bg-card border-border hover:border-amber-600/30 transition-colors">
                <CardHeader>
                  <item.icon className="h-10 w-10 text-amber-500 mb-2" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-24 bg-[#0a0a0f]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated packages, starting at ₹5,000 per person.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <Card 
                key={pkg.slug} 
                className={`bg-card border-border relative ${
                  pkg.featured ? 'ring-2 ring-amber-600 mystical-glow' : ''
                }`}
              >
                {pkg.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {pkg.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-amber-500">₹{pkg.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground"> /person</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Best for: {pkg.bestFor}</p>
                  <ul className="space-y-2">
                    {pkg.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={pkg.featured ? 'default' : 'outline'} asChild>
                    <Link href={`/packages/${pkg.slug}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="link" asChild>
              <Link href="/packages">
                View All Packages
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Travelers Say</h2>
            <p className="text-muted-foreground">Real experiences from our guests</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <CardDescription>&ldquo;{testimonial.content}&rdquo;</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="link" asChild>
              <Link href="/gallery">
                View Gallery
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f14]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Journey?</h2>
            <p className="text-muted-foreground mb-8">
              Contact us today to plan your Tarapith experience. We&apos;ll customize the perfect package for you.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/customize">
                  Build Your Trip
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/919876543210?text=Hi! I'm interested in booking a Tarapith tour." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Or call us directly: <a href="tel:+919876543210" className="text-amber-500 hover:underline">+91 98765 43210</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
