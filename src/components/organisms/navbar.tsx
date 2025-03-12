import Link from 'next/link'
import { IoApps } from 'react-icons/io5'

import { NavLink } from '@/components/atoms/nav-link'
import { ThemeToggle } from '@/components/molecules/theme-toggler'

import { NavbarMobileBtn } from './navbar-mobile'

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-4 py-2 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/20 sticky top-0 z-50'>
      <div className='flex items-center space-x-2'>
        <div className='flex space-x-1.5 mr-4'>
          <div className='w-3 h-3 rounded-full bg-red-500'></div>
          <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
        </div>
        <Link href='/' className='text-gray-200 font-medium hover:text-white transition-colors'>
          Tanveer Hussain
        </Link>
      </div>

      <div className='flex items-center'>
        <ul className='md:flex items-center space-x-6 hidden'>
          {navMenu.map((menu, i) => (
            <li key={i}>
              <Link href={menu.path} className='text-gray-400 hover:text-gray-200 transition-colors text-sm'>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex items-center ml-6 space-x-4'>
          {/* <ThemeToggle /> */}
          <NavbarMobileBtn />
        </div>
      </div>
    </nav>
  )
}

export const navMenu = [
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
  }
  // {
  //   name: '_guest-book',
  //   path: '/guest-book'
  // }
]
