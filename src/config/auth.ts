import { getUserByEmail } from "@/actions/user"
import bcryptjs from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { signInWithPasswordSchema } from "@/validations/auth"

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
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
} satisfies NextAuthConfig
