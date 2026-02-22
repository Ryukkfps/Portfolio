#!/bin/bash

# Deployment script for Hostinger Linux server
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Pull latest changes (if using git)
if [ -d .git ]; then
    echo "📥 Pulling latest changes..."
    git pull
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma db push

# Build the application
echo "🏗️  Building application..."
npm run build:linux

# Restart PM2 process
echo "♻️  Restarting application..."
pm2 restart portfolio || pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

echo "✅ Deployment complete!"
echo "📊 Application status:"
pm2 status

echo ""
echo "📝 View logs with: pm2 logs portfolio"
echo "📊 Monitor with: pm2 monit"
