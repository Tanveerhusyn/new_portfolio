'use client'

import { useState } from 'react'
import { MessageForm } from '@/components/molecules/message-form'
import { MessageBoard } from '@/components/molecules/message-board'
import { FadeIn } from '@/components/atoms/fade-in'
import { GridPattern } from '@/components/atoms/grid-pattern'

export default function MessagesPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleMessageSubmit = () => {
    // Increment the refresh trigger to cause the message board to reload
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className='min-h-screen h-full bg-gradient-to-b from-gray-900 to-gray-950 text-white relative'>
      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-gray-800/10 fill-gray-800/5 dark:stroke-gray-600/10 stroke-gray-600/5 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_50%)]'
        yOffset={-96}
        interactive
      />

      <div className='max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <FadeIn>
          <div className='text-center mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>Visitors Board</h1>
            <p className='mt-3 text-gray-400 max-w-2xl mx-auto'>Leave a sticky note message for Tanveer. Share your thoughts, feedback, or just say hello!</p>
          </div>
        </FadeIn>

        {/* Desktop layout */}
        <div className='hidden lg:flex gap-8 items-start mb-16'>
          {/* Message Board */}
          <div className='w-90 flex-grow'>
            <FadeIn>
              <MessageBoard refreshTrigger={refreshTrigger} />
            </FadeIn>
          </div>

          {/* Form */}
          <div className='w-96 flex-shrink-0'>
            <div className='sticky top-20'>
              <MessageForm onMessageSubmit={handleMessageSubmit} />
            </div>
          </div>
        </div>

        {/* Mobile and tablet layout - board above form */}
        <div className='lg:hidden space-y-8 mb-16'>
          <FadeIn>
            <MessageBoard refreshTrigger={refreshTrigger} />
          </FadeIn>

          <MessageForm onMessageSubmit={handleMessageSubmit} />
        </div>
      </div>
    </div>
  )
}
