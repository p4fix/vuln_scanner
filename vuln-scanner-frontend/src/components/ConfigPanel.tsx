import React, { useState } from 'react';
import { Settings, Save, Eye, EyeOff, Zap, Key, Globe } from 'lucide-react';
import { ApiConfig } from '../types';
import ApiService from '../services/api';

interface ConfigPanelProps {
  apiService: ApiService;
  onConfigUpdate: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ apiService, onConfigUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [config, setConfig] = useState<ApiConfig>(apiService.getConfig());
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    try {
      apiService.updateConfig(config);
      onConfigUpdate();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update configuration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof ApiConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="card-3d rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Settings className="h-8 w-8 text-blue-400 float" />
            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">API Configuration</h2>
            <p className="text-blue-200 text-sm">Configure your vulnerability scanner API settings</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-3d px-4 py-2 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300"
        >
          {isOpen ? 'Hide Config' : 'Configure API'}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-6">
          <div className="card-3d rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="baseURL" className="block text-lg font-semibold text-white mb-3">
                  API Base URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type="url"
                    id="baseURL"
                    value={config.baseURL}
                    onChange={(e) => handleInputChange('baseURL', e.target.value)}
                    placeholder="http://localhost:5000"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <p className="mt-2 text-blue-200 text-sm">
                  The base URL of your vulnerability scanner API server
                </p>
              </div>

              <div>
                <label htmlFor="apiKey" className="block text-lg font-semibold text-white mb-3">
                  API Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    id="apiKey"
                    value={config.apiKey}
                    onChange={(e) => handleInputChange('apiKey', e.target.value)}
                    placeholder="your-secret-api-key-here"
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {showApiKey ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-blue-200 text-sm">
                  Your API key for authentication and security
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsOpen(false)}
              className="btn-3d px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-3d px-6 py-3 rounded-lg text-white font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
            >
              {isSaving ? (
                <>
                  <div className="spinner"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="card-3d rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Current Configuration</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-blue-200 text-sm">API Base URL:</p>
                <p className="text-white font-mono text-sm bg-white/10 rounded px-3 py-2">{config.baseURL}</p>
              </div>
              <div className="space-y-2">
                <p className="text-blue-200 text-sm">API Key:</p>
                <p className="text-white font-mono text-sm bg-white/10 rounded px-3 py-2">••••••••••••••••</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigPanel; 