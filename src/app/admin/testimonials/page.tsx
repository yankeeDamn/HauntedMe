import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Plus, Star, Edit } from 'lucide-react'

const testimonials = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    content: 'Amazing experience! The guide was very knowledgeable about the temple history.',
    featured: true,
    approved: true,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Kolkata',
    rating: 5,
    content: 'Perfect organization! Pickup from station was on time, hotel was clean and comfortable.',
    featured: true,
    approved: true,
  },
  {
    id: '3',
    name: 'Amit Das',
    location: 'Mumbai',
    rating: 4,
    content: 'Good experience overall. The temple visit was well-organized.',
    featured: false,
    approved: true,
  },
]

export default async function AdminTestimonialsPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
              <p className="text-gray-600">Manage customer reviews and testimonials</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </div>

          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        {testimonial.featured && <Badge className="bg-amber-100 text-amber-800">Featured</Badge>}
                        {!testimonial.approved && <Badge variant="secondary">Pending</Badge>}
                      </div>
                      <CardDescription>{testimonial.location}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
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
