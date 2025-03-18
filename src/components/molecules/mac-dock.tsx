'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FolderIcon, HomeIcon, UserIcon, CodeIcon, MailIcon, BriefcaseIcon, FileTextIcon, GithubIcon, LinkedinIcon, DownloadIcon, BookOpenIcon } from 'lucide-react'

interface DockItemProps {
  icon: React.ReactNode
  label: string
  href: string
  mouseX: any
  index: number
  dockWidth: number
  itemCount: number
  isActive: boolean
}

const DockItem = ({ icon, label, href, mouseX, index, dockWidth, itemCount, isActive }: DockItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Calculate the position of this dock item
  const itemWidth = 48 // w-12 = 3rem = 48px
  const spacing = 16 // space-x-4 = 1rem = 16px
  const totalItemWidth = itemWidth + spacing
  const itemCenterX = index * totalItemWidth + itemWidth / 2

  // Transform the mouse position into a scale value
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    const dockBounds = { x: bounds.x - index * totalItemWidth, width: dockWidth }
    const distanceFromCenter = val - dockBounds.x - itemCenterX
    return distanceFromCenter
  })

  // The closer the mouse is to the item, the larger the scale
  const scale = useTransform(distance, [-150, 0, 150], [1, 1.5, 1])
  const scaleSpring = useSpring(scale, { stiffness: 300, damping: 30 })

  // Bounce animation variants
  const bounceVariants = {
    initial: { y: 0 },
    hover: { y: -5, transition: { type: 'spring', stiffness: 400, damping: 10 } }
  }

  const content = (
    <motion.div
      ref={ref}
      className='relative flex flex-col items-center'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ scale: scaleSpring }}
      variants={bounceVariants}
      initial='initial'
      whileHover='hover'
    >
      <motion.div className='w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-b from-gray-700/90 to-gray-800/90 backdrop-blur-md rounded-xl border border-gray-600/50 shadow-lg'>
        {icon}
      </motion.div>

      {/* Active indicator dot */}
      {isActive && <div className='absolute -bottom-1 w-1.5 h-1.5 bg-blue-400 rounded-full' />}

      {/* Hover label */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className='absolute -top-10 px-2 py-1 bg-gray-800/90 text-white text-xs rounded-md shadow-lg whitespace-nowrap'
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  )

  // Wrap with appropriate link component
  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' className='flex flex-col items-center'>
        {content}
        <span className='hidden sm:inline-block mt-1 text-[8px] sm:text-[10px] text-gray-300 font-medium opacity-80'>{label}</span>
      </a>
    )
  }

  return (
    <Link href={href} className='flex flex-col items-center'>
      {content}
      <span className='hidden sm:inline-block mt-1 text-[8px] sm:text-[10px] text-gray-300 font-medium opacity-80'>{label}</span>
    </Link>
  )
}

// Custom Portfolio icon
const PortfolioIcon = () => (
  <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
    <div className='w-5 h-5 bg-white rounded-md flex items-center justify-center'>
      <div className='text-blue-500 font-bold text-xs'>TH</div>
    </div>
  </div>
)

