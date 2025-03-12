import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
// import { allBlogs } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

import { MDXComponent } from '@/components/molecules/mdx-component'
import { ENV } from '@/lib/constants'
import { generateSEO } from '@/lib/generateSEO'
import { Badge } from '@/components/atoms/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { mockBlogs } from '@/data/mock-blogs'

type ParamsProps = {
  slug: string
}

async function getBlog(params: ParamsProps) {
  // Use mock data instead of ContentLayer
  const blog = mockBlogs.find(blog => blog.slug.toLowerCase() === params.slug)
  if (!blog) return null
  return {
    ...blog,
    // Add a mock body object for the MDX component
    body: {
      code: `
        <h1>${blog.title}</h1>
        <p>${blog.summary}</p>
        <p>This is a mock blog post content. The actual content will be displayed once ContentLayer is properly configured.</p>
      `
    }
  }
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const blog = await getBlog(params)
  if (!blog) return {}

  const title = blog.title
  const description = blog.summary
  const image = blog.coverImage.startsWith('/') ? `${ENV.NEXT_PUBLIC_WEBSITE_URL}${blog.coverImage}` : blog.coverImage

  return {
    ...generateSEO(title, description, image, `/blogs/${params.slug}`)
  }
}

export async function generateStaticParams() {
  return mockBlogs.map(blog => ({
    slug: blog.slug.toLowerCase()
  }))
}

export default async function BlogDetail({ params }: { params: ParamsProps }) {
  const blog = await getBlog(params)
  if (!blog) return notFound()

  // Format the date without using parseISO since our date is already a string
  const formattedDate = blog.publishedDate

  return (
    <article className='max-w-4xl mx-auto pb-10 pt-4'>
      {/* Back button */}
      <Link href='/blogs' className='inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6'>
        <ArrowLeft className='w-4 h-4' />
        <span>Back to all blogs</span>
      </Link>

      {/* Cover image */}
      <div className='relative aspect-video w-full mb-8 rounded-lg overflow-hidden'>
        <Image src={blog.coverImage} alt={blog.title} fill className='object-cover' priority />
      </div>

      {/* Blog header */}
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4'>{blog.title}</h1>
        <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4'>
          <div className='flex items-center gap-1'>
            <Calendar className='w-4 h-4' />
            <time dateTime={blog.publishedDate}>{formattedDate}</time>
          </div>
          <div className='flex items-center gap-1'>
            <Clock className='w-4 h-4' />
            <span>{blog.readingTime} min read</span>
          </div>
          <div>
            <span>By {blog.author}</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          {blog.tag.map(tag => (
            <Link key={tag} href={`/blogs?tag=${tag}`}>
              <Badge variant='secondary'>{tag}</Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Blog content */}
      <div className='prose prose-lg dark:prose-invert max-w-none'>
        <MDXComponent code={blog.body.code} />
      </div>
    </article>
  )
}
