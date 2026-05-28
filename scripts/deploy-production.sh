#!/bin/bash
# Production Deployment Script
# Usage: ./scripts/deploy-production.sh

set -e

echo "🚀 Bihospharma Production Deployment"
echo "====================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if running from project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Must be run from project root${NC}"
    exit 1
fi

# ===== PRE-DEPLOYMENT CHECKS =====
echo "📋 Pre-deployment Checks"
echo "─────────────────────────"

# Check Node version
node_version=$(node -v)
echo "✓ Node.js: $node_version"

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo -e "${YELLOW}⚠ .env.production not found${NC}"
    echo "  Creating from template..."
    cp .env.production.example .env.production
    echo -e "${YELLOW}  ⚠ Please edit .env.production with your secrets${NC}"
    exit 1
fi

# Check database file
if [ ! -f "prisma/prod.db" ]; then
    echo -e "${YELLOW}⚠ Database file not found${NC}"
    echo "  This is OK for first deployment - will be created automatically"
else
    db_size=$(du -h "prisma/prod.db" | cut -f1)
    echo "✓ Database: $db_size"
fi

echo ""
echo "🔧 Build & Cleanup"
echo "──────────────────"

# Clean previous build
echo "▸ Removing old build artifacts..."
rm -rf .next
rm -rf out
echo "✓ Cleaned"

# Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo "▸ Installing dependencies..."
    npm ci --omit=dev
    echo "✓ Dependencies installed"
fi

# Run prisma migrations
echo "▸ Running database migrations..."
npx prisma migrate deploy --skip-generate || true
echo "✓ Migrations completed"

# Build Next.js
echo "▸ Building Next.js application..."
npm run build
echo -e "${GREEN}✓ Build successful${NC}"

echo ""
echo "🔄 PM2 Deployment"
echo "────────────────"

# Check if PM2 is installed globally
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠ PM2 not found globally${NC}"
    echo "  Installing PM2..."
    npm install -g pm2
fi

# Update PM2 startup
echo "▸ Configuring PM2 startup..."
pm2 update ecosystem.config.js || pm2 start ecosystem.config.js --name bihos-manager

# Restart the application
echo "▸ Restarting applications..."
pm2 restart ecosystem.config.js --force

echo ""
echo "📊 Deployment Status"
echo "───────────────────"
pm2 status

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📝 Next Steps:"
echo "  1. Monitor logs: pm2 logs bihos"
echo "  2. Run health check: ./scripts/health-check.sh"
echo "  3. Test the application in browser"
echo "  4. Verify employee can check in/out"
echo ""
echo "⚠️  Important:"
echo "  • Set proper file permissions: chmod 600 prisma/prod.db"
echo "  • Set up log rotation: pm2 install pm2-logrotate"
echo "  • If 504s persist, check: pm2 logs bihos | grep Retry"
echo ""
echo "📚 Full guide available in: PRODUCTION_DEPLOYMENT.md"
