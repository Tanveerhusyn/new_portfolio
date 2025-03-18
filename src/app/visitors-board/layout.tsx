import { Metadata } from 'next'
import { ENV } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Visitors Board',
  description: 'Leave a message for Tanveer. Share your thoughts, feedback, or just say hello!',
  openGraph: {
    title: 'Visitors Board | Tanveer',
    description: 'Leave a message for Tanveer. Share your thoughts, feedback, or just say hello!'
  }
}

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
