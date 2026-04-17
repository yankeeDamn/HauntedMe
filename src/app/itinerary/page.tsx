import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Sun, Moon, Coffee, Camera, AlertTriangle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sample Itinerary',
  description: 'View sample 1-day and 2-day itineraries for your Tarapith trip. Plan your spiritual journey with our detailed day-by-day schedules.',
}

const oneDayItinerary = [
  { time: '06:00 AM', activity: 'Pickup from Rampurhat station', icon: MapPin },
  { time: '07:00 AM', activity: 'Arrival at Tarapith, freshen up', icon: Coffee },
  { time: '08:00 AM', activity: 'Temple darshan and guided tour', icon: Sun },
  { time: '10:30 AM', activity: 'Tea break and local exploration', icon: Coffee },
  { time: '12:00 PM', activity: 'Visit Bamakhyapa samadhi & temple surroundings', icon: MapPin },
  { time: '01:00 PM', activity: 'Lunch break (self-arranged or at local restaurant)', icon: Coffee },
  { time: '02:30 PM', activity: 'Free time for shopping at spiritual market', icon: Camera },
  { time: '03:30 PM', activity: 'Return journey to station', icon: MapPin },
  { time: '04:30 PM', activity: 'Drop at Rampurhat station', icon: MapPin },
]

const twoDayItinerary = {
  day1: [
    { time: '09:00 AM', activity: 'Pickup from Rampurhat station', icon: MapPin },
    { time: '10:00 AM', activity: 'Check-in at hotel, freshen up', icon: Coffee },
    { time: '11:30 AM', activity: 'Temple darshan and detailed guided tour', icon: Sun },
    { time: '02:00 PM', activity: 'Lunch break', icon: Coffee },
    { time: '04:00 PM', activity: 'Explore local market and temple surroundings', icon: Camera },
    { time: '06:30 PM', activity: 'Evening aarti at temple', icon: Moon },
    { time: '08:00 PM', activity: 'Return to hotel, dinner (self-arranged)', icon: Coffee },
  ],
  day2: [
    { time: '07:00 AM', activity: 'Breakfast at hotel', icon: Coffee },
    { time: '08:30 AM', activity: 'Check-out and visit side destination (Birchandrapur or Nitai Bari)', icon: MapPin },
    { time: '12:00 PM', activity: 'Lunch break', icon: Coffee },
    { time: '02:00 PM', activity: 'Return to Tarapith, final temple visit if time permits', icon: Sun },
    { time: '03:30 PM', activity: 'Drop at Rampurhat station', icon: MapPin },
  ],
}

const premiumItinerary = {
  day1: [
    { time: '09:00 AM', activity: 'Pickup from Rampurhat station in AC vehicle', icon: MapPin },
    { time: '10:00 AM', activity: 'Check-in at premium hotel', icon: Coffee },
    { time: '11:00 AM', activity: 'Freshen up, welcome refreshments', icon: Coffee },
    { time: '12:30 PM', activity: 'Lunch at hotel', icon: Coffee },
    { time: '02:30 PM', activity: 'Temple darshan with detailed guided tour', icon: Sun },
    { time: '05:30 PM', activity: 'Tea break, temple surroundings exploration', icon: Coffee },
    { time: '07:00 PM', activity: 'Evening aarti at temple', icon: Moon },
    { time: '08:30 PM', activity: 'Dinner at hotel', icon: Coffee },
  ],
  day2: [
    { time: '07:30 AM', activity: 'Breakfast at hotel', icon: Coffee },
    { time: '09:00 AM', activity: 'Visit Birchandrapur', icon: MapPin },
    { time: '12:00 PM', activity: 'Lunch', icon: Coffee },
    { time: '02:00 PM', activity: 'Visit Nitai Bari', icon: MapPin },
    { time: '05:00 PM', activity: 'Return to hotel, rest', icon: Coffee },
    { time: '07:00 PM', activity: 'Dinner', icon: Coffee },
    { time: '09:00 PM', activity: 'Guided Folklore Night Experience (approx 2 hrs)', icon: Moon },
    { time: '11:00 PM', activity: 'Return to hotel', icon: Coffee },
  ],
  day3: [
    { time: '05:30 AM', activity: 'Early morning temple darshan (optional)', icon: Sun },
    { time: '07:30 AM', activity: 'Breakfast at hotel', icon: Coffee },
    { time: '09:00 AM', activity: 'Check-out, free time for shopping', icon: Camera },
    { time: '11:00 AM', activity: 'Lunch (packed or local)', icon: Coffee },
    { time: '01:00 PM', activity: 'Drop at Rampurhat station', icon: MapPin },
  ],
}

