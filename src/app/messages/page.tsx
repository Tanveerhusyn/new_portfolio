'use client'

import { useState } from 'react'
import { MessageForm } from '@/components/molecules/message-form'
import { MessageBoard } from '@/components/molecules/message-board'
import { FadeIn } from '@/components/atoms/fade-in'
import { GridPattern } from '@/components/atoms/grid-pattern'

export default function MessagesPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleMessageSubmit = () => {
    // Increment the refresh trigger to cause the message board to reload
    setRefreshTrigger(prev => prev + 1)
    setShowForm(false)
  }

  return (
    <div className='min-h-screen h-full py-10 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white relative overflow-hidden'>
      {/* Background effects */}
      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-gray-800/10 fill-gray-800/5 dark:stroke-gray-600/10 stroke-gray-600/5 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_50%)]'
        yOffset={-96}
        interactive
      />
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5'></div>
      <div className='absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10'>
        <FadeIn>
          <div className='text-center mb-12'>
            <span className='inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4'>Connect With Me</span>
            {/* <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'>
              Digital Guestbook
            </h1> */}
            <p className='mt-4 text-lg text-gray-400 max-w-2xl mx-auto'>Leave your mark in my digital space. Share your thoughts, ideas, or simply say hello!</p>
          </div>
        </FadeIn>

        {/* Main Content */}
        <div className='relative'>
          {/* New message button (fixed) */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className='fixed bottom-[100px] right-8 z-40 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
            >
              <span className='absolute -left-32 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-sm py-1 px-2 rounded'>
                New Message
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M12 5v14M5 12h14' />
              </svg>
            </button>
          )}

          {/* Message form (popup) */}
          {showForm && (
            <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
              <div className='max-w-md w-full'>
                <div className='relative'>
                  <button onClick={() => setShowForm(false)} className='absolute -top-4 -right-4 bg-gray-800 text-gray-400 p-2 rounded-full hover:text-white transition-colors'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M18 6 6 18M6 6l12 12' />
                    </svg>
                  </button>
                  <MessageForm onMessageSubmit={handleMessageSubmit} />
                </div>
              </div>
            </div>
          )}

          {/* Message Board */}
          <div>
            <FadeIn>
              <MessageBoard refreshTrigger={refreshTrigger} />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
