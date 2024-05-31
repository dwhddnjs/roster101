import { User } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  playerList?: JSON
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
