import { FadeIn } from '@/components/atoms/fade-in'
import { GridPattern } from '@/components/atoms/grid-pattern'
import { AnimatedName } from '@/components/molecules/animated-name'

export default function Home() {
  return (
    <section className='flex items-center justify-center gap-20 p-5'>
      <FadeIn>
        <div className='md:space-y-10 space-y-8 relative z-10'>
          <header>
            <p className='text-muted-foreground text-lg font-extralight'>Hi all. I am</p>
            <AnimatedName />
            <h2 className='text-muted-foreground md:text-2xl sm:text-xl text-base'>
              <span className='animate-pulse'>&gt; </span>
              Fullstack Developer
            </h2>

            <div className='absolute w-full h-1/2 bg-muted-foreground/10 blur-2xl top-0 left-0 -z-10 rounded-full animate-pulse' />
          </header>

          <div className='space-y-2 sm:text-sm text-xs'>
            <p className='text-muted-foreground'>{`// You can connect with me through the following platforms:`}</p>
            <p className='text-muted-foreground'>
              <span className='text-purple'>const</span> <span className='text-green'>email</span> ={' '}
              <a href='mailto:tanveerhussain465@gmail.com' className='text-light-brown hover:underline hover:text-foreground transition-colors'>
                'tanveerhussain465@gmail.com'
              </a>
            </p>
            <p className='text-muted-foreground'>
              <span className='text-purple'>const</span> <span className='text-green'>Whatsapp</span> = <span className='text-light-brown'>'+923085135289'</span>
            </p>
            <p className='text-muted-foreground'>
              <span className='text-purple'>const</span> <span className='text-green'>githubLink</span> ={' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/tanveerhusyn'
                className='text-light-brown hover:underline hover:text-foreground transition-colors'
              >
                'https://github.com/tanveerhusyn'
              </a>
            </p>
            <p className='text-muted-foreground'>
              <span className='text-purple'>const</span> <span className='text-green'>linkedIn</span> ={' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://linkedin.com/in/tanveerhusyn'
                className='text-light-brown hover:underline hover:text-foreground transition-colors'
              >
                'https://linkedin.com/in/tanveerhusyn'
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-secondary/20 fill-neutral-100 dark:stroke-secondary/30 stroke-neutral-700/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]'
        yOffset={-96}
        interactive
      />
    </section>
  )
}
