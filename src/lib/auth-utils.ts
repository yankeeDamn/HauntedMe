import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  
  return { session }
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  
  if ((session.user as { role?: string }).role !== 'ADMIN') {
    return { error: NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 }) }
  }
  
  return { session }
}
