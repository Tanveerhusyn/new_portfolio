import { notFound } from 'next/navigation'
import { allArticles } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

import { MDXComponent } from '@/components/molecules/mdx-component'
import { ENV } from '@/lib/constants'
import { generateSEO } from '@/lib/generateSEO'
import { Badge } from '@/components/atoms/badge'
import { Calendar, ArrowLeft } from 'lucide-react'
import { FadeIn } from '@/components/atoms/fade-in'
import { GridPattern } from '@/components/atoms/grid-pattern'

type ParamsProps = {
  slug: string
}

async function getContent(params: ParamsProps) {
  const article = allArticles.find(article => article.slug.toLowerCase() === params.slug)
  if (!article) return null
  return article
}

export async function generateMetadata({ params }: { params: ParamsProps }) {
  const article = await getContent(params)
  if (!article) return {}

  const title = article.title
  const description = article.summary
  const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

  return {
    ...generateSEO(title, description, image, `/articles/${params.slug}`)
  }
}

export async function generateStaticParams() {
  return allArticles.map(article => ({
    slug: article.slug.toLowerCase()
  }))
}

export default async function ArticleDetail({ params }: { params: ParamsProps }) {
  const article = await getContent(params)
  if (!article) return notFound()

  return (
    <div className='bg-gradient-to-br from-gray-900 to-gray-950 min-h-full relative'>
      <FadeIn>
        <article className='max-w-4xl mx-auto pb-10 pt-4 px-5 relative z-10'>
          {/* Back button */}
          <Link href='/articles' className='inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition-colors mb-6'>
            <ArrowLeft className='w-4 h-4' />
            <span>Back to all articles</span>
          </Link>

          {/* Article header */}
          <div className='mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>{article.title}</h1>
            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4'>
              <div className='flex items-center gap-1'>
                <Calendar className='w-4 h-4 text-blue-400' />
                <time dateTime={article.publishedDate}>{article.publishedDate}</time>
              </div>
            </div>
            <div className='flex flex-wrap gap-2'>
              {typeof article.tag === 'string' ? (
                <Link href={`/articles?tag=${article.tag}`}>
                  <Badge variant='secondary' className='bg-gray-800 hover:bg-gray-700 transition-colors border-gray-700/50'>
                    {article.tag}
                  </Badge>
                </Link>
              ) : article.tag && article.tag.length > 0 ? (
                article.tag.map(tag => (
                  <Link key={tag} href={`/articles?tag=${tag}`}>
                    <Badge variant='secondary' className='bg-gray-800 hover:bg-gray-700 transition-colors border-gray-700/50'>
                      {tag}
                    </Badge>
                  </Link>
                ))
              ) : null}
            </div>
          </div>

          {/* Article content */}
          <div className='prose prose-lg dark:prose-invert max-w-none bg-gray-900/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700/30 shadow-lg prose-code:p-2 font-sans prose-figcaption:text-center prose-img:first-of-type:mt-0 prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground prose-p:text-gray-300 prose-a:text-blue-400 prose-li:text-gray-300 prose-img:mx-auto prose-img:w-full prose-img:md:w-2/3 prose-strong:text-blue-300 prose-h4:text-foreground prose-a:no-underline hover:prose-a:text-blue-300 prose-a:transition-colors prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-blue-400 prose-headings:to-purple-500'>
            <MDXComponent code={article.body.code} />
          </div>
        </article>
      </FadeIn>

      <GridPattern
        className='absolute inset-x-0 -top-14 -z-0 h-full w-full dark:fill-gray-800/10 fill-gray-800/5 dark:stroke-gray-600/10 stroke-gray-600/5 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_50%)]'
        yOffset={-96}
        interactive
      />
    </div>
  )
}
