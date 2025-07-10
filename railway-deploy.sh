#!/bin/bash

echo "🚀 Deploying to Railway..."

# Install Railway CLI if not installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "Logging into Railway..."
railway login

# Deploy to Railway
echo "Deploying to Railway..."
railway up

echo "✅ Railway deployment complete!"
echo "Your app should be available at: https://your-app.railway.app" 