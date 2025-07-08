import React, { useEffect, useState } from 'react';
import { Shield, Globe, Server, Settings, Activity } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for user preference
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 shadow-sm border-b border-gray-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-zinc-100">
                Vulnerability Scanner
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-zinc-300">
                <Activity className="h-4 w-4 mr-1" />
                <span>API Status: Online</span>
              </div>
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-100 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-zinc-800 shadow-sm border-b border-gray-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <a
              href="#website-check"
              className="flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-zinc-300 hover:text-gray-700 dark:hover:text-zinc-100 hover:border-gray-300 dark:hover:border-zinc-500"
            >
              <Globe className="h-4 w-4 mr-2" />
              Website Check
            </a>
            <a
              href="#port-scan"
              className="flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-zinc-300 hover:text-gray-700 dark:hover:text-zinc-100 hover:border-gray-300 dark:hover:border-zinc-500"
            >
              <Server className="h-4 w-4 mr-2" />
              Port Scan
            </a>
            <a
              href="#banner-grab"
              className="flex items-center py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-zinc-300 hover:text-gray-700 dark:hover:text-zinc-100 hover:border-gray-300 dark:hover:border-zinc-500"
            >
              <Settings className="h-4 w-4 mr-2" />
              Banner Grab
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500 dark:text-zinc-400">
            <p>
              Vulnerability Scanner API - For educational and authorized testing purposes only.
            </p>
            <p className="mt-1">
              Use responsibly and only on systems you own or have explicit permission to test.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-700">
              <p className="text-xs text-gray-400 dark:text-zinc-500">
                Developed by{' '}
                <a 
                  href="https://github.com/p4fix" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  @p4fix
                </a>
                {' '}on GitHub
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 