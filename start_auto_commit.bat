@echo off
echo Starting Auto-Commit Watcher for Vulnerability Scanner
echo.
echo This will automatically commit and push changes to GitHub
echo as you make changes to the project files.
echo.
echo Make sure you have:
echo 1. Git configured with your credentials
echo 2. GitHub repository set up as origin
echo 3. Proper permissions to push to the repository
echo.
echo Starting watcher...
node auto-commit.js
pause 