export const MacDock = () => {
  const dockRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const [dockWidth, setDockWidth] = useState(0)
  const pathname = usePathname()

  // Update the mouse position when it moves over the dock
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = dockRef.current?.getBoundingClientRect() ?? { x: 0 }
    const mouseXInDock = e.clientX - bounds.x
    mouseX.set(mouseXInDock)
  }

  // Reset the mouse position when it leaves the dock
  const handleMouseLeave = () => {
    mouseX.set(0)
  }

  // Calculate the dock width on mount and window resize
  useEffect(() => {
    const updateDockWidth = () => {
      if (dockRef.current) {
        setDockWidth(dockRef.current.offsetWidth)
      }
    }

    updateDockWidth()
    window.addEventListener('resize', updateDockWidth)

    return () => {
      window.removeEventListener('resize', updateDockWidth)
    }
  }, [])

  const navigationItems = [
    {
      icon: (
        <div className='bg-gradient-to-br from-blue-400 to-blue-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <HomeIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'Home',
      href: '/'
    },
    {
      icon: (
        <div className='bg-gradient-to-br from-purple-400 to-purple-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <UserIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'About',
      href: '/about'
    },
    {
      icon: (
        <div className='bg-gradient-to-br from-green-400 to-green-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <FolderIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'Projects',
      href: '/projects'
    },
    {
      icon: (
        <div className='bg-gradient-to-br from-indigo-400 to-indigo-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <BookOpenIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'Articles',
      href: '/articles'
    },
    {
      icon: (
        <div className='bg-gradient-to-br from-amber-400 to-amber-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <FileTextIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'Visitors Board',
      href: '/messages'
    }
  ]

  const utilityItems = [
    {
      icon: (
        <div className='bg-gradient-to-br from-red-400 to-red-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <MailIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'Contact',
      href: 'mailto:tanveerhussain465@gmail.com'
    },
    {
      icon: (
        <div className='bg-gradient-to-br from-gray-600 to-gray-800 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <GithubIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'GitHub',
      href: 'https://github.com/tanveerhusyn'
    },
    {
      icon: (
        <div className='bg-gradient-to-br from-blue-500 to-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <LinkedinIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/tanveerhusyn'
    },
    {
      icon: (
        <div className='bg-gradient-to-br from-teal-400 to-teal-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shadow-inner shadow-white/10'>
          <DownloadIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white' />
        </div>
      ),
      label: 'Download CV',
      href: 'https://drive.google.com/file/d/1hRoruFCgaYQOpipZ-9epjnQMVfH2DB3-/view?usp=sharing'
    }
  ]

  // Combine all items for indexing purposes
  const allItems = [...navigationItems, ...utilityItems]

  // Check if a path is active (exact match or starts with for nested routes)
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href) || false
  }

  // Animation variants for the dock container
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  }

  // Animation variants for each dock item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  }

  // Ensure the dock is centered on window resize
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render to ensure the dock is centered
      setDockWidth(prev => {
        if (dockRef.current) {
          return dockRef.current.offsetWidth
        }
        return prev
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='fixed bottom-0 left-0 right-0 hidden md:flex justify-center items-center pb-6 z-50 pointer-events-none'>
      <motion.div
        ref={dockRef}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='px-2 sm:px-4 md:px-6 py-2 md:py-3 bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/30 shadow-2xl pointer-events-auto max-w-[95vw] overflow-x-auto'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex items-center'>
          {/* Main navigation items */}
          <div className='flex items-center space-x-2 md:space-x-4'>
            {navigationItems.map((item, index) => (
              <motion.div key={`nav-${index}`} variants={itemVariants}>
                <DockItem
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  mouseX={mouseX}
                  index={index}
                  dockWidth={dockWidth}
                  itemCount={allItems.length}
                  isActive={isActive(item.href)}
                />
              </motion.div>
            ))}
          </div>

          {/* Separator */}
          <motion.div className='mx-2 md:mx-4 h-10 w-px bg-gray-700/50' variants={itemVariants}></motion.div>

          {/* Utility items */}
          <div className='flex items-center space-x-2 md:space-x-4'>
            {utilityItems.map((item, index) => (
              <motion.div key={`util-${index}`} variants={itemVariants}>
                <DockItem
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  mouseX={mouseX}
                  index={navigationItems.length + index + 1} // +1 for the separator
                  dockWidth={dockWidth}
                  itemCount={allItems.length}
                  isActive={isActive(item.href)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reflection effect */}
        <div className='absolute left-0 right-0 h-8 bottom-0 bg-gradient-to-b from-white/10 to-transparent rounded-b-2xl opacity-50' />
      </motion.div>
    </div>
  )
}
