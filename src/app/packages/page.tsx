import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Check, X, Users, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Packages',
  description: 'Choose from our curated Tarapith travel packages. Basic, Standard, and Premium options available starting at ₹5,000 per person.',
}

// Package data (in production, this would come from the database)
const packages = [
  {
    id: '1',
    name: 'Basic Tarapith Package',
    slug: 'basic-tarapith',
    description: 'Experience the divine energy of Tarapith with our Basic Package. Essential pilgrimage including darshan at the sacred Tarapith Kali Mandir.',
    price: 5000,
    duration: '1 Day',
    bestFor: 'Solo travelers, Devotees, Budget-conscious pilgrims',
    inclusions: [
      'Station pickup and drop (Rampurhat)',
      'Guided temple visit and darshan assistance',
      'Local sightseeing around the temple',
      'Refreshments (tea/snacks)',
      'Travel insurance',
    ],
    exclusions: [
      'Accommodation',
      'Meals (lunch/dinner)',
      'Personal expenses',
      'Special pooja arrangements',
      'Photography services',
    ],
    featured: false,
  },
  {
    id: '2',
    name: 'Standard Tarapith Package',
    slug: 'standard-tarapith',
    description: 'Our most popular package! Comprehensive experience combining spiritual devotion with exploration of the region\'s cultural heritage.',
    price: 7500,
    duration: '2 Days / 1 Night',
    bestFor: 'Couples, Small groups, First-time visitors',
    inclusions: [
      'Station pickup and drop (Rampurhat)',
      '1 night accommodation (budget/mid-range hotel)',
      'Breakfast at hotel',
      'Guided temple visit and darshan assistance',
      'One side destination tour (Birchandrapur OR Nitai Bari)',
      'Local transportation',
      'Refreshments during tours',
      'Travel insurance',
    ],
    exclusions: [
      'Lunch and dinner',
      'Personal expenses',
      'Special pooja arrangements',
      'Photography services',
      'Folklore night experience (available as add-on)',
    ],
    featured: true,
  },
  {
    id: '3',
    name: 'Premium Tarapith Experience',
    slug: 'premium-tarapith',
    description: 'The ultimate Tarapith experience with premium hotel accommodation, multiple side destination visits, and our exclusive Guided Folklore Night Experience.',
    price: 10000,
    duration: '3 Days / 2 Nights',
    bestFor: 'Groups, Adventure seekers, Cultural enthusiasts',
    inclusions: [
      'Station pickup and drop (Rampurhat)',
      '2 nights premium accommodation',
      'All meals (breakfast, lunch, dinner)',
      'Guided temple visit with special darshan assistance',
      'Multiple side destinations (Birchandrapur AND Nitai Bari)',
      'Guided Folklore Night Experience (cultural storytelling walk)',
      'All local transportation (AC vehicle)',
      'Dedicated guide throughout',
      'Refreshments and bottled water',
      'Travel insurance',
    ],
    exclusions: [
      'Personal expenses',
      'Special pooja arrangements (available on request)',
      'Professional photography/videography',
      'Alcoholic beverages',
    ],
    featured: false,
  },
]

export default function PackagesPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-600/20 text-amber-500">Our Packages</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Tarapith Journey</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From essential pilgrimages to immersive cultural experiences. 
            All packages include respectful, permission-based tours.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`bg-card border-border relative flex flex-col ${
                pkg.featured ? 'ring-2 ring-amber-600 mystical-glow' : ''
              }`}
            >
              {pkg.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {pkg.duration}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-amber-500">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground"> /person</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Users className="h-4 w-4 text-amber-500" />
                  <span>Best for: {pkg.bestFor}</span>
                </div>
                
                {/* Inclusions */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2 text-green-500">Inclusions:</h4>
                  <ul className="space-y-1">
                    {pkg.inclusions.slice(0, 5).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                    {pkg.inclusions.length > 5 && (
                      <li className="text-xs text-amber-500">+{pkg.inclusions.length - 5} more...</li>
                    )}
                  </ul>
                </div>
                
                {/* Exclusions */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-red-400">Exclusions:</h4>
                  <ul className="space-y-1">
                    {pkg.exclusions.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <X className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" variant={pkg.featured ? 'default' : 'outline'} asChild>
                  <Link href={`/packages/${pkg.slug}`}>View Full Details</Link>
                </Button>
                <Button className="w-full" variant="ghost" size="sm" asChild>
                  <a href={`https://wa.me/919876543210?text=Hi! I'm interested in the ${pkg.name}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enquire on WhatsApp
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-amber-900/20 to-amber-600/10 border-amber-600/30 max-w-2xl mx-auto">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-2">Need Something Custom?</h3>
              <p className="text-muted-foreground mb-6">
                Build your own package with our trip customizer. Choose dates, accommodations, add-ons, and more.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/customize">Customize Your Trip</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Safety Notice */}
        <div className="mt-12 p-6 bg-amber-950/30 rounded-lg border border-amber-900/30 max-w-3xl mx-auto">
          <h4 className="font-semibold text-amber-500 mb-2">⚠️ Important Safety Notice</h4>
          <p className="text-sm text-amber-200/80">
            Our &quot;Guided Folklore Night Experience&quot; (included in Premium package) is a cultural storytelling walk. 
            It is NOT about provoking spirits or occult practices. All tours are respectful, permission-based, and follow local rules. 
            18+ recommended. Not suitable for those with heart conditions or anxiety disorders.
          </p>
        </div>
      </div>
    </div>
  )
}
