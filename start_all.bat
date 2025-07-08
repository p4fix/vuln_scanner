@echo off
echo Starting Vulnerability Scanner - Full Stack
echo.
echo This will start both the API server and frontend.
echo.
echo Starting API server...
start "API Server" cmd /k "cd vuln_scanner_api && python app.py"
echo.
echo Starting Frontend...
start "Frontend" cmd /k "cd vuln-scanner-frontend && npm start"
echo.
echo Both servers are starting...
echo API will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit this launcher...
pause > nul 