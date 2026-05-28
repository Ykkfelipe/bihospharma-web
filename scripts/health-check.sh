#!/bin/bash
# Production Health Check & Monitoring Script
# Usage: ./scripts/health-check.sh

set -e

echo "🏥 Bihospharma Production Health Check"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
HEALTH_ENDPOINT="${HEALTH_ENDPOINT:-http://localhost:3000/_health}"
ATTENDANCE_ENDPOINT="${ATTENDANCE_ENDPOINT:-http://localhost:3000/api/attendance}"

# Check function
check_endpoint() {
    local name=$1
    local endpoint=$2
    local timeout=${3:-5}
    
    echo -n "Checking $name... "
    
    if response=$(curl -s --max-time $timeout "$endpoint" 2>/dev/null); then
        echo -e "${GREEN}✓${NC}"
        echo "  Response: $response" | head -c 100
        echo ""
    else
        echo -e "${RED}✗${NC} (timeout or connection error)"
    fi
}

# === SYSTEM CHECKS ===
echo "1️⃣  System Status"
echo "   ├─ Process Status:"
pm2 status 2>/dev/null || echo "   └─ PM2 not running - Start with: pm2 start ecosystem.config.js"

echo ""
echo "2️⃣  Server Health"
check_endpoint "Health Endpoint" "$HEALTH_ENDPOINT" 5

echo ""
echo "3️⃣  API Connectivity"
check_endpoint "Attendance API" "$ATTENDANCE_ENDPOINT" 5

echo ""
echo "4️⃣  Database Status"
if [ -f "./prisma/prod.db" ]; then
    echo -n "Database File: "
    size=$(du -h "./prisma/prod.db" | cut -f1)
    echo -e "${GREEN}✓${NC} ($size)"
else
    echo -e "Database File: ${YELLOW}⚠${NC} Not found at ./prisma/prod.db"
fi

echo ""
echo "5️⃣  Log Analysis (Last 20 lines)"
echo "   Error Logs:"
pm2 logs bihos --lines 20 2>/dev/null | grep -i error || echo "   ✓ No recent errors"

echo ""
echo "6️⃣  Memory Usage"
if pm2 show bihos 2>/dev/null | grep -q "pm2"; then
    pm2 monit --nolegend 2>/dev/null | head -3 || echo "   Run: pm2 monit"
fi

echo ""
echo "7️⃣  Performance Metrics"
echo "   Testing check-in speed..."
start_time=$(date +%s%N)
timeout 10 curl -s -X POST "$ATTENDANCE_ENDPOINT" > /dev/null 2>&1 || true
end_time=$(date +%s%N)
response_time=$(( (end_time - start_time) / 1000000 ))
echo "   Check-in API Response Time: ${response_time}ms"

echo ""
echo "========================================"
echo "✅ Health check completed!"
echo ""
echo "📊 Recommendations:"
echo "   • Monitor: pm2 monit"
echo "   • View logs: pm2 logs bihos"
echo "   • Restart service: pm2 restart bihos"
echo "   • Persistent logs: cat logs/output.log"
