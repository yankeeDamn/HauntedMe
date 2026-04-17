import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-utils'
import { siteSettingsSchema } from '@/lib/validations'

// GET site settings
export async function GET() {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' }
    })

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: 'default' }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT update site settings
export async function PUT(request: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  try {
    const body = await request.json()
    const result = siteSettingsSchema.partial().safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: result.data,
      create: { id: 'default', ...result.data }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
