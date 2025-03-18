'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Fragment, createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'

interface NavbarMobileContextProps {
  isOpen: boolean
  toggleNavbar: () => void
}

const NavbarContext = createContext<NavbarMobileContextProps | undefined>(undefined)

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  return <NavbarContext.Provider value={{ isOpen, toggleNavbar }}>{children}</NavbarContext.Provider>
}

export const useNavbarMobile = (): NavbarMobileContextProps => {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error('useNavbarMobile must be used within a NavbarMobileProvider')
  }
  return context
}

export const NavbarMobileBtn: React.FC = () => {
  const { isOpen, toggleNavbar } = useNavbarMobile()

  return (
    <button className='text-gray-400 hover:text-gray-200 transition-colors block md:hidden' onClick={toggleNavbar}>
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  )
}

export const NavbarMobile = () => {
  const { isOpen, toggleNavbar } = useNavbarMobile()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className='fixed top-[42px] left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-700/20 shadow-xl'
        >
          <div className='max-h-[70vh] overflow-y-auto py-4 px-6'>
            <div className='grid gap-4'>
              {mobileNavItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.path}
                  className='text-gray-300 hover:text-white transition-colors py-2 border-b border-gray-800/50 flex items-center'
                  onClick={toggleNavbar}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className='mt-6 pt-4 border-t border-gray-800/50'>
              <div className='text-xs text-gray-500 mb-3'>Connect with me</div>
              <div className='grid grid-cols-2 gap-3'>
                <Link href='mailto:tanveerhussain465@gmail.com' className='text-gray-400 hover:text-gray-200 transition-colors text-sm' onClick={toggleNavbar}>
                  Email
                </Link>
                <Link href='https://github.com/tanveerhusyn' className='text-gray-400 hover:text-gray-200 transition-colors text-sm' onClick={toggleNavbar}>
                  GitHub
                </Link>
                <Link href='https://linkedin.com/in/tanveerhusyn' className='text-gray-400 hover:text-gray-200 transition-colors text-sm' onClick={toggleNavbar}>
                  LinkedIn
                </Link>
                <Link href='https://wa.me/+923085135289' className='text-gray-400 hover:text-gray-200 transition-colors text-sm' onClick={toggleNavbar}>
                  WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const mobileNavItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
  {
    name: 'Articles',
    path: '/articles'
  },
  {
    name: 'Visitors Board',
    path: '/messages'
  }
]

export const navMenu = [
  {
    name: '_hello',
    path: '/'
  },
  {
    name: '_about-me',
    path: '/about'
  },
  {
    name: '_projects',
    child: [
      {
        name: 'All Projects',
        path: '/projects'
      },
      {
        name: 'React',
        path: '/projects?tag=react'
      },
      {
        name: 'Next',
        path: '/projects?tag=next'
      },
      {
        name: 'HTML',
        path: '/projects?tag=html'
      }
    ]
  },
  {
    name: '_guest-book',
    path: '/guest-book'
  },
  {
    name: '_articles',
    path: '/articles'
  },
  {
    name: '_visitors-board',
    path: '/messages'
  },
  {
    name: '_coding-activity',
    child: [
      {
        name: 'Languages',
        path: '/coding-activity'
      },
      {
        name: 'Activity',
        path: '/coding-activity/activity'
      },
      {
        name: 'Code Editor',
        path: '/coding-activity/code-editor'
      },
      {
        name: 'Operating Systems',
        path: '/coding-activity/operating-systems'
      }
    ]
  },
  {
    name: '_contact',
    child: [
      {
        name: 'Email',
        path: 'tanveerhussain465@gmail.com'
      },

      {
        name: 'WhatsApp',
        path: 'https://wa.me/+923085135289'
      },
      {
        name: 'LinkedIn',
        path: 'https://www.linkedin.com/in/tanveerhusyn/'
      },
      {
        name: 'Instagram',
        path: 'https://www.instagram.com/tanveerhusyn/'
      }
    ]
  }
]
