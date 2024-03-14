import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./prisma/data/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      // if (token.role && session.user) {
      //   session.user.role = token.role as UserRole
      // }

      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      // }

      // if (session.user) {
      //   session.user.name = token.name
      //   session.user.email = token.email as string
      //   session.user.isOAuth = token.isOAuth as boolean
      // }
      console.log(session)

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
