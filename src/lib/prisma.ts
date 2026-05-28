import { PrismaClient } from "@prisma/client";

// Prevent hot-reload from creating multiple instances in dev
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Calculate connection timeout based on environment
const connectionTimeout = process.env.DATABASE_CONNECTION_TIMEOUT 
  ? parseInt(process.env.DATABASE_CONNECTION_TIMEOUT) 
  : process.env.NODE_ENV === "production" 
    ? 30000  // 30 seconds for production
    : 10000; // 10 seconds for development

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Graceful disconnect on process termination
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, disconnecting Prisma...");
    await prisma.$disconnect();
    process.exit(0);
});

process.on("SIGINT", async () => {
    console.log("SIGINT received, disconnecting Prisma...");
    await prisma.$disconnect();
    process.exit(0);
});

// Export retry helper for resilient queries
export async function withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelayMs: number = 100
): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error as Error;
            const isRateLimitOrLock =
                lastError.message.includes("SQLITE_BUSY") ||
                lastError.message.includes("database is locked") ||
                lastError.message.includes("timeout");
            
            if (!isRateLimitOrLock || attempt === maxRetries) {
                throw error;
            }
            
            // Exponential backoff: 100ms, 200ms, 400ms, etc.
            const delayMs = baseDelayMs * Math.pow(2, attempt - 1);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            console.warn(`[Prisma Retry] Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
        }
    }
    
    throw lastError;
}
