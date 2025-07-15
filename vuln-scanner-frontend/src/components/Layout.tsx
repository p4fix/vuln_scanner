import React, { useEffect, useState } from 'react';
import { Shield, Globe, Server, Settings, Activity, Zap, Cpu, Network } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab = 'website-check', onTabChange }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for user preference
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 -z-10">
        <div className={`absolute inset-0 ${darkMode ? 'gradient-dark-1' : 'gradient-light-1'}`}></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-10 float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header with Glassmorphism */}
      <header className="relative z-10">
        <div className="glass border-b border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Shield className="h-12 w-12 text-blue-400 float" />
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-10 blur-xl"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white font-serif tracking-wide">
                    Vulnerability Scanner
                  </h1>
                  <p className="text-blue-200 text-sm">Advanced Security Analysis Tool</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                {/* Status Indicator */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse"></div>
                  <span className="text-white text-sm">API Online</span>
                </div>
                
                {/* Dark mode toggle with 3D effect */}
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="btn-3d px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '🌙 Dark' : '☀️ Light'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation with 3D Cards */}
      <nav className="relative z-10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div 
              className={`card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                activeTab === 'home' ? 'ring-2 ring-indigo-400/50 glow' : ''
              }`}
              onClick={() => handleTabClick('home')}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  activeTab === 'home' ? 'bg-indigo-500/20' : 'bg-indigo-500/10'
                }`}>
                  <Shield className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Home</h3>
                <p className="text-indigo-200 text-sm">Welcome & Overview</p>
              </div>
            </div>
            
            <div 
              className={`card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                activeTab === 'website-check' ? 'ring-2 ring-blue-400/50 glow' : ''
              }`}
              onClick={() => handleTabClick('website-check')}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  activeTab === 'website-check' ? 'bg-blue-500/20' : 'bg-blue-500/10'
                }`}>
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Website Check</h3>
                <p className="text-blue-200 text-sm">Analyze website accessibility</p>
              </div>
            </div>
            
            <div 
              className={`card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                activeTab === 'port-scan' ? 'ring-2 ring-purple-400/50 glow' : ''
              }`}
              onClick={() => handleTabClick('port-scan')}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  activeTab === 'port-scan' ? 'bg-purple-500/20' : 'bg-purple-500/10'
                }`}>
                  <Server className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Port Scanner</h3>
                <p className="text-purple-200 text-sm">Scan open ports</p>
              </div>
            </div>
            
            <div 
              className={`card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                activeTab === 'banner-grab' ? 'ring-2 ring-green-400/50 glow' : ''
              }`}
              onClick={() => handleTabClick('banner-grab')}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  activeTab === 'banner-grab' ? 'bg-green-500/20' : 'bg-green-500/10'
                }`}>
                  <Settings className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Banner Grab</h3>
                <p className="text-green-200 text-sm">Extract service banners</p>
              </div>
            </div>
            {/* About Us Card */}
            <div 
              className={`card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                activeTab === 'about' ? 'ring-2 ring-orange-400/50 glow' : ''
              }`}
              onClick={() => handleTabClick('about')}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  activeTab === 'about' ? 'bg-orange-500/20' : 'bg-orange-500/10'
                }`}>
                  <Activity className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">About Us</h3>
                <p className="text-orange-200 text-sm">Project & Team Info</p>
              </div>
            </div>
            {/* Contact Card */}
            <div 
              className={`card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                activeTab === 'contact' ? 'ring-2 ring-pink-400/50 glow' : ''
              }`}
              onClick={() => handleTabClick('contact')}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  activeTab === 'contact' ? 'bg-pink-500/20' : 'bg-pink-500/10'
                }`}>
                  <Server className="h-8 w-8 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Contact</h3>
                <p className="text-pink-200 text-sm">Get in touch</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with Glassmorphism */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 backdrop-blur-md">
          {children}
        </div>
      </main>

      {/* Footer with 3D Effects */}
      <footer className="relative z-10 mt-16">
        <div className="glass border-t border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center space-x-8 mb-6">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-blue-400" />
                  <span className="text-white text-sm">Advanced Scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-purple-400" />
                  <span className="text-white text-sm">Network Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-green-400" />
                  <span className="text-white text-sm">Real-time Results</span>
                </div>
              </div>
              
              <div className="text-white/70 text-sm space-y-2">
                <p>
                  Vulnerability Scanner API - For educational and authorized testing purposes only.
                </p>
                <p>
                  Use responsibly and only on systems you own or have explicit permission to test.
                </p>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/50 text-xs">
                  Developed by{' '}
                  <a 
                    href="https://github.com/p4fix" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    @p4fix
                  </a>
                  {' '}on GitHub
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 