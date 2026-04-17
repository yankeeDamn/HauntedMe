import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, Heart, Camera, Users, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'FAQ & Safety',
  description: 'Frequently asked questions and important safety information for your Tarapith trip. Learn about our respectful, permission-based folklore tours.',
}

const faqs = [
  {
    category: 'booking',
    question: 'How do I book a package?',
    answer: 'You can book by filling out the inquiry form on our website, calling us directly, or sending a WhatsApp message. We will contact you within 24 hours to confirm details and finalize your booking.',
  },
  {
    category: 'booking',
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI payments, bank transfers, and cash on arrival. For advance bookings, we may require a 30% deposit which can be paid via UPI or bank transfer.',
  },
  {
    category: 'booking',
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 7+ days before the trip: Full refund minus processing fees. 3-7 days before: 50% refund. Less than 3 days: No refund. We recommend travel insurance for unexpected situations.',
  },
  {
    category: 'safety',
    question: 'Is the "haunted experience" safe?',
    answer: 'Yes, absolutely! Our folklore experience is a guided cultural and storytelling walk. We maintain respectful distance from sacred areas, follow all local rules, and operate with proper permissions. It is NOT about provoking spirits or occult practices - it is about learning the rich history and legends of Tarapith.',
  },
  {
    category: 'safety',
    question: 'Is there an age limit for the folklore night experience?',
    answer: 'We recommend participants be 18 years or older. The experience involves walking at night and hearing stories about death, cremation traditions, and local legends. Those with heart conditions, anxiety disorders, or those easily frightened should consider skipping this activity.',
  },
  {
    category: 'general',
    question: 'What is the best time to visit Tarapith?',
    answer: 'Tarapith can be visited year-round. October to March offers pleasant weather. Special times include Kali Puja (October/November), Bengali New Year (April), and Tuesdays and Saturdays which are considered auspicious for Goddess Tara.',
  },
  {
    category: 'general',
    question: 'How do I reach Tarapith?',
    answer: 'The nearest railway station is Rampurhat (about 6 km from Tarapith). Trains run frequently from Kolkata (Sealdah). From Kolkata Airport, you can take a train or hire a car (approximately 5-6 hours drive).',
  },
  {
    category: 'general',
    question: 'Is there a dress code for the temple?',
    answer: 'Traditional/modest attire is recommended. For men: dhoti/kurta or full-length pants with a shirt. For women: saree, salwar kameez, or modest full-length outfits. Avoid shorts, sleeveless tops, and very tight/revealing clothing.',
  },
  {
    category: 'general',
    question: 'Is photography allowed?',
    answer: 'Photography is restricted inside the main temple and near the cremation grounds. Always follow guide instructions. Photography of rituals or other visitors without consent is discouraged. Drones are not permitted.',
  },
]

const safetyGuidelines = [
  {
    icon: Shield,
    title: 'Respect Sacred Sites',
    description: 'Maintain respectful behavior at all times. Do not touch idols, enter restricted areas, or disturb ongoing rituals.',
  },
  {
    icon: Camera,
    title: 'Photography Rules',
    description: 'Photography is restricted in certain areas. Always ask permission and follow guide instructions. No drones allowed.',
  },
  {
    icon: Heart,
    title: 'Health Considerations',
    description: 'The folklore night experience is not suitable for those with heart conditions, anxiety, or those who are easily frightened.',
  },
  {
    icon: Users,
    title: 'Group Safety',
    description: 'Stay with your group during tours. Do not wander off alone, especially during night experiences.',
  },
]

export default function FAQPage() {
  const bookingFaqs = faqs.filter(f => f.category === 'booking')
  const safetyFaqs = faqs.filter(f => f.category === 'safety')
  const generalFaqs = faqs.filter(f => f.category === 'general')

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-600/20 text-amber-500">Help & Information</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FAQ & <span className="gradient-text">Safety</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Important information about booking, safety, and what to expect on your Tarapith journey.
          </p>
        </div>

        {/* Safety Disclaimer */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-amber-950/30 border-amber-900/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <CardTitle className="text-amber-500">Important Safety Notice</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-amber-200/90">
                <p>
                  Our &quot;haunted experience&quot; is a <strong>GUIDED FOLKLORE AND STORYTELLING NIGHT-WALK</strong>. 
                  It is designed to be respectful, safe, and permission-based.
                </p>
                <div>
                  <strong>WE DO NOT ENCOURAGE:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-amber-200/70">
                    <li>Trespassing or entering restricted areas</li>
                    <li>Unsafe or reckless behavior</li>
                    <li>Disrespecting cremation grounds, graveyards, or sacred sites</li>
                    <li>Any occult practices or attempts to &quot;provoke spirits&quot;</li>
                  </ul>
                </div>
                <p>
                  All tours operate with proper permissions and follow local rules. Photography may be restricted in certain areas. 
                  Please respect all guidelines provided by our guides.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Badge variant="warning" className="bg-amber-600/30 text-amber-300 border-amber-600/50">
                    18+ Recommended
                  </Badge>
                  <Badge variant="warning" className="bg-amber-600/30 text-amber-300 border-amber-600/50">
                    Not for Heart Conditions
                  </Badge>
                  <Badge variant="warning" className="bg-amber-600/30 text-amber-300 border-amber-600/50">
                    Not for Anxiety Disorders
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Safety Guidelines */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Safety Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyGuidelines.map((guideline, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <guideline.icon className="h-8 w-8 text-amber-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{guideline.title}</h3>
                      <p className="text-sm text-muted-foreground">{guideline.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Safety FAQs */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-amber-500" />
              Safety Questions
            </h2>
            <div className="space-y-4">
              {safetyFaqs.map((faq, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking FAQs */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Booking Questions</h2>
            <div className="space-y-4">
              {bookingFaqs.map((faq, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* General FAQs */}
          <div>
            <h2 className="text-2xl font-bold mb-6">General Questions</h2>
            <div className="space-y-4">
              {generalFaqs.map((faq, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <Card className="bg-card border-border">
            <CardContent className="py-8">
              <Phone className="h-10 w-10 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re here to help! Contact us for any questions or concerns.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
