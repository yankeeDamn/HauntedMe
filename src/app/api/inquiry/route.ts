import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { inquirySchema } from '@/lib/validations'

// Simple in-memory rate limiting (for MVP - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests
const RATE_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }
  
  if (record.count >= RATE_LIMIT) {
    return false
  }
  
  record.count++
  return true
}

// Sanitize input to prevent XSS
function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const result = inquirySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data

    // Sanitize text fields
    const sanitizedData = {
      name: sanitize(data.name),
      email: data.email ? sanitize(data.email) : null,
      phone: sanitize(data.phone),
      travelDate: data.travelDate ? new Date(data.travelDate) : null,
      groupSize: data.groupSize,
      packageId: data.packageId || null,
      message: data.message ? sanitize(data.message) : null,
      customizations: data.customizations ? data.customizations : undefined,
      source: 'website',
    }

    // Calculate estimated price if customizations provided
    let estimatedPrice = null
    if (data.packageId) {
      const pkg = await prisma.package.findUnique({
        where: { id: data.packageId }
      })
      if (pkg) {
        estimatedPrice = pkg.price * (data.groupSize || 1)
        // Add add-on prices if selected
        if (data.customizations?.addOns) {
          const addOns = await prisma.addOn.findMany({
            where: { id: { in: data.customizations.addOns } }
          })
          estimatedPrice += addOns.reduce((sum: number, addon: { price: number }) => sum + addon.price, 0) * (data.groupSize || 1)
        }
      }
    }

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        ...sanitizedData,
        estimatedPrice,
      }
    })

    // TODO: Send email notification to admin
    // TODO: Optional: Send WhatsApp notification

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your inquiry! We will contact you shortly.',
        leadId: lead.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Inquiry submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
