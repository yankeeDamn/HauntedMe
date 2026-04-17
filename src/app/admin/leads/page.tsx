import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Download, Phone, Mail, Calendar } from 'lucide-react'

// This would typically fetch from the database
async function getLeads() {
  return []
}

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800',
  CONTACTED: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/admin/login')
  }

  const leads = await getLeads()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leads & Inquiries</h1>
              <p className="text-gray-600">Manage customer inquiries and bookings</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            <Badge className="cursor-pointer">All</Badge>
            <Badge variant="secondary" className="cursor-pointer">New</Badge>
            <Badge variant="secondary" className="cursor-pointer">Contacted</Badge>
            <Badge variant="secondary" className="cursor-pointer">Confirmed</Badge>
            <Badge variant="secondary" className="cursor-pointer">Closed</Badge>
          </div>

          {/* Leads List */}
          {leads.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">No leads yet</h3>
                <p className="text-muted-foreground mb-4">
                  When visitors submit inquiries on your website, they&apos;ll appear here.
                </p>
                <p className="text-sm text-muted-foreground">
                  Make sure your website is live and the inquiry form is working.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Lead cards would be mapped here */}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
