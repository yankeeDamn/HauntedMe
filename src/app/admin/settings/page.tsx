'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Save, Loader2 } from 'lucide-react'

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setIsSaved(false)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your site settings and contact information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Your business contact details shown on the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input id="contactPhone" name="contactPhone" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                    <Input id="whatsappNumber" name="whatsappNumber" defaultValue="+919876543210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input id="contactEmail" name="contactEmail" type="email" defaultValue="info@tarapith.travel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" name="address" defaultValue="Tarapith, Birbhum District, West Bengal, India - 731233" rows={2} />
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Your business name and tagline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" name="siteName" defaultValue="Tarapith Haunted Travel Experience" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" name="tagline" defaultValue="Discover the Mystical Side of Tarapith" />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Your social media profiles (optional)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook URL</Label>
                  <Input id="facebookUrl" name="facebookUrl" type="url" placeholder="https://facebook.com/yourpage" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramUrl">Instagram URL</Label>
                  <Input id="instagramUrl" name="instagramUrl" type="url" placeholder="https://instagram.com/yourprofile" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtubeUrl">YouTube URL</Label>
                  <Input id="youtubeUrl" name="youtubeUrl" type="url" placeholder="https://youtube.com/yourchannel" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment options for bookings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="depositEnabled" name="depositEnabled" className="rounded" />
                  <Label htmlFor="depositEnabled">Enable advance deposit payments</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositPercent">Deposit Percentage</Label>
                    <Input id="depositPercent" name="depositPercent" type="number" defaultValue="30" min="0" max="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" name="upiId" placeholder="yourname@upi" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Disclaimer</CardTitle>
                <CardDescription>Important safety notice shown to visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Textarea 
                    id="safetyDisclaimer" 
                    name="safetyDisclaimer" 
                    rows={6}
                    defaultValue={`Our "haunted experience" is a GUIDED FOLKLORE AND STORYTELLING NIGHT-WALK. It is designed to be respectful, safe, and permission-based.

WE DO NOT ENCOURAGE:
• Trespassing or entering restricted areas
• Unsafe or reckless behavior
• Disrespecting cremation grounds, graveyards, or sacred sites
• Any occult practices or attempts to "provoke spirits"

AGE GUIDANCE: 18+ recommended. Not suitable for those with heart conditions, anxiety disorders, or those easily frightened.`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              {isSaved && (
                <p className="text-green-600 text-sm">Changes saved successfully!</p>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
