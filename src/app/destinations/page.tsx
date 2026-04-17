import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, Sparkles, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore Tarapith and nearby destinations including Birchandrapur and Nitai Bari. Discover the spiritual and cultural heritage of Birbhum, West Bengal.',
}

const destinations = [
  {
    name: 'Tarapith',
    slug: 'tarapith',
    description: 'Tarapith is one of the most revered pilgrimage sites in India, home to the famous Tarapith Kali Mandir - one of the 51 Shakti Peethas. The temple houses the deity Tara Ma and is famous for its tantric traditions and the legendary saint Bamakhyapa.',
    shortDesc: 'Sacred Shakti Peetha temple dedicated to Goddess Tara with rich tantric heritage.',
    distance: 'Main destination',
    travelTime: 'Starting point',
    highlights: [
      'Tarapith Kali Mandir - Shakti Peetha',
      'Bamakhyapa Samadhi',
      'Temple complex and sacred pond',
      'Traditional tantric rituals',
      'Spiritual market and local crafts',
    ],
    isPrimary: true,
  },
  {
    name: 'Birchandrapur',
    slug: 'birchandrapur',
    description: 'Birchandrapur is a small village near Tarapith known for its serene atmosphere and historical significance. The village has several old temples and was an important center for tantric practitioners in ancient times.',
    shortDesc: 'Historic village with ancient temples and peaceful rural atmosphere.',
    distance: '~12 km from Tarapith',
    travelTime: '~25-30 minutes',
    highlights: [
      'Ancient village temples',
      'Rural Bengal scenery',
      'Historical significance',
      'Peaceful meditation spots',
      'Local village life experience',
    ],
    isPrimary: false,
  },
  {
    name: 'Nitai Bari',
    slug: 'nitai-bari',
    description: 'Nitai Bari (Nityananda\'s House) is a sacred site associated with Lord Nityananda, one of the principal associates of Sri Chaitanya Mahaprabhu and a key figure in the Gaudiya Vaishnava tradition.',
    shortDesc: 'Sacred site associated with Lord Nityananda and Gaudiya Vaishnava tradition.',
    distance: '~15 km from Tarapith',
    travelTime: '~30-35 minutes',
    highlights: [
      'Nityananda Prabhu connection',
      'Gaudiya Vaishnava heritage',
      'Devotional atmosphere',
      'Traditional kirtan experience',
      'Scenic location',
    ],
    isPrimary: false,
  },
]

export default function DestinationsPage() {
  const primaryDestination = destinations.find(d => d.isPrimary)
  const sideDestinations = destinations.filter(d => !d.isPrimary)

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-600/20 text-amber-500">Explore</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Destinations</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the spiritual and cultural treasures of the Birbhum region in West Bengal.
          </p>
        </div>

        {/* Primary Destination - Tarapith */}
        {primaryDestination && (
          <div className="mb-16">
            <Card className="bg-card border-border overflow-hidden max-w-4xl mx-auto">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-amber-900/30 to-amber-600/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold gradient-text">{primaryDestination.name}</h2>
                    <p className="text-sm text-muted-foreground mt-2">Primary Destination</p>
                  </div>
                </div>
                <div className="md:w-3/5 p-8">
                  <p className="text-muted-foreground mb-6">{primaryDestination.description}</p>
                  
                  <h4 className="font-semibold mb-3 text-amber-500">Key Highlights:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {primaryDestination.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild>
                    <Link href="/packages">
                      View Packages
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Side Destinations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Side Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {sideDestinations.map((destination) => (
              <Card key={destination.slug} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{destination.name}</CardTitle>
                      <CardDescription className="mt-2">{destination.shortDesc}</CardDescription>
                    </div>
                    <MapPin className="h-6 w-6 text-amber-500 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{destination.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{destination.travelTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{destination.description}</p>
                  
                  <h4 className="font-semibold text-sm mb-2 text-amber-500">Highlights:</h4>
                  <ul className="space-y-1">
                    {destination.highlights.slice(0, 4).map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Note */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-6">
            <strong>Note:</strong> Distance and travel time are approximate and may vary based on traffic and road conditions. 
            Our guides will provide accurate information during your tour.
          </p>
          <Button variant="outline" asChild>
            <Link href="/customize">
              Include Side Destinations in Your Trip
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
