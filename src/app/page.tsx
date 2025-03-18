import Image from 'next/image'
import { FadeIn } from '@/components/atoms/fade-in'
import { GridPattern } from '@/components/atoms/grid-pattern'
import { AnimatedName } from '@/components/molecules/animated-name'

export default function Home() {
  return (
    <section className='flex flex-col-reverse md:flex-row items-center justify-center md:gap-24 gap-12 p-5 bg-gradient-to-br from-gray-900 to-gray-950'>
      <FadeIn>
        <div className='md:space-y-10 space-y-8 relative z-10'>
          <header>
            <p className='text-gray-400 text-lg font-light'>Hi all. I am</p>
            <AnimatedName />
            <h2 className='text-gray-400 md:text-2xl sm:text-xl text-base'>
              <span className='animate-pulse'>&gt; </span>
              Fullstack Developer
            </h2>

            <div className='absolute w-full h-1/2 bg-blue-500/5 blur-2xl top-0 left-0 -z-10 rounded-full animate-pulse' />
          </header>

          <div className='space-y-2 sm:text-sm text-xs'>
            <p className='text-gray-400'>{`// You can connect with me through the following platforms:`}</p>
            <p className='text-gray-400'>
              <span className='text-purple-400'>const</span> <span className='text-blue-400'>email</span> ={' '}
              <a href='mailto:tanveerhussain465@gmail.com' className='text-amber-300 hover:underline hover:text-amber-200 transition-colors'>
                'tanveerhussain465@gmail.com'
              </a>
            </p>
            <p className='text-gray-400'>
              <span className='text-purple-400'>const</span> <span className='text-blue-400'>Whatsapp</span> = <span className='text-amber-300'>'+923085135289'</span>
            </p>
            <p className='text-gray-400'>
              <span className='text-purple-400'>const</span> <span className='text-blue-400'>githubLink</span> ={' '}
              <a target='_blank' rel='noopener noreferrer' href='https://github.com/tanveerhusyn' className='text-amber-300 hover:underline hover:text-amber-200 transition-colors'>
                'https://github.com/tanveerhusyn'
              </a>
            </p>
            <p className='text-gray-400'>
              <span className='text-purple-400'>const</span> <span className='text-blue-400'>linkedIn</span> ={' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://linkedin.com/in/tanveerhusyn'
                className='text-amber-300 hover:underline hover:text-amber-200 transition-colors'
              >
                'https://linkedin.com/in/tanveerhusyn'
              </a>
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Profile Image */}
      <FadeIn className='block'>
        <div className='relative'>
          <div className='relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-xl overflow-hidden border border-gray-300/30 group hover:scale-105 transition-transform duration-300 shadow-xl bg-background/80 backdrop-blur-sm'>
            {/* macOS-like header */}
            <div className='absolute top-0 left-0 w-full h-10 bg-gray-100/10 backdrop-blur-md z-10 flex items-center px-4 border-b border-gray-300/20'>
              <div className='flex space-x-2'>
                <div className='w-3 h-3 rounded-full bg-red-500 flex items-center justify-center'>
                  <div className='w-1.5 h-0.5 bg-red-700/0 group-hover:bg-red-700/80 rotate-45 transition-all duration-200'></div>
                  <div className='w-1.5 h-0.5 bg-red-700/0 group-hover:bg-red-700/80 -rotate-45 absolute transition-all duration-200'></div>
                </div>
                <div className='w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center'>
                  <div className='w-1.5 h-1.5 bg-yellow-700/0 group-hover:bg-yellow-700/80 rounded-sm transition-all duration-200'></div>
                </div>
                <div className='w-3 h-3 rounded-full bg-green-500 flex items-center justify-center'>
                  <div className='w-1.5 h-1.5 bg-green-700/0 group-hover:bg-green-700/80 transition-all duration-200'></div>
                </div>
              </div>
              <div className='text-xs text-center w-full text-gray-400 font-medium'>Tanveer Hussain — Developer</div>
            </div>

            {/* Image */}
            <div className='w-full h-full pt-10'>
              <Image
                src='/profile-pic-grad2.png'
                alt='Tanveer Hussain'
                fill
                className='object-cover object-center grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105'
                sizes='(max-width: 768px) 240px, 320px'
                priority
              />
            </div>

            {/* Code-like overlay */}
            {/* <div className='absolute inset-0 pt-10 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
              <div className='text-xs text-gray-300 font-mono'>
                <div className='flex items-center space-x-2 mb-2'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                  <span className='text-green-400'>Terminal</span>
                </div>
                <div className='bg-gray-800/80 backdrop-blur-sm rounded-md p-3 shadow-inner'>
                  <div className='text-green-400'>$ whoami</div>
                  <div className='text-white'>tanveer</div>
                  <div className='text-green-400 mt-1'>$ cat profile.json</div>
                  <div className='text-blue-300'>{`{`}</div>
                  <div className='pl-4 text-gray-300'>
                    <span className='text-yellow-300'>"name"</span>: <span className='text-green-300'>"Tanveer Hussain"</span>,
                  </div>
                  <div className='pl-4 text-gray-300'>
                    <span className='text-yellow-300'>"role"</span>: <span className='text-green-300'>"Fullstack Developer"</span>,
                  </div>
                  <div className='pl-4 text-gray-300'>
                    <span className='text-yellow-300'>"skills"</span>: [<span className='text-green-300'>"React"</span>, <span className='text-green-300'>"Next.js"</span>,{' '}
                    <span className='text-green-300'>"Node"</span>],
                  </div>
                  <div className='pl-4 text-gray-300'>
                    <span className='text-yellow-300'>"status"</span>: <span className='text-green-300'>"Available for work"</span>
                  </div>
                  <div className='text-blue-300'>{`}`}</div>
                  <div className='text-green-400 mt-1 flex items-center'>
                    $ <span className='animate-pulse ml-1'>_</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Decorative elements */}
          <div className='absolute -bottom-2 -right-2 w-[240px] h-[240px] md:w-[320px] md:h-[320px] border border-gray-300/20 rounded-xl -z-10 shadow-lg'></div>
          <div className='absolute -top-2 -left-2 w-[240px] h-[240px] md:w-[320px] md:h-[320px] border border-gray-300/10 rounded-xl -z-10'></div>
          <div className='absolute -bottom-4 -right-4 w-[240px] h-[240px] md:w-[320px] md:h-[320px] bg-gradient-to-br from-gray-500/5 to-gray-700/5 rounded-xl -z-20 blur-sm'></div>
        </div>
      </FadeIn>

      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-gray-800/10 fill-gray-800/5 dark:stroke-gray-600/10 stroke-gray-600/5 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_50%)]'
        yOffset={-96}
        interactive
      />
    </section>
  )
}
