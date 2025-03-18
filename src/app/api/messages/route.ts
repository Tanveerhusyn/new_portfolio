import { NextRequest, NextResponse } from 'next/server'
import { withMongoDB } from '@/lib/mongodb'
import { connectToDatabase } from '@/lib/mongoose'
import { Message } from '@/models/schemas/Message'

// Get all messages
async function getHandler() {
  try {
    await connectToDatabase()
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(100)
    return NextResponse.json(messages, { status: 200 })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

// Post a new message
async function postHandler(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    await connectToDatabase()
    const newMessage = new Message({
      name,
      email,
      message
    })

    await newMessage.save()
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
}

export const GET = withMongoDB(getHandler)
export const POST = withMongoDB(postHandler)