function TimelineItem({ time, activity, icon: Icon }: { time: string; activity: string; icon: typeof Clock }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-20 text-right">
        <span className="text-sm font-medium text-amber-500">{time}</span>
      </div>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center">
        <Icon className="h-4 w-4 text-amber-500" />
      </div>
      <div className="flex-grow pb-6 border-l-2 border-amber-600/20 pl-4 -ml-4">
        <p className="text-sm">{activity}</p>
      </div>
    </div>
  )
}

export default function ItineraryPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-600/20 text-amber-500">Plan Your Trip</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sample <span className="gradient-text">Itineraries</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get an idea of how your Tarapith journey will unfold. These are sample schedules - 
            actual timings may vary based on weather, traffic, and temple schedules.
          </p>
        </div>

        {/* 1-Day Itinerary */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <CardTitle>1-Day Basic Itinerary</CardTitle>
              </div>
              <CardDescription>Perfect for day-trippers and those short on time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {oneDayItinerary.map((item, index) => (
                  <TimelineItem key={index} {...item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2-Day Itinerary */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <CardTitle>2-Day Standard Itinerary</CardTitle>
              </div>
              <CardDescription>Recommended for a complete Tarapith experience with one side destination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-amber-500 mb-4">Day 1: Arrival & Temple</h4>
                  <div className="space-y-0">
                    {twoDayItinerary.day1.map((item, index) => (
                      <TimelineItem key={index} {...item} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-500 mb-4">Day 2: Side Destination & Departure</h4>
                  <div className="space-y-0">
                    {twoDayItinerary.day2.map((item, index) => (
                      <TimelineItem key={index} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3-Day Premium Itinerary */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-card border-border ring-2 ring-amber-600/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-600">Premium</Badge>
                <CardTitle>3-Day Premium Experience</CardTitle>
              </div>
              <CardDescription>Complete experience with premium stay, multiple destinations, and folklore night walk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-500 mb-4">Day 1: Arrival & Temple</h4>
                  <div className="space-y-0">
                    {premiumItinerary.day1.map((item, index) => (
                      <TimelineItem key={index} {...item} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-500 mb-4">Day 2: Exploration & Folklore</h4>
                  <div className="space-y-0">
                    {premiumItinerary.day2.map((item, index) => (
                      <TimelineItem key={index} {...item} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-500 mb-4">Day 3: Morning & Departure</h4>
                  <div className="space-y-0">
                    {premiumItinerary.day3.map((item, index) => (
                      <TimelineItem key={index} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Folklore Experience Note */}
        <div className="max-w-3xl mx-auto p-6 bg-amber-950/30 rounded-lg border border-amber-900/30">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-500 mb-2">About the Folklore Night Experience</h4>
              <p className="text-sm text-amber-200/80">
                The folklore night experience (included in Premium package, Day 2 evening) is a <strong>guided cultural storytelling walk</strong> near 
                the cremation ground area. Our guides share the history, legends, and traditions of Tarapith in a respectful manner.
              </p>
              <ul className="text-sm text-amber-200/70 mt-3 space-y-1">
                <li>• We maintain respectful distance from active cremation areas</li>
                <li>• All tours operate with proper permissions</li>
                <li>• Photography may be restricted in certain areas</li>
                <li>• 18+ recommended; not suitable for those with heart conditions or anxiety</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
