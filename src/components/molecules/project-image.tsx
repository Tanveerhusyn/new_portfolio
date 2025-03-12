'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Image as ImageIcon } from 'lucide-react'

interface ProjectImageProps {
  src: string
  alt: string
  priority?: boolean
}

export function ProjectImage({ src, alt, priority = false }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className='object-cover object-center transition-transform duration-700 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, 50vw'
          priority={priority}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center bg-gray-800'>
          <ImageIcon className='w-16 h-16 text-gray-600' />
          <span className='sr-only'>{alt}</span>
        </div>
      )}
    </>
  )
}
