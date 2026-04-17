import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-utils'
import { destinationSchema } from '@/lib/validations'

// GET single destination
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const { id } = await params
    const destination = await prisma.destination.findUnique({
      where: { id }
    })

    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    console.error('Error fetching destination:', error)
    return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 })
  }
}

// PUT update destination
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const { id } = await params
    const body = await request.json()
    const result = destinationSchema.partial().safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: result.data
    })

    return NextResponse.json(destination)
  } catch (error) {
    console.error('Error updating destination:', error)
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 })
  }
}

// DELETE destination
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const { id } = await params
    await prisma.destination.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting destination:', error)
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 })
  }
}
