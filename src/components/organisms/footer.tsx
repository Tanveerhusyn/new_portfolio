import Link from 'next/link'
import { IoLogoGithub, IoHeartOutline } from 'react-icons/io5'
import { FaLinkedin } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

export const Footer = () => {
  return (
    <footer className='bg-gray-900/80 backdrop-blur-md border-t border-gray-700/20 py-3 px-4 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between relative z-30'>
      <div className='flex items-center mb-2 md:mb-0'>
        <span className='mr-2'>© {new Date().getFullYear()} Tanveer Hussain</span>
        <span className='hidden md:inline mx-2'>•</span>
      </div>

      <div className='flex items-center space-x-4'>
        <Link href='mailto:tanveerhussain465@gmail.com' className='hover:text-gray-200 transition-colors flex items-center' target='_blank'>
          <MdOutlineEmail className='mr-1' />
          <span className='hidden md:inline'>Email</span>
        </Link>
        <Link href='https://github.com/tanveerhusyn' className='hover:text-gray-200 transition-colors flex items-center' target='_blank'>
          <IoLogoGithub className='mr-1' />
          <span className='hidden md:inline'>GitHub</span>
        </Link>
        <Link href='https://linkedin.com/in/tanveerhusyn' className='hover:text-gray-200 transition-colors flex items-center' target='_blank'>
          <FaLinkedin className='mr-1' />
          <span className='hidden md:inline'>LinkedIn</span>
        </Link>
        <div className='flex items-center ml-2'>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1' />
          <span>Available for work</span>
        </div>
      </div>
    </footer>
  )
}
