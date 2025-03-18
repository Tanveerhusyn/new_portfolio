import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from './mongoose'

/**
 * Middleware for wrapping API routes with MongoDB connection
 *
 * @param handler - The API route handler function
 * @returns A function that connects to MongoDB and calls the handler
 */
export function withMongoDB(handler: (req: NextRequest) => Promise<NextResponse> | NextResponse) {
  return async function (req: NextRequest) {
    try {
      await connectToDatabase()
      return await handler(req)
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}
