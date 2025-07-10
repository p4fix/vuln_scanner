# 🚨 Railway Deployment Troubleshooting

If you're getting "Error creating build plan with Railpack" or other Railway deployment issues, try these solutions:

## 🔧 Quick Fixes

### 1. **Use Render Instead (Recommended)**
Railway can be finicky. Render is more reliable for Python apps:

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `python vuln_scanner_api/app.py`
6. Add environment variables

### 2. **Fix Railway Configuration**

If you want to stick with Railway, try these steps:

#### Option A: Use Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Select "Deploy from GitHub repo"
4. **Important**: Don't let Railway auto-detect
5. Manually set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python vuln_scanner_api/app.py`

#### Option B: Use Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### 3. **Alternative: Use Heroku**

Heroku is more reliable for Python apps:

1. Install Heroku CLI
2. Create `Procfile` (already created)
3. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## 🐛 Common Issues & Solutions

### Issue: "Error creating build plan with Railpack"

**Solution**: Railway's auto-detection is failing. Use manual configuration:

1. In Railway dashboard, go to your service
2. Click "Settings"
3. Set these manually:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python vuln_scanner_api/app.py`

### Issue: "Python not found"

**Solution**: Add explicit Python version:

1. Make sure `runtime.txt` exists with: `python-3.9.16`
2. Or use `nixpacks.toml` (already created)

### Issue: "Module not found"

**Solution**: Check your file structure:

```
your-repo/
├── vuln_scanner_api/
│   ├── app.py
│   ├── config.py
│   └── ...
├── requirements.txt
├── Procfile
└── runtime.txt
```

### Issue: "Port binding error"

**Solution**: Update your app to use environment variables:

The app already uses `Config.PORT` and `Config.HOST`, which should work with Railway's `PORT` environment variable.

## 🎯 Recommended Approach

### For Beginners: Use Render
1. **More reliable** for Python apps
2. **Better error messages**
3. **Easier configuration**
4. **Free tier available**

### For Advanced Users: Fix Railway
1. Use manual configuration instead of auto-detection
2. Set build and start commands explicitly
3. Use the `railway.json` and `nixpacks.toml` files

## 🔄 Alternative Deployment Options

### 1. **Render** (Recommended)
- More reliable for Python
- Better free tier
- Easier configuration

### 2. **Heroku**
- Classic Python hosting
- Good documentation
- Free tier available

### 3. **DigitalOcean App Platform**
- Very reliable
- Good free tier
- Easy deployment

### 4. **Google Cloud Run**
- Serverless
- Pay per use
- Very scalable

## 🛠️ Manual Railway Setup

If you want to fix Railway specifically:

1. **Delete and recreate** your Railway project
2. **Don't use auto-detection**
3. **Set these manually**:
   ```
   Build Command: pip install -r requirements.txt
   Start Command: python vuln_scanner_api/app.py
   ```
4. **Add environment variables**:
   ```
   API_KEY=your-secret-api-key-here
   DEBUG=False
   HOST=0.0.0.0
   PORT=5000
   ```

## 📞 Getting Help

- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Render Support**: [render.com/docs](https://render.com/docs)
- **Check deployment logs** in Railway dashboard

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ Health check passes (`/health` endpoint)
- ✅ App responds to requests
- ✅ Environment variables are set correctly

---

**Still having issues?** Try Render - it's more reliable for Python apps! 