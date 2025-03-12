import { Metadata } from 'next'
import { ENV } from '@/lib/constants'
import { generateSEO } from '@/lib/generateSEO'

const title = 'Blogs'
const description =
  'Explore my collection of blogs covering various topics in web development, programming, and technology. From React and Next.js to TypeScript and more, find insights, tutorials, and best practices to enhance your development skills.'
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/blogs`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

export const metadata: Metadata = generateSEO(title, description, image, url)

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='container mx-auto max-w-7xl h-full overflow-y-auto blog-content-scroll'>
      <div className='py-6 space-y-2'>
        <h1 className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Blogs</h1>
        <p className='text-muted-foreground'>Explore my thoughts, tutorials, and insights on web development, programming, and technology.</p>
      </div>
      {children}
    </section>
  )
}
