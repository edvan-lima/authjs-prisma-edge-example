import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/prisma"


export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: { password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        if (credentials.password !== "password") return null
        return {
          id: "1",
          name: "Fill Murray",
          email: "bill@fillmurray.com",
          image: "https://source.boringavatars.com/marble/120",
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session?.user?.name
      return token
    },
  },
})
