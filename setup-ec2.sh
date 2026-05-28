#!/bin/bash
# EC2 Setup Script — Run this on your EC2 server to initialize the application
# Usage: bash ~/setup-ec2.sh

set -e

APP_DIR="/home/ec2-user/bihospharma-web"
ENV_FILE="$APP_DIR/.env.production"

echo "📋 Bihospharma EC2 Setup"
echo "======================="
echo ""

# 1. Create .env.production if it doesn't exist
if [ ! -f "$ENV_FILE" ]; then
    echo "📝 Creating .env.production..."
    cat > "$ENV_FILE" << 'EOF'
# Production Environment Configuration
NODE_ENV=production
PORT=3000

# Authentication
NEXTAUTH_URL=https://bihospharma.com
AUTH_URL=https://bihospharma.com/api/auth
NEXTAUTH_SECRET=b156f4bf04976b13aacc15524fd7127a30932c87df70d0a4de0ae5b72c2d2515
AUTH_SECRET=b156f4bf04976b13aacc15524fd7127a30932c87df70d0a4de0ae5b72c2d2515

# Database Configuration
DATABASE_URL=file:./prod.db
PORTAL_ACCESS_CODE=BIHOS2026!

# Database connection optimization
DATABASE_CONNECTION_TIMEOUT=30000
REQUEST_TIMEOUT_MS=30000
EOF
    chmod 600 "$ENV_FILE"
    echo "✓ .env.production created"
else
    echo "✓ .env.production already exists (skipping creation)"
fi

echo ""
echo "🗄️  Initializing database..."
cd "$APP_DIR"

# 2. Run migrations to create the database schema
echo "▸ Running Prisma migrations..."
npx prisma migrate deploy || npx prisma db push || true

# 3. Generate Prisma client
echo "▸ Generating Prisma client..."
npx prisma generate

echo ""
echo "✅ EC2 Setup Complete!"
echo ""
echo "📊 Next steps:"
echo "  1. Restart PM2: pm2 restart bihos"
echo "  2. Check logs: pm2 logs bihos"
echo "  3. Test login at: https://bihospharma.com/personal/login"
echo ""
echo "📝 If you need to add admin users, run:"
echo "   cd $APP_DIR && node -e \"require('./prisma/seed.ts')\""
