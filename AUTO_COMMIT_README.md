# Auto-Commit System for Vulnerability Scanner

This system automatically commits and pushes your changes to GitHub as you work on the project.

## 🚀 Quick Start

### 1. Setup (First Time Only)
```bash
# Run the setup script
setup_auto_commit.bat
```

### 2. Start Auto-Commit
```bash
# Option 1: Using batch file
start_auto_commit.bat

# Option 2: Using Node.js directly
node auto-commit.js

# Option 3: Using advanced version
node auto-commit-advanced.js
```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **Git** (configured with your credentials)
- **GitHub repository** (set up as origin)

## ⚙️ Configuration

### Basic Configuration (`auto-commit.js`)
- **Watch Directories**: `vuln_scanner_api`, `vuln-scanner-frontend`
- **Commit Delay**: 2 seconds
- **Ignore Patterns**: `node_modules`, `.git`, `dist`, `build`, etc.

### Advanced Configuration (`auto-commit-advanced.js`)
```javascript
const CONFIG = {
  WATCH_DIRECTORIES: ['vuln_scanner_api', 'vuln-scanner-frontend'],
  COMMIT_DELAY: 3000, // 3 seconds
  PUSH_TO_GITHUB: true,
  CUSTOM_PREFIX: 'Auto-commit',
  USE_TIMESTAMP: true
};
```

## 🔧 Manual Setup

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Add GitHub Remote
```bash
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main
```

### 3. Configure Git Credentials
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## 📁 File Structure

```
vuln-scanner/
├── auto-commit.js              # Basic auto-commit script
├── auto-commit-advanced.js     # Advanced auto-commit script
├── start_auto_commit.bat       # Windows batch file to start
├── setup_auto_commit.bat       # Setup script
├── package.json                # Node.js package file
├── AUTO_COMMIT_README.md       # This file
├── vuln_scanner_api/          # Backend directory (watched)
└── vuln-scanner-frontend/     # Frontend directory (watched)
```

## 🎯 Features

### ✅ What It Does
- **File Watching**: Monitors specified directories for changes
- **Debounced Commits**: Waits for inactivity before committing
- **Automatic Push**: Pushes changes to GitHub automatically
- **Smart Ignoring**: Ignores build files, dependencies, etc.
- **Error Handling**: Graceful error handling and logging
- **Timestamped Commits**: Creates commits with timestamps

### 🚫 What It Ignores
- `node_modules/` (dependencies)
- `.git/` (Git metadata)
- `dist/`, `build/` (build outputs)
- `__pycache__/`, `*.pyc` (Python cache)
- `*.log` (log files)
- `.env` (environment files)
- `package-lock.json`, `yarn.lock` (lock files)

## 🔄 Usage Examples

### Start Auto-Commit
```bash
# Start the basic version
node auto-commit.js

# Start the advanced version
node auto-commit-advanced.js

# Start using batch file (Windows)
start_auto_commit.bat
```

### Stop Auto-Commit
Press `Ctrl+C` to stop the watcher gracefully.

## 📊 Monitoring

The system provides real-time feedback:

```
🚀 Starting Advanced Auto-Commit Watcher...
📁 Watching directories: vuln_scanner_api, vuln-scanner-frontend
⏰ Changes will be committed after 3 seconds of inactivity
🌐 Push to GitHub: Enabled
🔄 Press Ctrl+C to stop

👀 Watching directory: vuln_scanner_api
👀 Watching directory: vuln-scanner-frontend
📝 File changed: vuln-scanner-frontend/src/App.tsx
🔄 Auto-committing changes...
✅ Changes committed successfully
🚀 Changes pushed to GitHub successfully
```

## ⚠️ Important Notes

### Security
- **Never commit sensitive data** (API keys, passwords, etc.)
- **Use `.gitignore`** to exclude sensitive files
- **Review commits** before pushing to production

### Best Practices
- **Test changes** before relying on auto-commit
- **Use feature branches** for major changes
- **Review commit history** regularly
- **Backup your work** independently

### Troubleshooting

#### Common Issues

1. **"Git not configured"**
   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

2. **"No GitHub remote"**
   ```bash
   git remote add origin https://github.com/yourusername/yourrepo.git
   ```

3. **"Permission denied"**
   - Check GitHub credentials
   - Use SSH keys or personal access tokens
   - Ensure repository permissions

4. **"Node.js not found"**
   - Install Node.js from https://nodejs.org/
   - Restart command prompt after installation

#### Debug Mode
```bash
# Run with verbose logging
DEBUG=* node auto-commit-advanced.js
```

## 🔧 Customization

### Modify Watch Directories
Edit the `WATCH_DIRECTORIES` array in the script:
```javascript
const WATCH_DIRECTORIES = [
  'vuln_scanner_api',
  'vuln-scanner-frontend',
  'docs',  // Add more directories
  'scripts'
];
```

### Change Commit Delay
```javascript
const COMMIT_DELAY = 5000; // 5 seconds
```

### Custom Commit Messages
```javascript
const CUSTOM_PREFIX = 'VulnScanner Update';
```

### Disable GitHub Push
```javascript
const PUSH_TO_GITHUB = false; // Only commit locally
```

## 📈 Advanced Features

### Multiple Branches
The advanced script supports different branches:
```javascript
const GIT_BRANCH = 'develop'; // Change branch
```

### Custom Ignore Patterns
Add more patterns to ignore:
```javascript
const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '__pycache__',
  '*.pyc',
  '*.log',
  '.env',
  '.DS_Store',
  'temp/',  // Add custom patterns
  '*.tmp'
];
```

## 🆘 Support

If you encounter issues:

1. **Check prerequisites** (Node.js, Git, GitHub)
2. **Run setup script** (`setup_auto_commit.bat`)
3. **Check Git configuration** (`git config --list`)
4. **Verify GitHub remote** (`git remote -v`)
5. **Review error logs** in console output

## 📝 License

This auto-commit system is part of the Vulnerability Scanner project and follows the same license terms.

---

**Happy coding! 🚀**

Your changes will now be automatically committed and pushed to GitHub as you work on the project. 