import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-utils'
import { destinationSchema } from '@/lib/validations'

// GET all destinations (admin)
export async function GET() {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const destinations = await prisma.destination.findMany({
      orderBy: [
        { isPrimary: 'desc' },
        { sortOrder: 'asc' }
      ]
    })

    return NextResponse.json(destinations)
  } catch (error) {
    console.error('Error fetching destinations:', error)
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 })
  }
}

// POST create new destination
export async function POST(request: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const body = await request.json()
    const result = destinationSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const destination = await prisma.destination.create({
      data: result.data
    })

    return NextResponse.json(destination, { status: 201 })
  } catch (error) {
    console.error('Error creating destination:', error)
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 })
  }
}
