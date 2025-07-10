const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const CONFIG = {
  // Directories to watch
  WATCH_DIRECTORIES: [
    'vuln_scanner_api',
    'vuln-scanner-frontend'
  ],
  
  // Files/patterns to ignore
  IGNORE_PATTERNS: [
    'node_modules',
    '.git',
    'dist',
    'build',
    '__pycache__',
    '*.pyc',
    '*.log',
    '.env',
    '.DS_Store',
    'package-lock.json',
    'yarn.lock'
  ],
  
  // Git settings
  GIT_BRANCH: 'main',
  GIT_REMOTE: 'origin',
  
  // Timing settings
  COMMIT_DELAY: 3000, // 3 seconds
  MAX_COMMIT_SIZE: 50, // Max files per commit
  
  // Commit message settings
  USE_TIMESTAMP: true,
  CUSTOM_PREFIX: 'Auto-commit',
  
  // GitHub settings
  PUSH_TO_GITHUB: true,
  CREATE_PR: false
};

let commitTimeout = null;
let isCommitting = false;
let pendingChanges = new Set();

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const emoji = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    file: '📝'
  };
  
  console.log(`${emoji[type]} [${timestamp}] ${message}`);
}

function shouldIgnoreFile(filePath) {
  return CONFIG.IGNORE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

function getGitStatus() {
  return new Promise((resolve, reject) => {
    exec('git status --porcelain', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim().split('\n').filter(line => line.length > 0));
    });
  });
}

function generateCommitMessage() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const prefix = CONFIG.CUSTOM_PREFIX;
  
  if (CONFIG.USE_TIMESTAMP) {
    return `${prefix}: ${timestamp}`;
  }
  
  return `${prefix}: Changes detected`;
}

// Debounced commit function
function debouncedCommit(filePath) {
  if (filePath) {
    pendingChanges.add(filePath);
  }
  
  if (commitTimeout) {
    clearTimeout(commitTimeout);
  }
  
  commitTimeout = setTimeout(() => {
    if (!isCommitting && pendingChanges.size > 0) {
      performCommit();
    }
  }, CONFIG.COMMIT_DELAY);
}

// Perform the actual commit
async function performCommit() {
  if (isCommitting) return;
  
  isCommitting = true;
  log('Starting auto-commit process...', 'info');
  
  try {
    // Check if there are any changes
    const status = await getGitStatus();
    if (status.length === 0) {
      log('No changes to commit', 'warning');
      isCommitting = false;
      pendingChanges.clear();
      return;
    }
    
    log(`Found ${status.length} changed files`, 'info');
    
    // Add all changes
    await executeCommand('git add .');
    log('Files staged successfully', 'success');
    
    // Generate commit message
    const commitMessage = generateCommitMessage();
    
    // Commit changes
    await executeCommand(`git commit -m "${commitMessage}"`);
    log('Changes committed successfully', 'success');
    
    // Push to GitHub if enabled
    if (CONFIG.PUSH_TO_GITHUB) {
      await executeCommand(`git push ${CONFIG.GIT_REMOTE} ${CONFIG.GIT_BRANCH}`);
      log('Changes pushed to GitHub successfully', 'success');
    }
    
    pendingChanges.clear();
    
  } catch (error) {
    log(`Error during commit: ${error.message}`, 'error');
  } finally {
    isCommitting = false;
  }
}

// Execute command with promise
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

// Watch directory for changes
function watchDirectory(dirPath) {
  log(`Watching directory: ${dirPath}`, 'info');
  
  if (!fs.existsSync(dirPath)) {
    log(`Directory not found: ${dirPath}`, 'warning');
    return;
  }
  
  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (filename && !shouldIgnoreFile(filename)) {
      const fullPath = path.join(dirPath, filename);
      log(`File changed: ${fullPath}`, 'file');
      debouncedCommit(fullPath);
    }
  });
}

// Initialize Git repository if needed
async function initializeGit() {
  try {
    // Check if git is initialized
    await executeCommand('git status');
    log('Git repository found', 'success');
  } catch (error) {
    log('Git repository not found. Initializing...', 'warning');
    await executeCommand('git init');
    await executeCommand('git add .');
    await executeCommand('git commit -m "Initial commit"');
    log('Git repository initialized', 'success');
  }
}

// Check GitHub remote
async function checkGitHubRemote() {
  try {
    const remotes = await executeCommand('git remote -v');
    if (remotes.includes('origin')) {
      log('GitHub remote found', 'success');
      return true;
    } else {
      log('No GitHub remote found. Please add your GitHub repository:', 'warning');
      log('git remote add origin https://github.com/yourusername/yourrepo.git', 'info');
      return false;
    }
  } catch (error) {
    log('Error checking GitHub remote', 'error');
    return false;
  }
}

// Main function
async function startAutoCommit() {
  console.log('🚀 Starting Advanced Auto-Commit Watcher...');
  console.log('📁 Watching directories:', CONFIG.WATCH_DIRECTORIES);
  console.log(`⏰ Changes will be committed after ${CONFIG.COMMIT_DELAY/1000} seconds of inactivity`);
  console.log(`🌐 Push to GitHub: ${CONFIG.PUSH_TO_GITHUB ? 'Enabled' : 'Disabled'}`);
  console.log('🔄 Press Ctrl+C to stop\n');
  
  try {
    // Initialize Git if needed
    await initializeGit();
    
    // Check GitHub remote
    if (CONFIG.PUSH_TO_GITHUB) {
      await checkGitHubRemote();
    }
    
    // Start watching directories
    CONFIG.WATCH_DIRECTORIES.forEach(watchDirectory);
    
  } catch (error) {
    log(`Error during initialization: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('Stopping auto-commit watcher...', 'info');
  if (commitTimeout) {
    clearTimeout(commitTimeout);
  }
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  log(`Uncaught Exception: ${error.message}`, 'error');
  process.exit(1);
});

// Start the watcher
startAutoCommit(); 