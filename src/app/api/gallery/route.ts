import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Public endpoint to get gallery images for the website
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const images = await prisma.galleryImage.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(featured === 'true' ? { featured: true } : {}),
      },
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}
