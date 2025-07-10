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
echo Frontend: https://your-app.vercel.app
echo Backend: https://your-app.railway.app
echo.
echo Next steps:
echo 1. Deploy backend to Railway/Render
echo 2. Update REACT_APP_API_URL in Vercel
echo 3. Test your deployed app!
pause 