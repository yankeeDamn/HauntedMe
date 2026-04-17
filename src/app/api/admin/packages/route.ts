import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-utils'
import { packageSchema } from '@/lib/validations'

// GET all packages (admin)
export async function GET() {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const packages = await prisma.package.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { leads: true }
        }
      }
    })

    return NextResponse.json(packages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

// POST create new package
export async function POST(request: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const body = await request.json()
    const result = packageSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const pkg = await prisma.package.create({
      data: result.data
    })

    return NextResponse.json(pkg, { status: 201 })
  } catch (error) {
    console.error('Error creating package:', error)
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
  }
}
