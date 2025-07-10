import React, { useState } from 'react';
import { Globe, AlertCircle, CheckCircle, XCircle, Loader, Search, Zap } from 'lucide-react';
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
    if (error) return <XCircle className="h-6 w-6 text-red-400" />;
    if (statusCode === 200) return <CheckCircle className="h-6 w-6 text-green-400" />;
    if (statusCode) return <AlertCircle className="h-6 w-6 text-yellow-400" />;
    return <XCircle className="h-6 w-6 text-red-400" />;
  };

  const getStatusColor = (statusCode: number | null, error: string | null) => {
    if (error) return 'text-red-400';
    if (statusCode === 200) return 'text-green-400';
    if (statusCode) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusGlow = (statusCode: number | null, error: string | null) => {
    if (error) return 'glow-danger';
    if (statusCode === 200) return 'glow-success';
    if (statusCode) return 'glow-warning';
    return 'glow-danger';
  };

  return (
    <div className="space-y-6">
      {/* Header with 3D Effects */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Globe className="h-16 w-16 text-blue-400 float" />
            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Website Accessibility Check</h2>
          <p className="text-blue-200 mt-2">Analyze website accessibility and response status</p>
        </div>
      </div>

      {/* Form with 3D Effects */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-3d rounded-xl p-6">
          <div className="space-y-4">
            <label htmlFor="url" className="block text-lg font-semibold text-white">
              Website URL
            </label>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="btn-3d px-6 py-3 rounded-lg text-white font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    <span>Check Website</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-blue-200 text-sm">
              Enter a valid URL to check if the website is accessible and analyze its response
            </p>
          </div>
        </div>
      </form>

      {/* Error Display with 3D Effects */}
      {error && (
        <div className="card-3d rounded-xl p-6 border border-red-500/20 glow-danger">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Error</h3>
              <p className="text-blue-200 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results with 3D Effects */}
      {result && (
        <div className="card-3d rounded-xl p-6 glow">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Scan Results</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL Section */}
              <div className="card-3d rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <h4 className="text-lg font-semibold text-white">Target URL</h4>
                </div>
                <p className="text-blue-200 break-all">{result.url}</p>
              </div>

              {/* Status Section */}
              <div className="card-3d rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(result.status_code, result.error)}
                  <h4 className="text-lg font-semibold text-white">Status</h4>
                </div>
                <div className={`text-lg font-medium ${getStatusColor(result.status_code, result.error)} ${getStatusGlow(result.status_code, result.error)}`}>
                  {result.message}
                </div>
              </div>

              {/* HTTP Status Code */}
              {result.status_code && (
                <div className="card-3d rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold">{result.status_code}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white">HTTP Status</h4>
                  </div>
                  <p className="text-blue-200">Response Code: {result.status_code}</p>
                </div>
              )}

              {/* Error Details */}
              {result.error && (
                <div className="card-3d rounded-lg p-4 border border-red-500/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <h4 className="text-lg font-semibold text-white">Error Details</h4>
                  </div>
                  <p className="text-red-300">{result.error}</p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-blue-200">
                {result.error 
                  ? "Website check completed with errors" 
                  : "Website check completed successfully"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteCheck; 