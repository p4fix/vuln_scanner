import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import WebsiteCheck from './components/WebsiteCheck';
import PortScan from './components/PortScan';
import BannerGrab from './components/BannerGrab';
import ConfigPanel from './components/ConfigPanel';
import ApiService from './services/api';

const App: React.FC = () => {
  const [apiService] = useState(() => new ApiService({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    apiKey: process.env.REACT_APP_API_KEY || 'your-secret-api-key-here'
  }));

  const [activeTab, setActiveTab] = useState('home');
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      await apiService.getHealth();
      setApiStatus('online');
    } catch (error) {
      setApiStatus('offline');
    }
  };

  const handleConfigUpdate = () => {
    checkApiStatus();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'website-check':
        return <WebsiteCheck apiService={apiService} />;
      case 'port-scan':
        return <PortScan apiService={apiService} />;
      case 'banner-grab':
        return <BannerGrab apiService={apiService} />;
      default:
        return <WebsiteCheck apiService={apiService} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange}>
      <div className="space-y-8">
        {/* API Status Banner with 3D Effects */}
        {apiStatus === 'offline' && (
          <div className="card-3d rounded-xl p-6 border border-red-500/20 glow-danger">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  API Server Offline
                </h3>
                <div className="mt-2 text-blue-200">
                  <p>
                    The vulnerability scanner API server appears to be offline. 
                    Please check your configuration and ensure the API server is running.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Panel with 3D Effects */}
        <div className="card-3d rounded-xl p-6">
          <ConfigPanel apiService={apiService} onConfigUpdate={handleConfigUpdate} />
        </div>

        {/* Content Area with 3D Effects */}
        <div className="card-3d rounded-xl p-6">
          {renderContent()}
        </div>

        {/* Security Notice with 3D Effects */}
        <div className="card-3d rounded-xl p-6 border border-yellow-500/20 glow-warning">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                Security Notice
              </h3>
              <div className="mt-2 text-blue-200">
                <p>
                  This tool is designed for educational and authorized security testing purposes only. 
                  Always ensure you have explicit permission before scanning any systems you do not own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App; 