import './globals.css'
import Script from 'next/script'
import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { ThemeWrapper } from '@/components/atoms/theme-wrapper'
import { Navbar } from '@/components/organisms/navbar'
import { NavbarMobile, NavbarProvider } from '@/components/organisms/navbar-mobile'
import { Footer } from '@/components/organisms/footer'
import { ResponsiveIndicator } from '@/components/atoms/responsive-indicator'
import { MacDock } from '@/components/molecules/mac-dock'

import { ENV } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(ENV.NEXT_PUBLIC_WEBSITE_URL),
  title: {
    default: 'Tanveer',
    template: '%s | Tanveer'
  },
  description:
    "Get to know me, Tanveer Hussain, through this website! I'm a passionate Fullstack developer, and I've poured my skills and creativity into building this site with Next.js and Tailwind CSS. Explore my interactive projects, clean portfolio, and a glimpse into my technical expertise. If you're seeking a talented developer for your next project or simply looking for inspiration, feel free to get in touch!",
  openGraph: {
    title: 'Tanveer',
    description:
      "Get to know me, Tanveer Hussain, through this website! I'm a passionate Fullstack developer, and I've poured my skills and creativity into building this site with Next.js and Tailwind CSS. Explore my interactive projects, clean portfolio, and a glimpse into my technical expertise. If you're seeking a talented developer for your next project or simply looking for inspiration, feel free to get in touch!",
    url: ENV.NEXT_PUBLIC_WEBSITE_URL,
    siteName: 'Tanveer',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Tanveer',
    card: 'summary_large_image'
  },
  verification: {
    google: ENV.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono relative`}>
        <video playsInline autoPlay muted loop>
          <source src='/background-vid.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <ThemeWrapper attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <main className='absolute left-50 top-50'>
            <NavbarProvider>
              <Navbar />
              <NavbarMobile />
            </NavbarProvider>
            {children}
            <Footer />
            <MacDock />
          </main>
        </ThemeWrapper>
        {process.env.NODE_ENV === 'production' && (
          <>
            <SpeedInsights />
          </>
        )}
      </body>
      <ResponsiveIndicator />
    </html>
  )
}
