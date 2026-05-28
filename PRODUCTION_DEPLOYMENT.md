# 🚀 Production Deployment & Attendance System Guide

## Issues Fixed

### 1. **504 Gateway Timeout Errors** ✅
- **Root Cause**: SQLite database locking under concurrent load
- **Solution**: 
  - Added automatic retry logic with exponential backoff
  - Request deduplication to prevent double-submissions
  - 30-second timeout for production requests
  - Query timeout handling

### 2. **Database Concurrency Issues** ✅
- **Root Cause**: SQLite allows only one writer at a time
- **Solution**:
  - Implemented `withRetry()` helper (3-5 retries with exponential backoff)
  - Graceful error handling for database locks
  - Cache layer for recent requests (5-second TTL)

### 3. **No Graceful Recovery** ✅
- **Root Cause**: Crashed processes don't recover properly
- **Solution**:
  - Enhanced PM2 configuration with memory limits (500MB)
  - Added health check endpoint (`/_health`)
  - Graceful shutdown handling for active requests
  - Automatic restart on crashes (max 10 restarts)

---

## 📋 Employee Tracking System - Production Enhancements

### New Features Added

#### 1. **Request Deduplication**
Prevents accidental double check-in/check-out submissions:
```typescript
// File: src/lib/attendance-utils.ts
- getCacheKey() - Generate cache key
- getCachedResult() - Check if request was recently processed
- setCachedResult() - Cache successful operations
```

#### 2. **Automatic Retry Logic**
Handles temporary database locks:
```typescript
const result = await withRetry(
  () => prisma.shift.create(...),
  5,      // 5 retries
  150     // 150ms initial backoff
);
// Retries with: 150ms, 300ms, 600ms, 1.2s, 2.4s
```

#### 3. **Pagination Support**
Improved performance for large history queries:
```typescript
GET /api/attendance/history?limit=50&offset=0
// Returns: { data: [...], pagination: { limit, offset, total } }
```

#### 4. **Better Error Responses**
Intelligent status codes:
- `400` - Business logic errors (already checked out, etc.)
- `401` - Unauthorized
- `503` - Database locked (retryable)
- `504` - Request timeout

#### 5. **IP & User Agent Tracking**
Security audit logs:
- Check-in IP & user agent captured
- Check-out IP & user agent captured
- Useful for fraud detection and security reviews

---

## 🔧 Configuration Changes

### Updated Files

#### 1. **`ecosystem.config.js`** - PM2 Configuration
```javascript
✅ max_memory_restart: '500M'      // Auto-restart if memory > 500MB
✅ max_restarts: 10                // Allow up to 10 restarts
✅ listen_timeout: 10000           // 10s to become ready
✅ kill_timeout: 8000              // 8s graceful shutdown
✅ error/out_file logs             // Persistent logging
✅ DATABASE_CONNECTION_TIMEOUT     // 30s for slow networks
```

#### 2. **`server.js`** - Enhanced Error Handling
```javascript
✅ Request timeout tracking         // Per-request timeout (30s)
✅ Active request monitoring        // Prevents orphaned processes
✅ Graceful shutdown               // Waits for active requests
✅ Health check endpoint           // /_health for monitoring
✅ Memory usage monitoring         // Logs warnings at 85%
✅ Uncaught exception handling     // Better error recovery
```

#### 3. **`src/lib/prisma.ts`** - Resilient Database Client
```typescript
✅ Graceful shutdown hooks         // SIGTERM/SIGINT handling
✅ Exponential backoff retry       // Handles database locks
✅ withRetry() helper             // Reusable across APIs
✅ Connection timeout support     // ENV configurable
```

#### 4. **`src/lib/attendance-utils.ts`** - NEW FILE
Centralized attendance operations with:
- Request deduplication
- Cache management
- Safe check-in/check-out
- Error formatting
- History retrieval with pagination

#### 5. **API Routes** - Production Ready
- `POST /api/attendance` - Auto check-in with dedup & retry
- `GET /api/attendance` - Today's shift with caching
- `POST /api/attendance/check-out` - Resilient checkout
- `GET /api/attendance/history` - Paginated history

---

## 🚀 Deployment Instructions

### Step 1: Update PM2 Configuration
```bash
cd /home/ec2-user/bihospharma-web
pm2 update ecosystem.config.js
```

### Step 2: Restart the Application
```bash
pm2 restart bihos
pm2 logs bihos  # Monitor logs
```

### Step 3: Test Health Endpoint
```bash
curl https://bihospharma.com/_health
# Expected: { status: 'ok', uptime: XXXX, memory: {...}, activeRequests: 0 }
```

