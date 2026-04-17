import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Public endpoint to get FAQs for the website
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const faqs = await prisma.fAQ.findMany({
      where: {
        active: true,
        ...(category ? { category } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}
