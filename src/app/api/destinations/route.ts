import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Public endpoint to get destinations for the website
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const primary = searchParams.get('primary')
    const side = searchParams.get('side')

    if (slug) {
      const destination = await prisma.destination.findUnique({
        where: { slug, active: true }
      })
      if (!destination) {
        return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
      }
      return NextResponse.json(destination)
    }

    const destinations = await prisma.destination.findMany({
      where: {
        active: true,
        ...(primary === 'true' ? { isPrimary: true } : {}),
        ...(side === 'true' ? { isSide: true, isPrimary: false } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(destinations)
  } catch (error) {
    console.error('Error fetching destinations:', error)
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 })
  }
}
