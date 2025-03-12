import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { DefaultSession } from 'next-auth'

import { ENV } from './constants'
import { db } from './prisma'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

// Create a custom adapter to avoid type issues
const customPrismaAdapter = PrismaAdapter(db) as any

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  secret: ENV.AUTH_SECRET,
  adapter: customPrismaAdapter,
  providers: [
    GitHub({
      clientId: ENV.GITHUB_CLIENT_ID,
      clientSecret: ENV.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
  },
  pages: {
    error: '/'
  }
})
