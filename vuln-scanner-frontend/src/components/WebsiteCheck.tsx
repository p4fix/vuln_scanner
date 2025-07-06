import React, { useState } from 'react';
import { Globe, AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';
import { WebsiteCheckResult } from '../types';
import ApiService from '../services/api';

interface WebsiteCheckProps {
  apiService: ApiService;
}

const WebsiteCheck: React.FC<WebsiteCheckProps> = ({ apiService }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<WebsiteCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiService.checkWebsite(url.trim());
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (statusCode: number | null, error: string | null) => {
    if (error) return <XCircle className="h-5 w-5 text-danger-500" />;
    if (statusCode === 200) return <CheckCircle className="h-5 w-5 text-success-500" />;
    if (statusCode) return <AlertCircle className="h-5 w-5 text-warning-500" />;
    return <XCircle className="h-5 w-5 text-danger-500" />;
  };

  const getStatusColor = (statusCode: number | null, error: string | null) => {
    if (error) return 'text-danger-600';
    if (statusCode === 200) return 'text-success-600';
    if (statusCode) return 'text-warning-600';
    return 'text-danger-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Globe className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Website Accessibility Check</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <div className="flex">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Globe className="h-4 w-4 mr-2" />
              )}
              Check
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Enter a valid URL to check if the website is accessible
          </p>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-md">
          <div className="flex">
            <XCircle className="h-5 w-5 text-danger-400 mr-2" />
            <p className="text-sm text-danger-700">{error}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Scan Results</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">URL:</span>
              <span className="text-sm text-gray-900">{result.url}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex items-center">
                {getStatusIcon(result.status_code, result.error)}
                <span className={`ml-2 text-sm font-medium ${getStatusColor(result.status_code, result.error)}`}>
                  {result.message}
                </span>
              </div>
            </div>
            
            {result.status_code && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">HTTP Status Code:</span>
                <span className="text-sm text-gray-900">{result.status_code}</span>
              </div>
            )}
            
            {result.error && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Error:</span>
                <span className="text-sm text-danger-600">{result.error}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteCheck; 