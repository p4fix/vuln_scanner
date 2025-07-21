import React, { useEffect, useState } from 'react';
import { Shield, Globe, Server, Settings, Activity, Zap, Cpu, Network, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
      <header className="relative z-20">
        <div className="glass border-b border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Shield className="h-8 w-8 md:h-12 md:w-12 text-blue-400 float" />
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-10 blur-xl"></div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white font-serif tracking-wide">
                    Vuln Scanner
                  </h1>
                  <p className="text-blue-200 text-xs md:text-sm hidden sm:block">Advanced Security Analysis Tool</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-6">
                {/* Status Indicator - Hide on mobile */}
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse"></div>
                  <span className="text-white text-sm">API Online</span>
                </div>
                
                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="btn-3d px-2 py-1 md:px-4 md:py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '🌙' : '☀️'}
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden btn-3d p-2 rounded-lg"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-0 z-10 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
        <div className="absolute right-0 h-full w-64 glass backdrop-blur-lg p-6 space-y-4">
          <Link to="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10" onClick={toggleMobileMenu}>
            <Shield className="h-6 w-6 text-indigo-400" />
            <span>Home</span>
          </Link>
          <Link to="/website-check" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10" onClick={toggleMobileMenu}>
            <Globe className="h-6 w-6 text-blue-400" />
            <span>Website Check</span>
          </Link>
          <Link to="/port-scan" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10" onClick={toggleMobileMenu}>
            <Server className="h-6 w-6 text-purple-400" />
            <span>Port Scanner</span>
          </Link>
          <Link to="/banner-grab" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10" onClick={toggleMobileMenu}>
            <Settings className="h-6 w-6 text-green-400" />
            <span>Banner Grab</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10" onClick={toggleMobileMenu}>
            <Activity className="h-6 w-6 text-orange-400" />
            <span>About Us</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10" onClick={toggleMobileMenu}>
            <Server className="h-6 w-6 text-pink-400" />
            <span>Contact</span>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="relative z-10 py-4 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-6 gap-6">
            <Link to="/" className="card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 rounded-full bg-indigo-500/10">
                  <Shield className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Home</h3>
                <p className="text-indigo-200 text-sm">Welcome & Overview</p>
              </div>
            </Link>
            <Link to="/website-check" className="card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Website Check</h3>
                <p className="text-blue-200 text-sm">Analyze website accessibility</p>
              </div>
            </Link>
            <Link to="/port-scan" className="card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <Server className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Port Scanner</h3>
                <p className="text-purple-200 text-sm">Scan open ports</p>
              </div>
            </Link>
            <Link to="/banner-grab" className="card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Settings className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Banner Grab</h3>
                <p className="text-green-200 text-sm">Extract service banners</p>
              </div>
            </Link>
            <Link to="/about" className="card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 rounded-full bg-orange-500/10">
                  <Activity className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">About Us</h3>
                <p className="text-orange-200 text-sm">Project & Team Info</p>
              </div>
            </Link>
            <Link to="/contact" className="card-3d rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 rounded-full bg-pink-500/10">
                  <Server className="h-8 w-8 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Contact</h3>
                <p className="text-pink-200 text-sm">Get in touch</p>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content with Glassmorphism */}
      <main className="relative z-10 max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-4 md:p-8 backdrop-blur-md">
          {children}
        </div>
      </main>

      {/* Footer with 3D Effects */}
      <footer className="relative z-10 mt-8 md:mt-16">
        <div className="glass border-t border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto py-4 md:py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                  <span className="text-white text-xs md:text-sm">Advanced Scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Network className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                  <span className="text-white text-xs md:text-sm">Network Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                  <span className="text-white text-xs md:text-sm">Real-time Results</span>
                </div>
              </div>
              
              <div className="text-white/70 text-xs md:text-sm space-y-2">
                <p>Vulnerability Scanner API - For educational and authorized testing purposes only.</p>
                <p>Use responsibly and only on systems you own or have explicit permission to test.</p>
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