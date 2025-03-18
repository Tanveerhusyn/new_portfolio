import { Suspense } from 'react'
import { ENV } from '@/lib/constants'
import { generateSEO } from '@/lib/generateSEO'

const title = 'projects'
const description =
  'Discover the interactive brilliance of my projects, peruse my polished portfolio, and delve into a sneak peek of my formidable technical prowess. Uncover a world where innovation meets functionality, showcased through a meticulously crafted Next.js application. Elevate your digital experience with a seamless blend of creativity and technical finesse.'
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/projects`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

export const metadata = generateSEO(title, description, image, url)

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <section className='overflow-y-auto h-full w-full'>{children}</section>
}
