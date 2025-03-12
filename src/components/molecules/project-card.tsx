'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, Calendar, Clock, Tag, Image as ImageIcon } from 'lucide-react'
import { Project } from '@/data/projects'
import { useState } from 'react'

export const ProjectCard = ({ data }: { data: Project }) => {
  // Projects don't have a date field in the schema
  const formattedDate = null
  const [imageError, setImageError] = useState(false)

  return (
    <div className='group h-full flex flex-col overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10'>
      {/* Project Image */}
      <div className='relative aspect-video overflow-hidden'>
        {!imageError ? (
          <Image
            src={data.image}
            alt={data.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gray-800'>
            <ImageIcon className='w-16 h-16 text-gray-600' />
            <span className='sr-only'>{data.title}</span>
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300'></div>

        {/* Tags overlay */}
        <div className='absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5'>
          {data.tag &&
            data.tag.slice(0, 3).map((tech, i) => (
              <span key={i} className='bg-blue-600/90 text-white text-xs px-2 py-0.5 rounded-full'>
                {tech}
              </span>
            ))}
          {data.tag && data.tag.length > 3 && <span className='bg-gray-700/90 text-white text-xs px-2 py-0.5 rounded-full'>+{data.tag.length - 3}</span>}
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col flex-grow p-5'>
        <h3 className='text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors'>{data.title}</h3>
        <p className='text-gray-300 text-sm mb-4 line-clamp-3 flex-grow'>{data.summary}</p>

        {/* Footer */}
        <div className='flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700/30'>
          <div className='flex items-center'>
            <Clock className='w-3.5 h-3.5 mr-1.5' />
            <span>{Math.ceil(data.summary.length / 500)} min read</span>
          </div>
          <div className='flex space-x-2'>
            {data.body?.raw?.includes('github.com') && (
              <div className='p-1.5 rounded-full bg-gray-700/80 hover:bg-gray-600/80 transition-colors'>
                <Github className='w-3.5 h-3.5 text-gray-300' />
              </div>
            )}
            {data.body?.raw?.includes('http') && !data.body?.raw?.includes('github.com') && (
              <div className='p-1.5 rounded-full bg-gray-700/80 hover:bg-gray-600/80 transition-colors'>
                <ExternalLink className='w-3.5 h-3.5 text-gray-300' />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Make the entire card clickable */}
      <Link href={`/projects/${data.title.toLowerCase()}`} className='absolute inset-0' aria-label={`View ${data.title} project details`}>
        <span className='sr-only'>View project details</span>
      </Link>
    </div>
  )
}

export const ProjectCardSkeleton = ({ delay }: { delay: number }) => {
  return (
    <div className='h-full flex flex-col overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700/50'>
      {/* Skeleton image */}
      <div className='aspect-video bg-gray-700 animate-pulse' style={{ animationDelay: `${delay * 0.1}s` }}></div>

      {/* Skeleton content */}
      <div className='p-5 space-y-3 flex-grow'>
        <div className='h-6 bg-gray-700 rounded animate-pulse w-3/4' style={{ animationDelay: `${delay * 0.1}s` }}></div>
        <div className='space-y-2'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='h-3 bg-gray-700 rounded animate-pulse'
              style={{
                animationDelay: `${(delay + i) * 0.1}s`,
                width: `${100 - i * 10}%`
              }}
            ></div>
          ))}
        </div>

        {/* Skeleton footer */}
        <div className='flex justify-between pt-4 mt-auto'>
          <div className='w-20 h-3 bg-gray-700 rounded animate-pulse' style={{ animationDelay: `${(delay + 3) * 0.1}s` }}></div>
          <div className='flex space-x-1'>
            <div className='w-6 h-6 rounded-full bg-gray-700 animate-pulse' style={{ animationDelay: `${(delay + 4) * 0.1}s` }}></div>
            <div className='w-6 h-6 rounded-full bg-gray-700 animate-pulse' style={{ animationDelay: `${(delay + 5) * 0.1}s` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
