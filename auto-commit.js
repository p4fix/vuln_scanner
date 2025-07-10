const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const WATCH_DIRECTORIES = [
  'vuln_scanner_api',
  'vuln-scanner-frontend'
];

const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '__pycache__',
  '*.pyc',
  '*.log',
  '.env',
  '.DS_Store'
];

let commitTimeout = null;
let isCommitting = false;

// Debounced commit function
function debouncedCommit() {
  if (commitTimeout) {
    clearTimeout(commitTimeout);
  }
  
  commitTimeout = setTimeout(() => {
    if (!isCommitting) {
      performCommit();
    }
  }, 2000); // Wait 2 seconds after last change
}

// Perform the actual commit
function performCommit() {
  isCommitting = true;
  console.log('🔄 Auto-committing changes...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const commitMessage = `Auto-commit: ${timestamp}`;
  
  // Add all changes
  exec('git add .', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error adding files:', error);
      isCommitting = false;
      return;
    }
    
    // Commit changes
    exec(`git commit -m "${commitMessage}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error committing:', error);
        isCommitting = false;
        return;
      }
      
      console.log('✅ Changes committed successfully');
      
      // Push to GitHub
      exec('git push origin main', (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Error pushing to GitHub:', error);
        } else {
          console.log('🚀 Changes pushed to GitHub successfully');
        }
        isCommitting = false;
      });
    });
  });
}

// Check if file should be ignored
function shouldIgnoreFile(filePath) {
  return IGNORE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

// Watch directory for changes
function watchDirectory(dirPath) {
  console.log(`👀 Watching directory: ${dirPath}`);
  
  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (filename && !shouldIgnoreFile(filename)) {
      console.log(`📝 File changed: ${filename}`);
      debouncedCommit();
    }
  });
}

// Main function
function startAutoCommit() {
  console.log('🚀 Starting auto-commit watcher...');
  console.log('📁 Watching directories:', WATCH_DIRECTORIES);
  console.log('⏰ Changes will be committed after 2 seconds of inactivity');
  console.log('🔄 Press Ctrl+C to stop\n');
  
  WATCH_DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
      watchDirectory(dir);
    } else {
      console.log(`⚠️  Directory not found: ${dir}`);
    }
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping auto-commit watcher...');
  process.exit(0);
});

// Start the watcher
startAutoCommit(); 