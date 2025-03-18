import { useState } from 'react'
import { FadeIn } from '@/components/atoms/fade-in'
import { Button } from '@/components/atoms/button'

interface MessageFormProps {
  onMessageSubmit: () => void
}

export function MessageForm({ onMessageSubmit }: MessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit message')
      }

      setFormData({
        name: '',
        email: '',
        message: ''
      })
      setSuccess(true)
      onMessageSubmit()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn>
      <div className='bg-gray-800/80 backdrop-blur-md p-6 md:p-8 border border-gray-700/50 rounded-xl shadow-xl relative overflow-hidden'>
        {/* Decorative background elements */}
        <div className='absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl'></div>

        <div className='relative'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Sign the Guestbook</h3>
            <p className='text-gray-400 mt-2'>Leave your mark in my digital space</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                Name <span className='text-purple-400'>*</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </div>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500'
                  placeholder='Your name'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                Email <span className='text-gray-500'>(optional)</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500'
                  placeholder='your.email@example.com'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label htmlFor='message' className='block text-sm font-medium text-gray-300'>
                Message <span className='text-purple-400'>*</span>
              </label>
              <div className='relative'>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className='w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500'
                  placeholder='Your message...'
                />
              </div>
            </div>

            {error && (
              <div className='p-3 bg-red-900/20 border border-red-800 rounded-lg'>
                <p className='text-red-400 text-sm font-medium flex items-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className='p-3 bg-green-900/20 border border-green-800 rounded-lg'>
                <p className='text-green-400 text-sm font-medium flex items-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  Message successfully added!
                </p>
              </div>
            )}

            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg shadow-purple-500/20'
            >
              {isSubmitting ? (
                <>
                  <svg className='animate-spin -ml-1 mr-2 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                'Sign Guestbook'
              )}
            </Button>
          </form>
        </div>
      </div>
    </FadeIn>
  )
}
