# Free Deployment Guide

This guide shows you how to deploy your Vulnerability Scanner for free using various hosting platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel + Railway (Recommended)
- **Frontend**: Vercel (React)
- **Backend**: Railway (Python Flask)
- **Cost**: Free tier available for both

### Option 2: Netlify + Render
- **Frontend**: Netlify (React)
- **Backend**: Render (Python Flask)
- **Cost**: Free tier available for both

### Option 3: GitHub Pages + Railway
- **Frontend**: GitHub Pages (React)
- **Backend**: Railway (Python Flask)
- **Cost**: Completely free

---

## 🎯 Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Build the project**:
   ```bash
   cd vuln-scanner-frontend
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Configure environment variables** in Vercel dashboard:
   - `REACT_APP_API_URL`: Your backend URL

### Netlify

1. **Create `netlify.toml`** in `vuln-scanner-frontend/`:
   ```toml
   [build]
     publish = "build"
     command = "npm run build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   cd vuln-scanner-frontend
   netlify deploy --prod
   ```

### GitHub Pages

1. **Add homepage** to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts** to `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## 🔧 Backend Deployment

### Railway (Recommended)

1. **Create `Procfile`** in root directory:
   ```
   web: cd vuln_scanner_api && python app.py
   ```

2. **Create `runtime.txt`** in root directory:
   ```
   python-3.9.18
   ```

3. **Deploy to Railway**:
   - Connect your GitHub repo to Railway
   - Railway will auto-detect Python and deploy

4. **Set environment variables** in Railway dashboard:
   ```
   API_KEY=your-secret-api-key-here
   DEBUG=False
   HOST=0.0.0.0
   PORT=5000
   ```

### Render

1. **Create `render.yaml`** in root directory:
   ```yaml
   services:
     - type: web
       name: vuln-scanner-api
       env: python
       buildCommand: pip install -r requirements.txt
       startCommand: cd vuln_scanner_api && python app.py
       envVars:
         - key: API_KEY
           value: your-secret-api-key-here
         - key: DEBUG
           value: false
   ```

2. **Deploy**:
   - Connect your GitHub repo to Render
   - Render will auto-deploy

### Heroku (Free tier discontinued, but still works)

1. **Create `Procfile`** in root directory:
   ```
   web: cd vuln_scanner_api && python app.py
   ```

2. **Create `runtime.txt`** in root directory:
   ```
   python-3.9.18
   ```

3. **Deploy**:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

---

## 🔗 Connecting Frontend to Backend

### Update API Configuration

1. **Update frontend API URL** in `vuln-scanner-frontend/src/services/api.ts`:
   ```typescript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.com';
   ```

2. **Set environment variable** in your frontend hosting platform:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

### CORS Configuration

Update `vuln_scanner_api/config.py` to allow your frontend domain:

```python
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'your-frontend-domain.vercel.app',
    'your-frontend-domain.netlify.app',
    'your-frontend-domain.github.io'
]
```

---

## 🛠️ Deployment Scripts

### Quick Deploy Script

Create `deploy.sh` in root directory:

```bash
#!/bin/bash

echo "🚀 Deploying Vulnerability Scanner..."

# Build frontend
echo "📦 Building frontend..."
cd vuln-scanner-frontend
npm install
npm run build
cd ..

# Deploy frontend to Vercel
echo "🌐 Deploying frontend to Vercel..."
cd vuln-scanner-frontend
vercel --prod --yes
cd ..

echo "✅ Deployment complete!"
echo "Frontend: https://your-app.vercel.app"
echo "Backend: https://your-app.railway.app"
```

### Windows Batch File

Create `deploy.bat`:

```batch
@echo off
echo 🚀 Deploying Vulnerability Scanner...

echo 📦 Building frontend...
cd vuln-scanner-frontend
call npm install
call npm run build
cd ..

echo 🌐 Deploying frontend to Vercel...
cd vuln-scanner-frontend
call vercel --prod --yes
cd ..

echo ✅ Deployment complete!
pause
```

---

## 🔒 Security Considerations

### For Production Deployment

1. **Change default API key**:
   ```python
   # In vuln_scanner_api/config.py
   API_KEY = os.getenv('API_KEY', 'your-new-secure-api-key')
   ```

2. **Enable HTTPS**:
   - Most platforms provide HTTPS automatically
   - Update frontend to use HTTPS URLs

3. **Set proper CORS**:
   - Only allow your frontend domain
   - Remove localhost from production

4. **Environment variables**:
   - Never commit API keys to Git
   - Use platform environment variables

---

## 📊 Monitoring & Analytics

### Free Monitoring Options

1. **Uptime Robot** - Free uptime monitoring
2. **Google Analytics** - Free website analytics
3. **Sentry** - Free error tracking
4. **LogRocket** - Free session replay

### Health Checks

Your API includes a health check endpoint:
```
GET /health
```

Use this for monitoring services.

---

## 🎯 Recommended Setup

### For Beginners (Easiest)

1. **Frontend**: Vercel
   - Automatic deployments from Git
   - Great React support
   - Free SSL certificates

2. **Backend**: Railway
   - Simple Python deployment
   - Automatic environment variables
   - Good free tier

### For Advanced Users

1. **Frontend**: Netlify
   - More customization options
   - Better build controls

2. **Backend**: Render
   - More control over deployment
   - Better logging

---

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check `ALLOWED_HOSTS` in backend config
   - Ensure frontend URL is included

2. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **API Connection Issues**:
   - Verify environment variables are set
   - Check backend is running and accessible

4. **Environment Variables**:
   - Ensure they're set in hosting platform dashboard
   - Restart deployment after adding variables

### Getting Help

- Check platform-specific documentation
- Review deployment logs
- Test locally before deploying
- Use platform support channels

---

## 💰 Cost Breakdown

### Free Tier Limits

**Vercel**:
- 100GB bandwidth/month
- 100 serverless function executions/day
- Unlimited personal projects

**Railway**:
- $5 credit/month (usually enough for small apps)
- Automatic scaling

**Netlify**:
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited personal sites

**Render**:
- 750 hours/month for web services
- Automatic sleep after 15 minutes of inactivity

---

## 🎉 Success!

After deployment, your app will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

Remember to:
1. Test all functionality
2. Update documentation with new URLs
3. Set up monitoring
4. Share your deployed app!

Happy deploying! 🚀 