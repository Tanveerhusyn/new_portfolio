'use client'

import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/data/projects'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, X, ExternalLink, Github, ArrowRight, Sparkles, Code, Eye } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface ProjectCarouselProps {
  projects: Project[]
  selectedTag?: string
}

type ProjectCardContext = {
  onCardClose: (index: number) => void
  currentIndex: number
}

const ProjectCardContext = createContext<ProjectCardContext>({
  onCardClose: () => {},
  currentIndex: 0
})

export function ProjectCarousel({ projects, selectedTag }: ProjectCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    checkScrollability()
    window.addEventListener('resize', checkScrollability)
    return () => window.removeEventListener('resize', checkScrollability)
  }, [projects])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)

      // Update current index based on scroll position
      const cardWidth = isMobile() ? 230 : 320
      const gap = isMobile() ? 16 : 24
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 320
      const gap = isMobile() ? 16 : 24
      const { scrollLeft } = carouselRef.current
      const newIndex = Math.max(currentIndex - 1, 0)
      const scrollPosition = (cardWidth + gap) * newIndex

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(newIndex)
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 320
      const gap = isMobile() ? 16 : 24
      const { scrollLeft } = carouselRef.current
      const newIndex = Math.min(currentIndex + 1, projects.length - 1)
      const scrollPosition = (cardWidth + gap) * newIndex

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(newIndex)
    }
  }

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 320
      const gap = isMobile() ? 16 : 24
      const scrollPosition = (cardWidth + gap) * index
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative flex flex-col items-center justify-center py-32 text-center overflow-hidden w-full'
      >
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-0'></div>
        <motion.div
          className='relative w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-6'
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className='w-16 h-16 text-gray-400 z-10' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-10 blur-xl'></div>
        </motion.div>
        <h3 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 relative z-10'>No Projects Found</h3>
        <p className='text-gray-400 mb-8 max-w-md relative z-10'>Explore different categories or view all projects to discover more creations.</p>
        <Link
          href='/projects'
          className='relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20 group overflow-hidden'
        >
          <span className='relative flex items-center z-10'>
            <span className='group-hover:translate-x-1 transition-transform'>View All Projects</span>
            <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
          </span>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity'></div>
        </Link>
      </motion.div>
    )
  }

  return (
    <ProjectCardContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className='w-full mb-24 overflow-hidden relative'>
        {/* Remove the full-width decorative frame */}

        <motion.div
          className='absolute -top-20 left-0 w-full h-96 rounded-full z-0'
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className='absolute -bottom-20 right-0 w-full h-96 rounded-full blur-3xl z-0'
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className='relative flex justify-between items-center mb-8 px-4 max-w-full mx-auto'>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className='flex items-center relative z-10'>
            <Sparkles className='w-6 h-6 text-blue-400 mr-3 animate-pulse' />
            <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Featured Creations</h3>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className='flex gap-3 relative z-10'>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className='h-12 w-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center disabled:opacity-50 text-white shadow-lg shadow-blue-600/20 transition-all duration-300'
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label='Scroll left'
            >
              <ChevronLeft className='h-6 w-6' />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className='h-12 w-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center disabled:opacity-50 text-white shadow-lg shadow-blue-600/20 transition-all duration-300'
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label='Scroll right'
            >
              <ChevronRight className='h-6 w-6' />
            </motion.button>
          </motion.div>
        </div>

        <div
          className='relative w-full overflow-x-scroll overscroll-x-auto py-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className='absolute inset-y-0 right-0 z-10 w-[5%] bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent pointer-events-none'></div>
          <div className='absolute inset-y-0 left-0 z-10 w-[5%] bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent pointer-events-none'></div>

          <div className='flex flex-row justify-start gap-6 pl-4'>
            {projects.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                key={`card-${index}`}
                className='rounded-3xl flex-shrink-0'
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ProjectCard project={project} index={index} isHovered={hoveredIndex === index} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='flex justify-center mt-8 gap-2 relative z-10 w-full max-w-full mx-auto px-4'>
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (carouselRef.current) {
                  const cardWidth = isMobile() ? 230 : 320
                  const gap = isMobile() ? 16 : 24
                  const scrollPosition = (cardWidth + gap) * index
                  carouselRef.current.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                  })
                  setCurrentIndex(index)
                }
              }}
              className={cn(
                'relative transition-all duration-300 focus:outline-none',
                currentIndex === index
                  ? 'w-10 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/20'
                  : 'w-3 h-3 bg-gray-700 hover:bg-gray-600 rounded-full'
              )}
              aria-label={`Go to project ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {currentIndex === index && (
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50 blur-sm'
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </ProjectCardContext.Provider>
  )
}

function ProjectCard({ project, index, isHovered }: { project: Project; index: number; isHovered: boolean }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { onCardClose } = useContext(ProjectCardContext)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') handleClose()
    }

    document.body.style.overflow = open ? 'hidden' : 'auto'
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    onCardClose(index)
  }

  // Animation variants
  const cardVariants = {
    hover: {
      y: -15,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    initial: {
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className='fixed inset-0 h-screen z-50 overflow-auto'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl h-full w-full fixed inset-0'
            >
              <motion.div
                className='absolute inset-0 pointer-events-none'
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              ref={containerRef}
              layoutId={`card-${project.title}`}
              className='w-[90%] max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-sm h-fit z-[60] my-12 p-6 md:p-10 rounded-3xl font-sans relative shadow-2xl shadow-blue-500/10'
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className='sticky top-6 h-10 w-10 right-0 ml-auto bg-gradient-to-br from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center transition-all shadow-md'
                onClick={handleClose}
              >
                <X className='h-5 w-5 text-white' />
              </motion.button>

              <motion.div className='flex flex-col md:flex-row gap-8 relative z-10'>
                <div className='w-full md:w-1/2 relative rounded-xl overflow-hidden aspect-video md:aspect-auto md:h-[400px] group'>
                  {!imageError ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className='absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center'>
                      <span className='text-gray-400 text-lg font-medium'>Image Unavailable</span>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none'></div>
                  <div className='absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20'>
                    {project.tag.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className='bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-md'
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className='w-full md:w-1/2'>
                  <motion.p layoutId={`category-${project.title}`} className='text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
                    {project.tag.join(' • ')}
                  </motion.p>
                  <motion.h2 layoutId={`title-${project.title}`} className='text-3xl md:text-4xl font-bold text-white mt-2 mb-4 relative'>
                    {project.title}
                    <motion.div
                      className='absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
                      initial={{ width: 0 }}
                      animate={{ width: '50%' }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </motion.h2>

                  <div className='py-4'>
                    <p className='text-gray-200 text-lg leading-relaxed mb-8'>{project.summary}</p>

                    <div className='flex flex-wrap gap-4 mt-8'>
                      <Link
                        href={`/projects/${project.title.toLowerCase()}`}
                        className='relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20 group overflow-hidden'
                      >
                        <span className='relative flex items-center z-10'>
                          <Eye className='mr-2 h-4 w-4 group-hover:rotate-12 transition-transform' />
                          <span className='group-hover:translate-x-1 transition-transform'>View Details</span>
                        </span>
                        <motion.div
                          className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0'
                          whileHover={{ opacity: 0.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>

                      {project.body?.raw?.includes('github.com') && (
                        <a
                          href={
                            project.body.raw.match(/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+/)?.[0]
                              ? `https://${project.body.raw.match(/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+/)?.[0]}`
                              : '#'
                          }
                          target='_blank'
                          rel='noopener noreferrer'
                          className='relative px-6 py-3 border border-gray-700 hover:border-blue-500 text-gray-200 hover:text-white rounded-lg transition-all group overflow-hidden'
                        >
                          <span className='relative flex items-center z-10'>
                            <Github className='mr-2 h-4 w-4 group-hover:rotate-12 transition-transform' />
                            GitHub
                          </span>
                          <motion.div
                            className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0'
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </a>
                      )}

                      {project.body?.raw?.includes('http') && !project.body?.raw?.includes('github.com') && (
                        <a
                          href={project.body.raw.match(/(https?:\/\/[^\s]+)/g)?.[0] || '#'}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='relative px-6 py-3 border border-gray-700 hover:border-purple-500 text-gray-200 hover:text-white rounded-lg transition-all group overflow-hidden'
                        >
                          <span className='relative flex items-center z-10'>
                            <ExternalLink className='mr-2 h-4 w-4 group-hover:scale-110 transition-transform' />
                            Live Demo
                          </span>
                          <motion.div
                            className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0'
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={`card-${project.title}`}
        onClick={handleOpen}
        className='rounded-3xl bg-gray-800/80 backdrop-blur-sm h-64 w-64 md:h-[26rem] md:w-80 overflow-hidden flex flex-col items-start justify-start relative z-10 shadow-xl hover:shadow-blue-500/20 border-0 transition-all duration-300'
        variants={cardVariants}
        animate={isHovered ? 'hover' : 'initial'}
        whileTap={{ scale: 0.98 }}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0'></div>
        <div className='absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent z-30 pointer-events-none' />

        <motion.div className='relative z-40 p-8' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <motion.div layoutId={`category-${project.title}`} className='flex items-center mb-3'>
            <Code className='w-5 h-5 text-blue-400 mr-2 animate-pulse' />
            <p className='text-white text-sm md:text-base font-medium font-sans text-left'>
              {project.tag.slice(0, 2).join(' • ')}
              {project.tag.length > 2 && ' • ...'}
            </p>
          </motion.div>
          <motion.p layoutId={`title-${project.title}`} className='text-white text-xl md:text-2xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans relative'>
            {project.title}
          </motion.p>

          {/* View project button that appears on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
            className='mt-6 flex items-center gap-2'
          >
            <span className='text-sm text-blue-400 font-medium group-hover:text-blue-300 transition-colors'>Explore Now</span>
            <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
              <ArrowRight className='h-4 w-4 text-blue-400' />
            </motion.div>
          </motion.div>
        </motion.div>

        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={cn('object-cover absolute z-10 inset-0 transition-all duration-500', isHovered ? 'scale-110 brightness-75' : 'scale-100 brightness-100')}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className='absolute z-10 inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center'>
            <span className='text-gray-400 text-lg font-medium'>Image Unavailable</span>
          </div>
        )}
      </motion.button>
    </>
  )
}
