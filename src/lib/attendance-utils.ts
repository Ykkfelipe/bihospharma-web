import { prisma, withRetry } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Request deduplication cache to prevent accidental double submissions
 * In production, use Redis or similar for distributed cache
 */
const requestCache = new Map<string, { timestamp: number; data: any }>();

/** Cache TTL in milliseconds — 5 seconds to prevent double-submission */
const CACHE_TTL = 5000;

interface CacheEntry {
    timestamp: number;
    data: unknown;
}

/** Clean up old cache entries */
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of requestCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
            requestCache.delete(key);
        }
    }
}, CACHE_TTL);

export function getCacheKey(userId: string, operation: string, date: string): string {
    return `${userId}:${operation}:${date}`;
}

export function getCachedResult<T>(cacheKey: string): T | null {
    const cached = requestCache.get(cacheKey);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > CACHE_TTL) {
        requestCache.delete(cacheKey);
        return null;
    }
    
    return cached.data as T;
}

export function setCachedResult(cacheKey: string, data: unknown): void {
    requestCache.set(cacheKey, { timestamp: Date.now(), data });
}

/**
 * Get today's date in Colombia timezone
 */
export function todayCO(): string {
    return new Date().toLocaleDateString("en-CA", { timeZone: "America/Bogota" });
}

/**
 * Get Colombia time
 */
export function getNowCO(): Date {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
}

/**
 * Safely check in a user with transaction safety and retry logic
 */
export async function safeCheckIn(
    userId: string,
    date: string,
    ipAddress: string | null,
    userAgent: string | null
) {
    return withRetry(async () => {
        const existing = await prisma.shift.findUnique({
            where: { userId_date: { userId, date } },
        });

        if (existing) {
            return { shift: existing, alreadyCheckedIn: true };
        }

        const nowCO = getNowCO();
        const isLate = nowCO.getHours() > 8 || (nowCO.getHours() === 8 && nowCO.getMinutes() > 0);

        const shift = await prisma.shift.create({
            data: {
                userId,
                date,
                checkIn: new Date(),
                ipAddress,
                userAgent,
                isLate,
            },
        });

        return { shift, alreadyCheckedIn: false };
    }, 5, 150); // 5 retries with exponential backoff starting at 150ms
}

/**
 * Safely check out a user with transaction safety and retry logic
 */
export async function safeCheckOut(
    userId: string,
    date: string,
    ipAddress: string | null,
    userAgent: string | null
) {
    return withRetry(async () => {
        const existing = await prisma.shift.findUnique({
            where: { userId_date: { userId, date } },
        });

        if (!existing) {
            throw new Error("No tienes una entrada registrada hoy.");
        }

        if (existing.checkOut) {
            throw new Error("Ya registraste tu salida hoy.");
        }

        const shift = await prisma.shift.update({
            where: { id: existing.id },
            data: {
                checkOut: new Date(),
                checkoutIpAddress: ipAddress,
                checkoutUserAgent: userAgent,
            },
        });

        return shift;
    }, 5, 150);
}

/**
 * Format error response with proper status codes
 */
export function formatErrorResponse(error: unknown, fallbackStatus: number = 500) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes("No tienes una entrada registrada hoy")) {
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    if (errorMessage.includes("Ya registraste tu salida")) {
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    if (errorMessage.includes("SQLITE_BUSY") || errorMessage.includes("database is locked")) {
        return NextResponse.json(
            { error: "Servidor muy ocupado. Por favor, intenta de nuevo.", retryable: true },
            { status: 503 }
        );
    }
    
    return NextResponse.json({ error: errorMessage }, { status: fallbackStatus });
}

/**
 * Get attendance history with pagination for better performance
 */
export async function getAttendanceHistory(
    userId: string | null = null,
    limit: number = 100,
    offset: number = 0
) {
    return withRetry(async () => {
        if (userId) {
            // Employee view: only their records
            return await prisma.shift.findMany({
                where: { userId },
                orderBy: [{ date: "desc" }, { checkIn: "desc" }],
                take: limit,
                skip: offset,
            });
        } else {
            // Admin view: all records with user info
            return await prisma.shift.findMany({
                orderBy: [{ date: "desc" }, { checkIn: "desc" }],
                take: limit,
                skip: offset,
                include: {
                    user: {
                        select: { id: true, name: true, email: true },
                    },
                },
            });
        }
    }, 3, 100);
}
