import Link from 'next/link'
import Image from 'next/image'
import { allArticles } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { ArrowRight, FileQuestion } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/atoms/card'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { FadeInStagger, FadeIn, AnimatePresence } from '@/components/atoms/fade-in'
import { generateSEO } from '@/lib/generateSEO'
import { ENV } from '@/lib/constants'
import { Calendar } from 'lucide-react'

type SearchParamsProps = {
  searchParams: {
    tag: string
  }
}

const title = 'Articles'
const description =
  "Embark on a journey through a diverse collection of articles, ranging from React deep-dives to engaging non-technical discussions. Whether you're exploring the entire repository or seeking insights on a specific tag, our articles cover a spectrum of topics to cater to both technical enthusiasts and those looking for non-technical perspectives. Discover thought-provoking content and immerse yourself in the world of insights and ideas."
const url = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/articles`
const image = `${ENV.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${title}`

export const metadata = generateSEO(title, description, image, url)

export default function Articles({ searchParams }: SearchParamsProps) {
  const { tag } = searchParams

  // Sort articles by date (newest first) and filter by tag if provided
  const sortedArticles = allArticles.sort((a, b) => compareDesc(new Date(a.publishedDate), new Date(b.publishedDate))).filter(article => (tag ? article.tag.includes(tag) : true))

  // Get all unique tags from articles
  const allTags = Array.from(new Set(allArticles.flatMap(article => article.tag || [])))

  // Get featured articles (first 2 articles)
  const featuredArticles = sortedArticles.slice(0, 2)

  return (
    <div className='space-y-10 p-5'>
      {/* Featured Articles Section */}
      {!tag && featuredArticles.length > 0 && (
        <section className='space-y-6'>
          <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Featured Articles</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {featuredArticles.map(article => (
              <Link href={`/articles/${article.slug.toLowerCase()}`} key={article.slug} className='group'>
                <Card className='h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 backdrop-blur-sm hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] relative'>
                  <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                  <CardHeader>
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {typeof article.tag === 'string' ? (
                        <Badge variant='secondary' className='bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-200'>
                          {article.tag}
                        </Badge>
                      ) : article.tag && article.tag.length > 0 ? (
                        article.tag.slice(0, 2).map(tagName => (
                          <Badge key={tagName} variant='secondary' className='bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-200'>
                            {tagName}
                          </Badge>
                        ))
                      ) : null}
                    </div>
                    <CardTitle className='text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300'>
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='pt-2'>
                    <p className='text-sm text-gray-400 line-clamp-2 mb-4'>{article.summary}</p>
                    <div className='flex items-center justify-between text-xs text-gray-500'>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3.5 h-3.5 text-blue-400' />
                          <span>{article.publishedDate}</span>
                        </div>
                      </div>
                      <div className='text-blue-400 group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1'>
                        <span className='text-xs font-medium'>Read article</span>
                        <ArrowRight className='w-3.5 h-3.5' />
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
      <section className='sticky top-0 bg-gradient-to-r from-gray-900/95 to-gray-950/95 backdrop-blur-md py-4 z-10 border-b border-gray-700/30 px-1'>
        <div className='flex flex-wrap items-center gap-3'>
          <h2 className='text-sm font-medium text-gray-300 mr-2'>Filter by:</h2>
          <div className='flex flex-wrap gap-2'>
            <Link href='/articles'>
              <Badge
                variant={!tag ? 'default' : 'secondary'}
                className={`cursor-pointer transition-all duration-300 ${
                  !tag
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0'
                    : 'hover:border-blue-500/50 hover:text-blue-400 border-gray-700/50'
                }`}
              >
                All
              </Badge>
            </Link>
            {allTags.map(tagName => (
              <Link key={tagName} href={`/articles?tag=${tagName}`}>
                <Badge
                  variant={tag === tagName ? 'default' : 'secondary'}
                  className={`cursor-pointer transition-all duration-300 ${
                    tag === tagName
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0'
                      : 'hover:border-blue-500/50 hover:text-blue-400 border-gray-700/50'
                  }`}
                >
                  {tagName}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Grid */}
      <section>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>{tag ? `Articles about ${tag}` : 'All Articles'}</h2>
          <div className='text-sm text-gray-400'>
            {sortedArticles.length} {sortedArticles.length === 1 ? 'article' : 'articles'} {tag ? `about ${tag}` : ''}
          </div>
        </div>

        {sortedArticles.length === 0 ? (
          <div className='text-center py-16 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-700/30'>
            <FileQuestion className='w-12 h-12 text-gray-600 mx-auto mb-4' />
            <h3 className='text-xl font-medium mb-2 text-gray-300'>No articles found</h3>
            <p className='text-gray-400 max-w-md mx-auto'>Try selecting a different tag or check back later for new content.</p>
            <Button variant='outline' size='sm' className='mt-6 border-gray-700 hover:border-blue-500/50 hover:text-blue-400' asChild>
              <Link href='/articles'>View all articles</Link>
            </Button>
          </div>
        ) : (
          <FadeInStagger className='grid md:grid-cols-2 lg:grid-cols-3 gap-6' faster>
            <AnimatePresence mode='wait'>
              {sortedArticles.map(article => (
                <FadeIn key={article.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Card className='group h-full overflow-hidden bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] relative'>
                    <CardHeader>
                      <div className='flex flex-wrap gap-1.5 mb-2'>
                        {typeof article.tag === 'string' ? (
                          <Badge variant='secondary' className='text-xs bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-200'>
                            {article.tag}
                          </Badge>
                        ) : article.tag && article.tag.length > 0 ? (
                          article.tag.slice(0, 2).map(tagName => (
                            <Badge key={tagName} variant='secondary' className='text-xs bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-200'>
                              {tagName}
                            </Badge>
                          ))
                        ) : null}
                        {article.tag && Array.isArray(article.tag) && article.tag.length > 2 && (
                          <Badge variant='secondary' className='text-xs text-gray-300 border-gray-700/50'>
                            +{article.tag.length - 2}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className='text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300'>
                        <Link href={`/articles/${article.slug.toLowerCase()}`} className='block'>
                          {article.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='py-2 px-4'>
                      <p className='text-sm text-gray-400 line-clamp-2 mb-4'>{article.summary}</p>
                      <div className='flex items-center justify-between text-xs text-gray-500'>
                        <div className='flex items-center gap-4'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-3.5 h-3.5 text-blue-400' />
                            <span>{article.publishedDate}</span>
                          </div>
                        </div>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-xs px-2 py-1 h-auto rounded-full text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors -mr-1'
                          asChild
                        >
                          <Link href={`/articles/${article.slug.toLowerCase()}`}>Read →</Link>
                        </Button>
                      </div>
                    </CardContent>
                    <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
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
