import { linkOAuthAccount } from "@/actions/auth"
import { getUserByEmail } from "@/actions/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcryptjs from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { prisma } from "@/config/db"
import { signInWithPasswordSchema } from "@/validations/auth"

console.log("🔍 Auth: GOOGLE_ID =", process.env.GOOGLE_ID?.substring(0, 20))
console.log("🔍 Auth: GOOGLE_SECRET exists =", !!process.env.GOOGLE_SECRET)

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: true,
  providers: [
    Google,
    CredentialsProvider({
      async authorize(rawCredentials) {
        const validatedCredentials =
          signInWithPasswordSchema.safeParse(rawCredentials)

        if (validatedCredentials.success) {
          const user = await getUserByEmail({
            email: validatedCredentials.data.email,
          })
          if (!user || !user.passwordHash) return null

          const passwordIsValid = await bcryptjs.compare(
            validatedCredentials.data.password,
            user.passwordHash
          )

          if (passwordIsValid) return user
        }
        return null
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  events: {
    async linkAccount({ user }) {
      if (user.id) await linkOAuthAccount({ userId: user.id })
    },
  },
  callbacks: {
    jwt({ token, user }) {
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
    async signIn({ user, account, profile }) {
      console.log("🔍 signIn callback:", { 
        userId: user?.id, 
        provider: account?.provider,
        email: user?.email,
        profileEmail: (profile as any)?.email
      })
      
      // للمستخدمين الجدد من Google، قد لا يكون لديهم id بعد
      if (account?.provider === "google") {
        console.log("✅ Google sign in allowed")
        return true
      }
      
      if (!user.id) {
        console.log("❌ No user id")
        return false
      }
      
      return true
    },
  },
})
