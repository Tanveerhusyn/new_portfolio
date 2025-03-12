import Link from 'next/link'
import Image from 'next/image'
// import { allBlogs } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/atoms/card'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { FadeInStagger, FadeIn, AnimatePresence } from '@/components/atoms/fade-in'
import { Clock, Calendar } from 'lucide-react'
import { mockBlogs } from '@/data/mock-blogs'

type SearchParamsProps = {
  searchParams: {
    tag: string
  }
}

export default function Blogs({ searchParams }: SearchParamsProps) {
  const { tag } = searchParams

  // Use mock data instead of ContentLayer
  const blogs = mockBlogs

  // Sort blogs by date (newest first) and filter by tag if provided
  const sortedBlogs = blogs.sort((a, b) => compareDesc(new Date(a.publishedDate), new Date(b.publishedDate))).filter(blog => (tag ? blog.tag.includes(tag) : true))

  // Get all unique tags from blogs
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tag || [])))

  // Get featured blogs
  const featuredBlogs = blogs.filter(blog => blog.featured)

  return (
    <div className='space-y-10 pb-10'>
      {/* Featured Blogs Section */}
      {!tag && featuredBlogs.length > 0 && (
        <section className='space-y-4'>
          <h2 className='text-2xl font-bold'>Featured Posts</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {featuredBlogs.map(blog => (
              <Link href={`/blogs/${blog.slug.toLowerCase()}`} key={blog.slug} className='group'>
                <Card className='h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50'>
                  <div className='relative h-48 w-full overflow-hidden'>
                    <Image src={blog.coverImage} alt={blog.title} fill className='object-cover transition-transform duration-500 group-hover:scale-105' />
                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-60'></div>
                  </div>
                  <CardHeader className='relative z-10 -mt-16 pt-0'>
                    <div className='bg-background/80 backdrop-blur-sm p-4 rounded-t-lg'>
                      <CardTitle className='text-xl group-hover:text-blue-400 transition-colors'>{blog.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className='pt-2'>
                    <p className='text-sm text-muted-foreground line-clamp-2'>{blog.summary}</p>
                    <div className='flex items-center gap-4 mt-4 text-xs text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-3.5 h-3.5' />
                        <span>{blog.publishedDate}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-3.5 h-3.5' />
                        <span>{blog.readingTime} min read</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Tags Filter */}
      <section className='space-y-4 sticky top-0 bg-black/80 backdrop-blur-sm py-4 z-10'>
        <h2 className='text-lg font-medium'>Filter by Topic</h2>
        <div className='flex flex-wrap gap-2'>
          <Link href='/blogs'>
            <Badge variant={!tag ? 'default' : 'secondary'} className='cursor-pointer'>
              All
            </Badge>
          </Link>
          {allTags.map(tagName => (
            <Link key={tagName} href={`/blogs?tag=${tagName}`}>
              <Badge variant={tag === tagName ? 'default' : 'secondary'} className='cursor-pointer'>
                {tagName}
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      {/* All Blogs Grid */}
      <section>
        <h2 className='text-2xl font-bold mb-6'>{tag ? `Posts about ${tag}` : 'All Posts'}</h2>

        {sortedBlogs.length === 0 ? (
          <div className='text-center py-12'>
            <h3 className='text-xl font-medium mb-2'>No posts found</h3>
            <p className='text-muted-foreground'>Try selecting a different tag or check back later.</p>
          </div>
        ) : (
          <FadeInStagger className='grid md:grid-cols-2 lg:grid-cols-3 gap-6' faster>
            <AnimatePresence mode='wait'>
              {sortedBlogs.map(blog => (
                <FadeIn key={blog.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Card className='h-full hover:shadow-md transition-shadow duration-300'>
                    <div className='relative h-40 w-full overflow-hidden'>
                      <Image src={blog.coverImage} alt={blog.title} fill className='object-cover' />
                    </div>
                    <CardHeader className='p-4'>
                      <CardTitle className='text-lg'>
                        <Link href={`/blogs/${blog.slug.toLowerCase()}`} className='hover:text-blue-400 transition-colors'>
                          {blog.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='py-0 px-4 text-sm text-muted-foreground line-clamp-2'>{blog.summary}</CardContent>
                    <CardFooter className='p-4 flex flex-col items-start gap-3'>
                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3.5 h-3.5' />
                          <span>{blog.publishedDate}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='w-3.5 h-3.5' />
                          <span>{blog.readingTime} min read</span>
                        </div>
                      </div>
                      <div className='flex flex-wrap gap-1.5'>
                        {blog.tag.slice(0, 3).map(tagName => (
                          <Link key={tagName} href={`/blogs?tag=${tagName}`}>
                            <Badge variant='secondary' className='text-xs'>
                              {tagName}
                            </Badge>
                          </Link>
                        ))}
                        {blog.tag.length > 3 && (
                          <Badge variant='secondary' className='text-xs'>
                            +{blog.tag.length - 3}
                          </Badge>
                        )}
                      </div>
                      <Button variant='outline' size='sm' className='mt-2 ml-auto' asChild>
                        <Link href={`/blogs/${blog.slug.toLowerCase()}`}>Read More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>
              ))}
            </AnimatePresence>
          </FadeInStagger>
        )}
      </section>
    </div>
  )
}
