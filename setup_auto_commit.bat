@echo off
echo Setting up Auto-Commit for Vulnerability Scanner
echo ===============================================
echo.

echo Checking prerequisites...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js is installed
)

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/
    pause
    exit /b 1
) else (
    echo ✅ Git is installed
)

echo.
echo Checking Git configuration...
echo.

REM Check if Git user is configured
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Git user name not configured
    set /p git_username="Enter your Git username: "
    git config user.name "%git_username%"
    echo ✅ Git username configured
) else (
    echo ✅ Git username is configured
)

git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Git user email not configured
    set /p git_email="Enter your Git email: "
    git config user.email "%git_email%"
    echo ✅ Git email configured
) else (
    echo ✅ Git email is configured
)

echo.
echo Checking GitHub repository...
echo.

REM Check if GitHub remote is configured
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  No GitHub remote configured
    echo.
    echo To set up GitHub remote, run these commands:
    echo 1. Create a new repository on GitHub
    echo 2. Run: git remote add origin https://github.com/yourusername/yourrepo.git
    echo 3. Run: git push -u origin main
    echo.
    set /p setup_remote="Do you want to set up the remote now? (y/n): "
    if /i "%setup_remote%"=="y" (
        set /p github_url="Enter your GitHub repository URL: "
        git remote add origin "%github_url%"
        echo ✅ GitHub remote configured
    )
) else (
    echo ✅ GitHub remote is configured
)

echo.
echo Setup complete! 🎉
echo.
echo To start auto-commit:
echo 1. Run: start_auto_commit.bat
echo 2. Or run: node auto-commit.js
echo.
echo The watcher will automatically:
echo - Monitor your project files for changes
echo - Commit changes after 3 seconds of inactivity
echo - Push changes to GitHub
echo.
pause 