export default function Loading() {
  return (
    <div className='min-h-screen h-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center'>
      <div className='max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <div className='text-center mb-8 md:mb-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>Visitors Board</h1>
          <p className='mt-3 text-gray-400 max-w-2xl mx-auto'>Leave a sticky note message for Tanveer. Share your thoughts, feedback, or just say hello!</p>
        </div>

        <div className='relative h-[600px] bg-amber-900/30 p-6 rounded-lg border border-gray-700 shadow-inner'>
          {/* Cork board texture */}
          <div className='absolute inset-0 bg-amber-800/20 rounded-lg mix-blend-overlay'></div>
          <div className='absolute inset-0 opacity-30 rounded-lg bg-repeat'></div>

          {/* Push pins */}
          <div className='absolute top-4 left-4 w-4 h-4 rounded-full bg-red-600 shadow-lg shadow-red-900/50 z-10'></div>
          <div className='absolute top-4 right-4 w-4 h-4 rounded-full bg-blue-600 shadow-lg shadow-blue-900/50 z-10'></div>
          <div className='absolute bottom-4 left-4 w-4 h-4 rounded-full bg-green-600 shadow-lg shadow-green-900/50 z-10'></div>
          <div className='absolute bottom-4 right-4 w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-900/50 z-10'></div>

          <div className='flex justify-center items-center h-[calc(100%-24px)]'>
            <div className='bg-yellow-300 p-6 shadow-md relative transform rotate-1'>
              {/* Push pin */}
              <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 shadow-lg z-10'></div>

              <div className='flex flex-col items-center space-y-2'>
                <div className='text-center'>
                  <h3 className='text-lg font-bold text-gray-800'>Loading Notes</h3>
                </div>
                <div className='flex space-x-3'>
                  <div className='h-3 w-3 bg-gray-600 rounded-full animate-bounce'></div>
                  <div className='h-3 w-3 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]'></div>
                  <div className='h-3 w-3 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]'></div>
                </div>
                <p className='text-gray-700 text-sm font-handwriting'>Please wait...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
