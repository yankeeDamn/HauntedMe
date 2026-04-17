'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calculator, Send, CheckCircle, AlertTriangle } from 'lucide-react'

const packages = [
  { id: 'basic-tarapith', name: 'Basic Package', price: 5000 },
  { id: 'standard-tarapith', name: 'Standard Package', price: 7500 },
  { id: 'premium-tarapith', name: 'Premium Experience', price: 10000 },
]

const addOns = [
  { id: 'extra-night', name: 'Extra Night Stay', price: 1500, category: 'accommodation' },
  { id: 'premium-hotel', name: 'Premium Hotel Upgrade', price: 2000, category: 'accommodation' },
  { id: 'private-car', name: 'Private AC Car', price: 1500, category: 'transport' },
  { id: 'special-pickup', name: 'Airport/Special Station Pickup', price: 3000, category: 'transport' },
  { id: 'folklore-experience', name: 'Guided Folklore Night Experience', price: 1000, category: 'experience' },
  { id: 'side-destination', name: 'Additional Side Destination', price: 800, category: 'experience' },
  { id: 'special-pooja', name: 'Special Pooja Arrangement', price: 1100, category: 'experience' },
  { id: 'personal-guide', name: 'Dedicated Personal Guide', price: 1500, category: 'experience' },
]

const pickupStations = [
  'Rampurhat (Nearest)',
  'Sealdah (Kolkata)',
  'Howrah (Kolkata)',
  'Kolkata Airport',
  'Other (specify in message)',
]

