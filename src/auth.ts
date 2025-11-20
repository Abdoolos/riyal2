import { linkOAuthAccount } from "@/actions/auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import authConfig from "@/config/auth"
import { prisma } from "@/config/db"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) await linkOAuthAccount({ userId: user.id })
    },
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "USER" | "ADMIN"
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account }) {
      if (!user.id) return false
      if (account?.provider !== "credentials") return true

      return true // Allow sign in
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
})
