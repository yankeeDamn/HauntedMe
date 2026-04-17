import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Plus, Edit, Clock } from 'lucide-react'

// Sample packages - in production these would come from database
const packages = [
  {
    id: '1',
    name: 'Basic Tarapith Package',
    slug: 'basic-tarapith',
    price: 5000,
    duration: '1 Day',
    active: true,
    featured: false,
    leads: 0,
  },
  {
    id: '2',
    name: 'Standard Tarapith Package',
    slug: 'standard-tarapith',
    price: 7500,
    duration: '2 Days / 1 Night',
    active: true,
    featured: true,
    leads: 0,
  },
  {
    id: '3',
    name: 'Premium Tarapith Experience',
    slug: 'premium-tarapith',
    price: 10000,
    duration: '3 Days / 2 Nights',
    active: true,
    featured: false,
    leads: 0,
  },
]

export default async function AdminPackagesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
              <p className="text-gray-600">Manage your travel packages</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </div>

          {/* Packages Grid */}
          <div className="grid gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{pkg.name}</CardTitle>
                        {pkg.featured && <Badge className="bg-amber-100 text-amber-800">Featured</Badge>}
                        {!pkg.active && <Badge variant="secondary">Inactive</Badge>}
                      </div>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {pkg.duration}
                        </span>
                        <span>•</span>
                        <span>{pkg.leads} inquiries</span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">₹{pkg.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