export default function CustomizePage() {
  const [selectedPackage, setSelectedPackage] = useState('')
  const [groupSize, setGroupSize] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [hotelTier, setHotelTier] = useState('mid')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Calculate estimated price using useMemo
  const estimatedPrice = useMemo(() => {
    let price = 0
    
    // Base package price
    const pkg = packages.find(p => p.id === selectedPackage)
    if (pkg) {
      price += pkg.price * groupSize
    }
    
    // Add-on prices
    selectedAddOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId)
      if (addon) {
        price += addon.price * groupSize
      }
    })
    
    // Hotel tier adjustment
    if (hotelTier === 'budget') {
      price -= 500 * groupSize
    } else if (hotelTier === 'premium') {
      price += 1000 * groupSize
    }
    
    return price
  }, [selectedPackage, groupSize, selectedAddOns, hotelTier])

  function toggleAddOn(addonId: string) {
    setSelectedAddOns(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      travelDate: formData.get('travelDate') as string,
      groupSize,
      packageId: selectedPackage,
      message: formData.get('message') as string,
      customizations: {
        hotelTier,
        pickupStation: formData.get('pickupStation') as string,
        addOns: selectedAddOns,
      },
    }

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to submit inquiry')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto">
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Inquiry Submitted!</h2>
              <p className="text-muted-foreground mb-4">
                Thank you for your interest! We&apos;ll contact you within 24 hours to discuss your customized trip.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Estimated Price: <span className="text-amber-500 font-bold">₹{estimatedPrice.toLocaleString()}</span>
              </p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Submit Another Inquiry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-600/20 text-amber-500">Build Your Trip</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Customize Your Journey</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your preferences and we&apos;ll create the perfect Tarapith experience for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="md:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" required minLength={2} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" name="phone" type="tel" required minLength={10} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input id="email" name="email" type="email" />
                  </div>
                </CardContent>
              </Card>

              {/* Trip Details */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travelDate">Preferred Travel Date</Label>
                      <Input id="travelDate" name="travelDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Group Size</Label>
                      <Input 
                        id="groupSize" 
                        type="number" 
                        min={1} 
                        max={50} 
                        value={groupSize}
                        onChange={e => setGroupSize(parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickupStation">Pickup Station</Label>
                    <Select id="pickupStation" name="pickupStation">
                      {pickupStations.map(station => (
                        <option key={station} value={station}>{station}</option>
                      ))}
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Package Selection */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Select Base Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {packages.map(pkg => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-4 rounded-lg border text-left transition-colors ${
                          selectedPackage === pkg.id
                            ? 'border-amber-500 bg-amber-600/10'
                            : 'border-border hover:border-amber-600/50'
                        }`}
                      >
                        <p className="font-semibold">{pkg.name}</p>
                        <p className="text-amber-500 font-bold">₹{pkg.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hotel Tier */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Hotel Preference</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'budget', name: 'Budget', desc: 'Clean & basic', adjust: '-₹500/person' },
                      { id: 'mid', name: 'Standard', desc: 'Comfortable', adjust: 'Included' },
                      { id: 'premium', name: 'Premium', desc: 'Best available', adjust: '+₹1,000/person' },
                    ].map(tier => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setHotelTier(tier.id)}
                        className={`p-4 rounded-lg border text-center transition-colors ${
                          hotelTier === tier.id
                            ? 'border-amber-500 bg-amber-600/10'
                            : 'border-border hover:border-amber-600/50'
                        }`}
                      >
                        <p className="font-semibold">{tier.name}</p>
                        <p className="text-xs text-muted-foreground">{tier.desc}</p>
                        <p className="text-xs text-amber-500 mt-1">{tier.adjust}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Add-ons</CardTitle>
                  <CardDescription>Enhance your experience with these optional add-ons</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['accommodation', 'transport', 'experience'].map(category => (
                      <div key={category}>
                        <h4 className="text-sm font-semibold text-amber-500 mb-2 capitalize">{category}</h4>
                        <div className="space-y-2">
                          {addOns.filter(a => a.category === category).map(addon => (
                            <label
                              key={addon.id}
                              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedAddOns.includes(addon.id)
                                  ? 'border-amber-500 bg-amber-600/10'
                                  : 'border-border hover:border-amber-600/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={selectedAddOns.includes(addon.id)}
                                  onChange={() => toggleAddOn(addon.id)}
                                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="text-sm">{addon.name}</span>
                              </div>
                              <span className="text-sm text-amber-500">+₹{addon.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    name="message"
                    placeholder="Any special requirements, questions, or preferences..."
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Safety Notice for Folklore Experience */}
              {selectedAddOns.includes('folklore-experience') && (
                <div className="p-4 bg-amber-950/30 rounded-lg border border-amber-900/30">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-amber-500 mb-1">Folklore Night Experience Selected</p>
                      <p className="text-amber-200/80">
                        This is a guided cultural storytelling walk. 18+ recommended. Not suitable for those 
                        with heart conditions or anxiety. All tours are respectful and permission-based.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Price Summary Sidebar */}
            <div>
              <div className="sticky top-24">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-amber-500" />
                      Price Estimate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {selectedPackage && (
                        <div className="flex justify-between text-sm">
                          <span>{packages.find(p => p.id === selectedPackage)?.name}</span>
                          <span>₹{((packages.find(p => p.id === selectedPackage)?.price || 0) * groupSize).toLocaleString()}</span>
                        </div>
                      )}
                      {hotelTier !== 'mid' && (
                        <div className="flex justify-between text-sm">
                          <span>Hotel Adjustment</span>
                          <span className={hotelTier === 'budget' ? 'text-green-500' : 'text-amber-500'}>
                            {hotelTier === 'budget' ? '-' : '+'}₹{(hotelTier === 'budget' ? 500 : 1000) * groupSize}
                          </span>
                        </div>
                      )}
                      {selectedAddOns.map(addonId => {
                        const addon = addOns.find(a => a.id === addonId)
                        return addon ? (
                          <div key={addonId} className="flex justify-between text-sm">
                            <span>{addon.name}</span>
                            <span>+₹{(addon.price * groupSize).toLocaleString()}</span>
                          </div>
                        ) : null
                      })}
                      <div className="border-t border-border pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Estimated Total</span>
                          <span className="text-2xl font-bold text-amber-500">
                            ₹{estimatedPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          For {groupSize} {groupSize === 1 ? 'person' : 'people'}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-4">
                      * Final price may vary based on actual availability and specific requirements
                    </p>

                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 mb-4">
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isSubmitting || !selectedPackage}>
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
