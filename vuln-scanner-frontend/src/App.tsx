import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import WebsiteCheck from './components/WebsiteCheck';
import PortScan from './components/PortScan';
import BannerGrab from './components/BannerGrab';
import ConfigPanel from './components/ConfigPanel';
import ApiService from './services/api';

const App: React.FC = () => {
  const [apiService] = useState(() => new ApiService({
    baseURL: 'http://localhost:5000',
    apiKey: 'your-secret-api-key-here'
  }));

  const [activeTab, setActiveTab] = useState('website-check');
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
    <Layout>
      <div className="space-y-6">
        {/* API Status Banner */}
        {apiStatus === 'offline' && (
          <div className="bg-danger-50 border border-danger-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-danger-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-danger-800">
                  API Server Offline
                </h3>
                <div className="mt-2 text-sm text-danger-700">
                  <p>
                    The vulnerability scanner API server appears to be offline. 
                    Please check your configuration and ensure the API server is running.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Panel */}
        <ConfigPanel apiService={apiService} onConfigUpdate={handleConfigUpdate} />

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('website-check')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'website-check'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Website Check
              </button>
              <button
                onClick={() => setActiveTab('port-scan')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'port-scan'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Port Scanner
              </button>
              <button
                onClick={() => setActiveTab('banner-grab')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'banner-grab'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Banner Grabber
              </button>
            </nav>
          </div>
          <div className="p-6">
            {renderContent()}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-warning-50 border border-warning-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-warning-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-warning-800">
                Security Notice
              </h3>
              <div className="mt-2 text-sm text-warning-700">
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