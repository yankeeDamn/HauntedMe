import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Public endpoint to get add-ons for the customization form
export async function GET() {
  try {
    const addOns = await prisma.addOn.findMany({
      where: { active: true },
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' },
      ],
    })

    return NextResponse.json(addOns)
  } catch (error) {
    console.error('Error fetching add-ons:', error)
    return NextResponse.json({ error: 'Failed to fetch add-ons' }, { status: 500 })
  }
}
