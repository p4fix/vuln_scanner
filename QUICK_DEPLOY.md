# 🚀 Quick Deploy Guide

Deploy your Vulnerability Scanner in 5 minutes using Vercel + Railway!

## 📋 Prerequisites

1. **GitHub Account** - Your code should be on GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Railway Account** - Sign up at [railway.app](https://railway.app)

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Backend (Railway)

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Connect Your Repository**
   - Select your vulnerability scanner repository
   - Railway will auto-detect it's a Python project

3. **Configure Environment Variables**
   - Click on your deployed service
   - Go to "Variables" tab
   - Add these variables:
     ```
     API_KEY=your-secret-api-key-here
     DEBUG=False
     HOST=0.0.0.0
     PORT=5000
     ```

4. **Get Your Backend URL**
   - Railway will give you a URL like: `https://your-app.railway.app`
   - Copy this URL for the next step

### Step 2: Deploy Frontend (Vercel)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Root Directory**: `vuln-scanner-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

3. **Set Environment Variables**
   - Go to "Environment Variables"
   - Add these variables:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     REACT_APP_API_KEY=your-secret-api-key-here
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

### Step 3: Update CORS Settings

1. **Update Backend CORS**
   - In your Railway dashboard, go to your service
   - Add this environment variable:
     ```
     ALLOWED_HOSTS=localhost,127.0.0.1,your-frontend-url.vercel.app
     ```

2. **Restart Backend**
   - Railway will automatically restart with new settings

## 🎉 You're Done!

Your app is now live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure your frontend URL is in `ALLOWED_HOSTS`
   - Check that environment variables are set correctly

2. **API Connection Issues**
   - Verify the backend URL in `REACT_APP_API_URL`
   - Check that the API key matches in both frontend and backend

3. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify the build command is correct

### Getting Help

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Check deployment logs** in both platforms

## 💰 Cost

- **Vercel**: Free tier (100GB bandwidth/month)
- **Railway**: $5 credit/month (usually enough for small apps)

## 🔄 Auto-Deploy

Both platforms will automatically redeploy when you push to GitHub!

---

**Need help?** Check the full deployment guide in `DEPLOYMENT.md` for more options and detailed instructions. 