### Step 4: Monitor Logs
```bash
# Real-time logs
pm2 logs

# Check for database lock warnings
pm2 logs | grep "Retry\|BUSY\|locked"

# Check memory issues
pm2 logs | grep "WARNING"
```

---

## 📊 Monitoring & Troubleshooting

### Health Check Monitoring
```bash
# Add to your monitoring tool (Datadog, New Relic, etc.)
# Check every 30 seconds
curl -s https://bihospharma.com/_health | jq .activeRequests
```

### Common Issues & Fixes

#### ❌ Still getting 504 errors?
1. Check database file permissions:
   ```bash
   ls -la .env.local | grep DATABASE_URL
   ```
2. Increase retry count in `src/lib/attendance-utils.ts`:
   ```typescript
   return withRetry(operation, 7, 200); // 7 retries instead of 5
   ```
3. Consider migrating to PostgreSQL (see below)

#### ❌ High memory usage?
1. Check `pm2 monit` output
2. Reduce cache TTL in `src/lib/attendance-utils.ts`:
   ```typescript
   const CACHE_TTL = 3000; // 3 seconds instead of 5
   ```

#### ❌ Database locked errors persisting?
Upgrade to PostgreSQL (see below)

---

## 🗄️ Migration to PostgreSQL (Recommended for Production)

### Why PostgreSQL?
- ✅ Supports concurrent connections
- ✅ Connection pooling (multiple writers)
- ✅ ACID transactions
- ✅ Better for 50+ concurrent users
- ✅ No database locks under load

### Migration Steps

#### Step 1: Update Prisma Schema
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

#### Step 2: Create PostgreSQL Database
```bash
# On your RDS instance or PostgreSQL server
createdb bihospharma_prod

# Update .env
DATABASE_URL="postgresql://user:pass@host:5432/bihospharma_prod"
```

#### Step 3: Create Migration
```bash
npx prisma migrate dev --name migrate_to_postgres
```

#### Step 4: Deploy
```bash
pm2 restart bihos
```

### PostgreSQL Connection String Format
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public&sslmode=require
```

**Example (AWS RDS)**:
```
postgresql://admin:mypassword123@bihospharma.c123xyz.us-east-1.rds.amazonaws.com:5432/bihospharma_prod
```

---

## 📈 Performance Recommendations

### Immediate Actions (Next 1-2 days)
- [ ] Deploy current changes (SQLite improvements)
- [ ] Monitor 504 error rate
- [ ] Set up health check monitoring

### Short Term (1-2 weeks)
- [ ] If 504s persist → Add more retry attempts
- [ ] If memory issues → Reduce cache TTL
- [ ] Add database query monitoring

### Long Term (1-2 months)
- [ ] Migrate to PostgreSQL
- [ ] Implement Redis for distributed caching
- [ ] Add query result caching layer

---

## 🔒 Security Enhancements to Consider

### Current Status
- ✅ IP tracking for security audits
- ✅ User agent logging for device tracking
- ✅ Request deduplication prevents replay attacks

### Recommended Additions
1. **Rate Limiting**
   ```typescript
   // Add to API routes to prevent abuse
   const rateLimit = require('express-rate-limit');
   ```

2. **Request Signing**
   - Add HMAC signatures to prevent tampering

3. **Audit Logging**
   - Log all check-in/out to separate audit table

4. **Failed Login Monitoring**
   - Alert on suspicious login patterns

---

## 📞 Rollback Plan

If issues occur after deployment:

```bash
# Revert to previous version
pm2 revert bihos

# Or manually rollback
git checkout HEAD~1
npm run build
pm2 restart bihos
```

### Revert Specific Files
```bash
git checkout HEAD src/app/api/attendance/route.ts
git checkout HEAD src/lib/prisma.ts
pm2 restart bihos
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Health endpoint returns `{ status: 'ok' }`
- [ ] Employees can check in without 504 errors
- [ ] Employees can check out without errors
- [ ] Admin can view attendance history
- [ ] History loads within 2 seconds
- [ ] No database lock warnings in logs
- [ ] No memory warnings (should be < 300MB)
- [ ] PM2 process shows `online` status

```bash
# Quick verification script
curl -s https://bihospharma.com/_health && echo "✅ Health OK"
curl -s -X POST https://bihospharma.com/api/attendance && echo "✅ Check-in route works"
pm2 status
pm2 logs --lines 50 | grep ERROR
```

---

## 📞 Support & Questions

For issues or questions:
1. Check logs: `pm2 logs bihos`
2. Monitor dashboard: `pm2 monit`
3. Review this guide's troubleshooting section

---

**Last Updated**: May 28, 2026
**Author**: Senior Developer
**Status**: Ready for Production Deployment
