import { NextRequest, NextResponse } from 'next/server'
import { withMongoDB } from '@/lib/mongodb'

async function handler(req: NextRequest) {
  if (req.method === 'GET') {
    return NextResponse.json({ status: 'connected', message: 'MongoDB connection successful' }, { status: 200 })
  }

  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export const GET = withMongoDB(handler)
