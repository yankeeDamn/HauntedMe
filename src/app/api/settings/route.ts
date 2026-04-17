import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Public endpoint to get site settings
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' }
    })

    if (!settings) {
      // Create default settings if not exists
      settings = await prisma.siteSettings.create({
        data: {
          id: 'default',
          siteName: 'Tarapith Haunted Travel Experience',
          tagline: 'Discover the Mystical Side of Tarapith',
          safetyDisclaimer: `IMPORTANT SAFETY NOTICE:

Our "haunted experience" is a guided folklore and storytelling night-walk. It is designed to be respectful, safe, and permission-based. We DO NOT encourage:
- Trespassing or entering restricted areas
- Unsafe or reckless behavior
- Disrespecting cremation grounds, graveyards, or sacred sites
- Any occult practices or attempts to "provoke spirits"

All tours operate with proper permissions and follow local rules. Photography may be restricted in certain areas. Please respect all guidelines provided by our guides.

AGE GUIDANCE: 18+ recommended. Not suitable for those with heart conditions, anxiety disorders, or those easily frightened.

By booking, you acknowledge and accept these terms.`,
        }
      })
    }

    // Don't expose sensitive payment keys publicly
    return NextResponse.json({
      siteName: settings.siteName,
      tagline: settings.tagline,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      whatsappNumber: settings.whatsappNumber,
      address: settings.address,
      facebookUrl: settings.facebookUrl,
      instagramUrl: settings.instagramUrl,
      youtubeUrl: settings.youtubeUrl,
      depositEnabled: settings.depositEnabled,
      depositPercent: settings.depositPercent,
      safetyDisclaimer: settings.safetyDisclaimer,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}
