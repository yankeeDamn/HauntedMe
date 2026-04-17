import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Public endpoint to get packages for the website
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const slug = searchParams.get('slug')

    if (slug) {
      const pkg = await prisma.package.findUnique({
        where: { slug, active: true }
      })
      if (!pkg) {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 })
      }
      return NextResponse.json(pkg)
    }

    const packages = await prisma.package.findMany({
      where: {
        active: true,
        ...(featured === 'true' ? { featured: true } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}
