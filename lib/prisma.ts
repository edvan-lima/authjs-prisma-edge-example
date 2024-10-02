import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const neon = new Pool({
  connectionString: process.env.AUTH_POSTGRES_PRISMA_URL,
})
const adapter = new PrismaNeon(neon)

export const db = globalForPrisma.prisma || new PrismaClient({adapter})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
