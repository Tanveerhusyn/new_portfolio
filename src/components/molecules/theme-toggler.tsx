'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/atoms/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/atoms/dropdown-menu'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='text-gray-400 hover:text-gray-200 transition-colors bg-transparent hover:bg-gray-800/50 rounded-full p-2 flex items-center justify-center'
        >
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl'>
        <DropdownMenuItem className='text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer flex items-center gap-2 text-sm' onClick={() => setTheme('light')}>
          <Sun className='h-4 w-4' />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className='text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer flex items-center gap-2 text-sm' onClick={() => setTheme('dark')}>
          <Moon className='h-4 w-4' />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className='text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer flex items-center gap-2 text-sm' onClick={() => setTheme('system')}>
          <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M16.28 13.61C15.15 14.74 13.53 15.09 12.1 14.64L9.51001 17.22C9.33001 17.41 8.96001 17.53 8.69001 17.49L7.49001 17.33C7.09001 17.28 6.73001 16.9 6.67001 16.51L6.51001 15.31C6.47001 15.05 6.60001 14.68 6.78001 14.49L9.36001 11.91C8.92001 10.48 9.26001 8.86001 10.39 7.73001C12.01 6.11001 14.65 6.11001 16.28 7.73001C17.9 9.34001 17.9 11.98 16.28 13.61Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path d='M10.45 16.28L9.59998 15.42' stroke='currentColor' strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M13.3945 10.7H13.4035' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
