import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-utils'
import { leadUpdateSchema } from '@/lib/validations'

// GET all leads with filters
export async function GET(request: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where = status ? { status: status as 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'CLOSED' | 'CANCELLED' } : {}

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          package: {
            select: { name: true, price: true }
          },
          assignedTo: {
            select: { name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where })
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

// Export leads as CSV
export async function POST(request: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const { action } = await request.json()
    
    if (action === 'export') {
      const leads = await prisma.lead.findMany({
        include: {
          package: { select: { name: true } },
          assignedTo: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
      })

      // Generate CSV
      const headers = ['ID', 'Name', 'Email', 'Phone', 'Travel Date', 'Group Size', 'Package', 'Status', 'Estimated Price', 'Assigned To', 'Created At', 'Message']
      const rows = leads.map((lead: {
        id: string
        name: string
        email: string | null
        phone: string
        travelDate: Date | null
        groupSize: number
        package: { name: string } | null
        status: string
        estimatedPrice: number | null
        assignedTo: { name: string | null } | null
        createdAt: Date
        message: string | null
      }) => [
        lead.id,
        lead.name,
        lead.email || '',
        lead.phone,
        lead.travelDate ? new Date(lead.travelDate).toLocaleDateString() : '',
        lead.groupSize,
        lead.package?.name || '',
        lead.status,
        lead.estimatedPrice || '',
        lead.assignedTo?.name || '',
        new Date(lead.createdAt).toLocaleDateString(),
        (lead.message || '').replace(/,/g, ';').replace(/\n/g, ' ')
      ])

      const csv = [headers, ...rows].map(row => row.join(',')).join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=leads-${new Date().toISOString().split('T')[0]}.csv`
        }
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing leads:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
