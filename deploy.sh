#!/bin/bash
# Deployment helper script for Contact Card

echo "🚀 Contact Card Deployment Helper"
echo "================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

echo "📦 Building frontend..."
npm run build

echo ""
echo "🔧 Backend Deployment Options:"
echo ""
echo "1. Deploy to Railway (recommended)"
echo "   cd api && railway login && railway init && railway up"
echo ""
echo "2. Deploy to Render"
echo "   - Go to https://dashboard.render.com"
echo "   - Create new Web Service"
echo "   - Connect GitHub repo"
echo "   - Set root directory to 'api'"
echo "   - Build command: npm install && npm run build"
echo "   - Start command: npm run start"
echo ""
echo "3. Manual deployment"
echo "   - Any Node.js hosting that supports Express"
echo "   - Set environment variables (see api/.env.example)"
echo ""

echo "📝 Next steps after backend deploy:"
echo "1. Copy the deployed API URL"
echo "2. Create .env.local with: NEXT_PUBLIC_API_URL=your-api-url"
echo "3. Run: vercel --prod"
echo ""

echo "✅ Frontend deployment:"
echo "   vercel --prod"
echo ""