import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Plus, Edit } from 'lucide-react'

const faqs = [
  {
    id: '1',
    question: 'How do I book a package?',
    answer: 'You can book by filling out the inquiry form...',
    category: 'booking',
    active: true,
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI payments, bank transfers, and cash on arrival...',
    category: 'booking',
    active: true,
  },
  {
    id: '3',
    question: 'Is the "haunted experience" safe?',
    answer: 'Yes, absolutely! Our folklore experience is a guided cultural walk...',
    category: 'safety',
    active: true,
  },
  {
    id: '4',
    question: 'What is the best time to visit Tarapith?',
    answer: 'Tarapith can be visited year-round. October to March offers pleasant weather...',
    category: 'general',
    active: true,
  },
]

export default async function AdminFAQsPage() {
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
              <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
              <p className="text-gray-600">Manage frequently asked questions</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs capitalize">{faq.category}</Badge>
                      {!faq.active && <Badge variant="secondary">Hidden</Badge>}
                    </div>
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">{faq.answer}</CardDescription>
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
