'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/data/projects'
import { Github, ExternalLink, Code, Eye, Tag as TagIcon, X, ArrowRight, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectShowcaseProps {
  projects: Project[]
  selectedTag?: string
}

// Company projects list
const COMPANY_PROJECTS = ['verdict', 'cornucopia']
const COMPANY_LOGO_URL = '/devden.jpeg'

export function ProjectShowcase({ projects, selectedTag }: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [allTags, setAllTags] = useState<string[]>([])
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Extract all unique tags from projects
  useEffect(() => {
    const tags = Array.from(new Set(projects.flatMap(project => project.tag)))
    setAllTags(tags)
  }, [projects])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeProject !== null) {
        if (e.key === 'Escape') {
          setActiveProject(null)
        } else if (e.key === 'ArrowRight') {
          setActiveProject((prev: number | null) => (prev === null || prev >= projects.length - 1 ? 0 : prev + 1))
        } else if (e.key === 'ArrowLeft') {
          setActiveProject((prev: number | null) => (prev === null || prev <= 0 ? projects.length - 1 : prev - 1))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject, projects.length])

  if (projects.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='flex flex-col items-center justify-center py-32 text-center'>
        <div className='relative w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-6'>
          <svg className='w-16 h-16 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-10 blur-xl'></div>
        </div>
        <h3 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2'>No Projects Found</h3>
        <p className='text-gray-400 mb-8 max-w-md'>Explore different categories or view all projects to discover more creations.</p>
        <Link
          href='/projects'
          className='px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20 group overflow-hidden'
        >
          <span className='flex items-center'>
            <span className='group-hover:translate-x-1 transition-transform'>View All Projects</span>
            <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
          </span>
        </Link>
      </motion.div>
    )
  }

  return (
    <div className='relative h-full flex flex-col' ref={containerRef}>
      {/* Header with animated text */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='mb-4 text-center flex-shrink-0'>
        <h1 className='text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>My Creative Portfolio</h1>
        <p className='text-gray-400 max-w-2xl mx-auto text-sm'>Explore my projects through this interactive showcase. Click on any project to dive deeper into its details.</p>
      </motion.div>

      {/* Grid Projects Container */}
      <div className='flex-grow overflow-y-auto custom-scrollbar pr-2 py-4'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 perspective-1000'>
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: { delay: index * 0.05 }
              }}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                z: 20,
                transition: { duration: 0.3 }
              }}
              className='relative group cursor-pointer'
              onClick={() => setActiveProject(index)}
            >
              <div className='relative h-full overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300 transform-gpu preserve-3d shadow-xl'>
                {/* Project Image */}
                <div className='relative aspect-video overflow-hidden'>
                  {imageErrors[project.slug] ? (
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-800'>
                      <ImageIcon className='w-10 h-10 text-gray-600 mb-2' />
                      <span className='text-xs text-gray-500'>{project.title}</span>
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
                      className='object-cover object-center transition-transform duration-500 group-hover:scale-105'
                      priority
                      onError={() => setImageErrors(prev => ({ ...prev, [project.slug]: true }))}
                    />
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300'></div>

                  {/* Company Project Badge */}
                  {COMPANY_PROJECTS.includes(project.slug) && (
                    <div className='absolute top-2 right-2 bg-blue-600/90 rounded-full p-1 shadow-lg z-10 transform-gpu hover:scale-110 transition-transform duration-200 w-6 h-6 flex items-center justify-center'>
                      <Image src={COMPANY_LOGO_URL} alt='Developers Dens' width={16} height={16} className='rounded-full object-contain' />
                      <span className='sr-only'>Company Project</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className='p-4'>
                  <h3 className='text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1'>{project.title}</h3>
                  <p className='text-gray-300 text-xs mb-2 line-clamp-2'>{project.summary}</p>

                  {/* Tags */}
                  <div className='flex flex-wrap gap-1 mb-2'>
                    {project.tag.slice(0, 2).map((tech, i) => (
                      <span key={i} className='bg-blue-600/90 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                        {tech}
                      </span>
                    ))}
                    {project.tag.length > 2 && <span className='bg-gray-700/90 text-white text-[10px] px-1.5 py-0.5 rounded-full'>+{project.tag.length - 2}</span>}
                  </div>

                  {/* View button */}
                  <div className='flex justify-end'>
                    <button className='flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors'>
                      <span>View Details</span>
                      <ArrowRight className='w-3 h-3' />
                    </button>
                  </div>
                </div>

                {/* 3D effect elements */}
                <div className='absolute inset-0 pointer-events-none'>
                  <div className='absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className='relative w-full max-w-4xl bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden'
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close button */}
              <button className='absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors' onClick={() => setActiveProject(null)}>
                <X className='w-5 h-5' />
              </button>

              {/* Project navigation */}
              <div className='absolute top-1/2 left-4 z-10 transform -translate-y-1/2 flex flex-col gap-4'>
                <button
                  className='p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors'
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setActiveProject((prev: number | null) => (prev === null || prev <= 0 ? projects.length - 1 : prev - 1))
                  }}
                >
                  <ArrowRight className='w-5 h-5 transform rotate-180' />
                </button>
              </div>
              <div className='absolute top-1/2 right-4 z-10 transform -translate-y-1/2 flex flex-col gap-4'>
                <button
                  className='p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors'
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setActiveProject((prev: number | null) => (prev === null || prev >= projects.length - 1 ? 0 : prev + 1))
                  }}
                >
                  <ArrowRight className='w-5 h-5' />
                </button>
              </div>

              {/* Project content */}
              <div className='grid grid-cols-1 md:grid-cols-2'>
                {/* Project image */}
                <div className='relative aspect-video md:aspect-auto md:h-full'>
                  {imageErrors[projects[activeProject].slug] ? (
                    <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-800'>
                      <ImageIcon className='w-16 h-16 text-gray-600 mb-3' />
                      <span className='text-sm text-gray-500'>{projects[activeProject].title}</span>
                    </div>
                  ) : (
                    <Image
                      src={projects[activeProject].image}
                      alt={projects[activeProject].title}
                      fill
                      sizes='(max-width: 768px) 100vw, 50vw'
                      className='object-cover object-center'
                      priority
                      onError={() => setImageErrors(prev => ({ ...prev, [projects[activeProject].slug]: true }))}
                    />
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent'></div>

                  {/* Company Project Badge in Modal */}
                  {COMPANY_PROJECTS.includes(projects[activeProject].slug) && (
                    <div className='absolute top-4 right-4 bg-blue-600/90 rounded-full p-1.5 shadow-lg z-10 w-8 h-8 flex items-center justify-center'>
                      <Image src={COMPANY_LOGO_URL} alt='Developers Dens' width={24} height={24} className='rounded-full object-contain' />
                      <span className='sr-only'>Company Project</span>
                    </div>
                  )}
                </div>

                {/* Project details */}
                <div className='p-6 md:p-8 flex flex-col'>
                  <div className='flex items-center gap-2 mb-4'>
                    <h2 className='text-2xl md:text-3xl font-bold text-white'>{projects[activeProject].title}</h2>
                    {COMPANY_PROJECTS.includes(projects[activeProject].slug) && (
                      <div className='flex items-center gap-1.5 bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full text-xs'>
                        <Image src={COMPANY_LOGO_URL} alt='Developers Dens' width={14} height={14} className='rounded-full object-contain' />
                        <span>Company Project</span>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-wrap gap-1.5 mb-6'>
                    {projects[activeProject].tag.map((tech, i) => (
                      <span key={i} className='bg-blue-600/90 text-white text-xs px-2 py-0.5 rounded-full'>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className='text-gray-300 mb-6'>{projects[activeProject].summary}</p>

                  <div className='mt-auto flex gap-4'>
                    {/* <Link
                      href={`/projects/${projects[activeProject].slug}`}
                      className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
                    >
                      <Eye className='w-4 h-4' />
                      <span>View Details</span>
                    </Link> */}

                    {projects[activeProject].body?.raw?.includes('github.com') && (
                      <a
                        href={projects[activeProject].body?.raw?.match(/github\.com\/[^\s)]+/)?.[0] || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
                      >
                        <Github className='w-4 h-4' />
                        <span>GitHub</span>
                      </a>
                    )}

                    {projects[activeProject].body?.raw?.includes('http') && !projects[activeProject].body?.raw?.includes('github.com') && (
                      <a
                        href={projects[activeProject].body?.raw?.match(/https?:\/\/[^\s)]+/)?.[0] || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
                      >
                        <ExternalLink className='w-4 h-4' />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
