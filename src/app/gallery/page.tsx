import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Camera } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'View photos from Tarapith temple, destinations, and traveler experiences.',
}

// Placeholder gallery - in production, this would come from the database
const galleryImages = [
  {
    id: '1',
    category: 'temple',
    alt: 'Tarapith Temple entrance',
    caption: 'The sacred entrance to Tarapith Kali Mandir',
  },
  {
    id: '2',
    category: 'temple',
    alt: 'Temple complex view',
    caption: 'Overview of the temple complex',
  },
  {
    id: '3',
    category: 'destination',
    alt: 'Birchandrapur village',
    caption: 'Peaceful village of Birchandrapur',
  },
  {
    id: '4',
    category: 'destination',
    alt: 'Nitai Bari temple',
    caption: 'Sacred site at Nitai Bari',
  },
  {
    id: '5',
    category: 'experience',
    alt: 'Evening aarti',
    caption: 'Evening aarti ceremony at the temple',
  },
  {
    id: '6',
    category: 'experience',
    alt: 'Cultural experience',
    caption: 'Learning about local traditions',
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-600/20 text-amber-500">Visual Journey</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Glimpses of the mystical Tarapith experience. Photos from our tours and the beautiful surroundings.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <Card key={image.id} className="bg-card border-border overflow-hidden group">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-amber-900/30 to-amber-600/10 flex items-center justify-center relative">
                    <Camera className="h-12 w-12 text-amber-500/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div>
                        <Badge className="mb-2 text-xs">{image.category}</Badge>
                        <p className="text-sm text-white">{image.caption}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Photography is restricted in certain areas of the temple and cremation grounds. 
            Please follow guide instructions during your visit.
          </p>
        </div>
      </div>
    </div>
  )
}
