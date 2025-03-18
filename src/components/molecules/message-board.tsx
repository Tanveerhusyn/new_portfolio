import { useState, useEffect } from 'react'
import { FadeIn } from '@/components/atoms/fade-in'
import { format } from 'date-fns'

interface Message {
  _id: string
  name: string
  message: string
  createdAt: string
}

// Array of sticky note colors
const stickyColors = [
  'bg-yellow-300', // Yellow
  'bg-blue-200', // Blue
  'bg-green-200', // Green
  'bg-pink-200', // Pink
  'bg-purple-200', // Purple
  'bg-orange-200' // Orange
]

// Array of rotation angles for transform
const rotationStyles = ['rotate-[-3deg]', 'rotate-[-2deg]', 'rotate-[-1deg]', 'rotate-[0deg]', 'rotate-[1deg]', 'rotate-[2deg]', 'rotate-[3deg]']

export function MessageBoard({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('/api/messages')

        if (!response.ok) {
          throw new Error('Failed to fetch messages')
        }

        const data = await response.json()
        setMessages(data)
      } catch (err) {
        setError('Could not load messages. Please try again later.')
        console.error('Error fetching messages:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [refreshTrigger])

  // Function to get a random item from an array
  const getRandomItem = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-pulse flex space-x-2'>
          <div className='h-3 w-3 bg-blue-400 rounded-full animate-bounce'></div>
          <div className='h-3 w-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]'></div>
          <div className='h-3 w-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]'></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center text-red-500 py-4'>
        <p>{error}</p>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className='text-center text-gray-400 py-8'>
        <p>No messages yet. Be the first to leave a message!</p>
      </div>
    )
  }

  return (
    <div className='w-full min-h-[700px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14'>
        {messages.map((message, index) => {
          // Get random color and rotation for each sticky note
          const color = getRandomItem(stickyColors)
          const rotation = getRandomItem(rotationStyles)

          return (
            <div
              key={message._id}
              className={`${color} p-4 shadow-md ${rotation} hover:rotate-0 transition-all duration-300 relative hover:z-10 hover:shadow-lg`}
              style={{
                transformOrigin: 'center',
                boxShadow: '2px 3px 5px rgba(0, 0, 0, 0.3)',
                clipPath:
                  'polygon(0% 0%, 100% 0%, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0% 100%)'
              }}
            >
              {/* Push pin for the sticky note */}
              <div className='absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800/70 shadow z-10'></div>

              <div className='mb-3 pb-2 border-b border-gray-700/10'>
                <div className='flex justify-between items-center'>
                  <h3 className='font-medium text-gray-800'>{message.name}</h3>
                  <span className='text-xs text-gray-600'>{format(new Date(message.createdAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <p className='text-gray-700 text-sm whitespace-pre-wrap font-handwriting'>{message.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
