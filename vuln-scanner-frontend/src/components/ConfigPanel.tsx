import React, { useState } from 'react';
import { Settings, Save, Eye, EyeOff } from 'lucide-react';
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Settings className="h-6 w-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">API Configuration</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          {isOpen ? 'Hide' : 'Configure'}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-4">
          <div>
            <label htmlFor="baseURL" className="block text-sm font-medium text-gray-700 mb-2">
              API Base URL
            </label>
            <input
              type="url"
              id="baseURL"
              value={config.baseURL}
              onChange={(e) => handleInputChange('baseURL', e.target.value)}
              placeholder="http://localhost:5000"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              The base URL of your vulnerability scanner API
            </p>
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                id="apiKey"
                value={config.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                placeholder="your-secret-api-key-here"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Your API key for authentication
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="text-sm text-gray-600">
          <p>API Base URL: <span className="font-mono">{config.baseURL}</span></p>
          <p>API Key: <span className="font-mono">••••••••••••••••</span></p>
        </div>
      )}
    </div>
  );
};

export default ConfigPanel; 