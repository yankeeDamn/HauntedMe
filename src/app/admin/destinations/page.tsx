import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Plus, Edit } from 'lucide-react'

const destinations = [
  {
    id: '1',
    name: 'Tarapith',
    slug: 'tarapith',
    isPrimary: true,
    isSide: false,
    distance: 'Main destination',
    active: true,
  },
  {
    id: '2',
    name: 'Birchandrapur',
    slug: 'birchandrapur',
    isPrimary: false,
    isSide: true,
    distance: '~12 km from Tarapith',
    active: true,
  },
  {
    id: '3',
    name: 'Nitai Bari',
    slug: 'nitai-bari',
    isPrimary: false,
    isSide: true,
    distance: '~15 km from Tarapith',
    active: true,
  },
]

export default async function AdminDestinationsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
              <p className="text-gray-600">Manage destinations shown on your website</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          </div>

          <div className="grid gap-4">
            {destinations.map((dest) => (
              <Card key={dest.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{dest.name}</CardTitle>
                      {dest.isPrimary && <Badge className="bg-amber-100 text-amber-800">Primary</Badge>}
                      {dest.isSide && <Badge variant="secondary">Side Destination</Badge>}
                      {!dest.active && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {dest.distance}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
