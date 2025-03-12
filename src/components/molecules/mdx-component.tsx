'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { FadeIn } from '@/components/atoms/fade-in'
import { cn } from '@/lib/utils'

// Custom components for MDX
const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={cn('mt-10 mb-4 text-3xl font-bold tracking-tight', className)} {...props} />,
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={cn('mt-10 mb-4 text-2xl font-semibold tracking-tight', className)} {...props} />,
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn('mt-8 mb-4 text-xl font-semibold tracking-tight', className)} {...props} />,
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className={cn('mt-8 mb-4 text-lg font-semibold tracking-tight', className)} {...props} />,
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={cn('leading-7 mb-6 text-gray-300', className)} {...props} />,
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />,
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />,
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li className={cn('mt-2 text-gray-300', className)} {...props} />,
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn('mt-6 border-l-2 border-gray-500 pl-6 italic text-gray-400', className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border border-gray-700', className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className='my-8 border-gray-700' {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 w-full overflow-y-auto'>
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => <tr className={cn('m-0 border-t border-gray-700 p-0 even:bg-gray-800/50', className)} {...props} />,
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className={cn('border border-gray-700 px-4 py-2 text-left font-semibold text-gray-200 [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn('border border-gray-700 px-4 py-2 text-left text-gray-300 [&[align=center]]:text-center [&[align=right]]:text-right', className)} {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => <pre className={cn('mb-4 mt-6 overflow-x-auto rounded-lg bg-gray-800/50 p-4', className)} {...props} />,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn('relative rounded bg-gray-800/50 px-[0.3rem] py-[0.2rem] font-mono text-sm', className)} {...props} />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn('font-medium text-blue-400 underline underline-offset-4 hover:text-blue-300', className)} {...props} />
  ),
  Image,
  Link
}

interface MDXComponentProps {
  code: string
}

export function MDXComponent({ code }: MDXComponentProps) {
  // Check if we're using ContentLayer or mock data
  const isMockData = code.includes('<h1>') && code.includes('<p>')

  if (isMockData) {
    // For mock data, render the HTML directly
    return (
      <FadeIn className='my-auto'>
        <div className='mdx-content prose prose-invert max-w-none' dangerouslySetInnerHTML={{ __html: code }} />
      </FadeIn>
    )
  }

  // For ContentLayer data, use the MDX component
  const MDXContent = useMDXComponent(code)

  return (
    <FadeIn className='my-auto'>
      <div className='mdx-content prose prose-invert max-w-none'>
        <MDXContent components={components} />
      </div>
    </FadeIn>
  )
}
