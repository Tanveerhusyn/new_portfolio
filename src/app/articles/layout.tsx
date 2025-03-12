'use client'
import { RiReactjsLine, RiArticleLine } from 'react-icons/ri'
import { LiaBookSolid } from 'react-icons/lia'
import { Suspense } from 'react'
import { useParams } from 'next/navigation'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/atoms/accordion'
import { AsideLink } from '@/components/atoms/aside-link'
import { GridPattern } from '@/components/atoms/grid-pattern'
import { FadeInStagger, FadeIn } from '@/components/atoms/fade-in'

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  if (params.slug) return children

  return (
    <section className='grid grid-cols-12 overflow-hidden h-full bg-gradient-to-br from-gray-900 to-gray-950 relative'>
      <aside className='md:col-span-3 lg:col-span-2 border-r border-gray-700/30 md:block hidden overflow-y-auto bg-gray-900/80 backdrop-blur-sm'>
        <Accordion type='single' collapsible defaultValue='item-0'>
          {TAGS.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger className='border-b border-gray-700/30 px-5 py-2.5 text-left text-gray-300 hover:text-gray-100' data-umami-event='accordion-articles'>
                {item.title}
              </AccordionTrigger>
              <AccordionContent className='mt-5 space-y-1'>
                <FadeInStagger faster>
                  {item.list.map((listItem, j) => (
                    <FadeIn key={j}>
                      <Suspense fallback={<>Loading...</>}>
                        <AsideLink href={listItem.href} startWith='/projects' title={listItem.title}>
                          <listItem.icon className='w-4 h-4' />
                          {listItem.title}
                        </AsideLink>
                      </Suspense>
                    </FadeIn>
                  ))}
                </FadeInStagger>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <section className='md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84dvh] md:h-auto'>{children}</section>

      <GridPattern
        className='absolute inset-x-0 -top-14 -z-10 h-full w-full dark:fill-gray-800/10 fill-gray-800/5 dark:stroke-gray-600/10 stroke-gray-600/5 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_50%)]'
        yOffset={-96}
        interactive
      />
    </section>
  )
}

const TAGS = [
  {
    title: 'Article Tags',
    list: [
      {
        title: 'All article',
        href: '/articles',
        icon: RiArticleLine
      },
      {
        title: 'React',
        href: '/articles?tag=React',
        icon: RiReactjsLine
      },
      {
        title: 'Non Technical',
        href: '/articles?tag=Non Technical',
        icon: LiaBookSolid
      }
    ]
  }
]
