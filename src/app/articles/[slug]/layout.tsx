import { allArticles } from 'contentlayer/generated'
import { Suspense } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { AsideLink } from '@/components/atoms/aside-link'
import { GridPattern } from '@/components/atoms/grid-pattern'
import { FadeInStagger, FadeIn } from '@/components/atoms/fade-in'
import { slugify } from '@/lib/slug'
import { BookOpen } from 'lucide-react'

async function getContent(params: { slug: string }) {
  const article = allArticles.find(article => article.slug.toLowerCase() === params.slug)
  if (!article) null
  return article
}

export default async function ArticleDetailLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  const content = await getContent(params)
  if (!content) return null

  return (
    <section className='grid grid-cols-12 overflow-hidden h-full bg-gradient-to-br from-gray-900 to-gray-950 relative'>
      <aside className='md:col-span-3 lg:col-span-2 border-r border-gray-700/30 md:block hidden overflow-y-auto bg-gray-900/80 backdrop-blur-sm'>
        <Accordion type='single' collapsible defaultValue='table-of-contents'>
          <AccordionItem value='table-of-contents' className='border-0'>
            <AccordionTrigger className='border-b border-gray-700/30 px-5 py-3 text-left text-gray-300 hover:text-gray-100 group'>
              <div className='flex items-center gap-2'>
                <BookOpen className='w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors' />
                <span className='font-medium'>Table of Contents</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='mt-4 space-y-4 px-3'>
              <div className='px-2 mb-2'>
                <div className='h-0.5 w-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full mb-3'></div>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-400'>Article sections</span>
                  <span className='text-xs px-1.5 py-0.5 rounded bg-gray-800 text-gray-400'>{content.headings.length}</span>
                </div>
              </div>
              <FadeInStagger faster>
                {content.headings.map((heading: { text: string; level: string }, i: number) => (
                  <FadeIn key={i}>
                    <Suspense fallback={<>Loading...</>}>
                      <div
                        data-level={heading.level}
                        className={`
                          flex items-start gap-2
                          data-[level=one]:font-semibold data-[level=one]:text-transparent data-[level=one]:bg-clip-text data-[level=one]:bg-gradient-to-r data-[level=one]:from-blue-400 data-[level=one]:to-purple-500
                          data-[level=two]:font-medium data-[level=two]:text-gray-200 
                          data-[level=three]:pl-4 data-[level=three]:text-gray-300 data-[level=three]:text-sm
                          data-[level=four]:pl-6 data-[level=four]:text-gray-400 data-[level=four]:text-xs
                          py-1.5 px-2 rounded-md hover:bg-gray-800/30 transition-colors cursor-default
                        `}
                      >
                        <span
                          className={`
                          inline-block min-w-1.5 h-1.5 rounded-full mt-1.5
                          data-[level=one]:bg-gradient-to-r data-[level=one]:from-blue-400 data-[level=one]:to-purple-500
                          data-[level=two]:bg-blue-400
                          data-[level=three]:bg-blue-500/70
                          data-[level=four]:bg-blue-500/50
                        `}
                          data-level={heading.level}
                        ></span>
                        <span>{heading.text}</span>
                      </div>
                    </Suspense>
                  </FadeIn>
                ))}
              </FadeInStagger>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <section className='md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[80dvh] md:h-auto scroll-smooth'>{children}</section>

      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-gray-800/10 fill-gray-800/5 dark:stroke-gray-600/10 stroke-gray-600/5 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_50%)]'
        yOffset={-96}
        interactive
      />
    </section>
  )
}
