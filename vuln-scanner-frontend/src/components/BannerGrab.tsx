import React, { useState } from 'react';
import { Settings, AlertCircle, CheckCircle, XCircle, Loader, Copy, Zap, Network, Server } from 'lucide-react';
import { BannerGrabResult } from '../types';
import ApiService from '../services/api';

interface BannerGrabProps {
  apiService: ApiService;
}

const BannerGrab: React.FC<BannerGrabProps> = ({ apiService }) => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BannerGrabResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim()) {
      setError('Please enter a hostname');
      return;
    }
    if (!port.trim()) {
      setError('Please enter a port number');
      return;
    }

    const portNum = parseInt(port);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      setError('Port must be a number between 1 and 65535');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiService.bannerGrab(host.trim(), portNum);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Banner copied to clipboard');
    });
  };

  const getStatusIcon = (banner: string | null, error: string | null) => {
    if (error) return <XCircle className="h-6 w-6 text-red-400" />;
    if (banner) return <CheckCircle className="h-6 w-6 text-green-400" />;
    return <AlertCircle className="h-6 w-6 text-yellow-400" />;
  };

  const getStatusColor = (banner: string | null, error: string | null) => {
    if (error) return 'text-red-400';
    if (banner) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getStatusGlow = (banner: string | null, error: string | null) => {
    if (error) return 'glow-danger';
    if (banner) return 'glow-success';
    return 'glow-warning';
  };

  const getStatusText = (banner: string | null, error: string | null) => {
    if (error) return 'Failed';
    if (banner) return 'Success';
    return 'No Response';
  };

  return (
    <div className="space-y-6">
      {/* Header with 3D Effects */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Settings className="h-16 w-16 text-green-400 float" />
            <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Banner Grabber</h2>
          <p className="text-green-200 mt-2">Extract service banners and version information</p>
        </div>
      </div>

      {/* Form with 3D Effects */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-3d rounded-xl p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label htmlFor="host" className="block text-lg font-semibold text-white">
                  Hostname
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Network className="h-5 w-5 text-green-300" />
                  </div>
                  <input
                    type="text"
                    id="host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="port" className="block text-lg font-semibold text-white">
                  Port Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Server className="h-5 w-5 text-green-300" />
                  </div>
                  <input
                    type="number"
                    id="port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    placeholder="80"
                    min="1"
                    max="65535"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading || !host.trim() || !port.trim()}
                className="btn-3d px-8 py-3 rounded-lg text-white font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Grabbing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    <span>Grab Banner</span>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-green-200 text-sm text-center">
              Attempt to retrieve banner information and service details from an open port
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
              <p className="text-green-200 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results with 3D Effects */}
      {result && (
        <div className="card-3d rounded-xl p-6 glow">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Banner Grab Results</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Host Section */}
              <div className="card-3d rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Network className="h-5 w-5 text-green-400" />
                  <h4 className="text-lg font-semibold text-white">Target Host</h4>
                </div>
                <p className="text-green-200 break-all">{result.host}</p>
              </div>

              {/* Port Section */}
              <div className="card-3d rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Server className="h-5 w-5 text-green-400" />
                  <h4 className="text-lg font-semibold text-white">Port Number</h4>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 font-bold text-lg">{result.port}</span>
                </div>
              </div>

              {/* Status Section */}
              <div className="card-3d rounded-lg p-4 md:col-span-2">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(result.banner, result.error)}
                  <h4 className="text-lg font-semibold text-white">Grab Status</h4>
                </div>
                <div className={`text-xl font-bold ${getStatusColor(result.banner, result.error)} ${getStatusGlow(result.banner, result.error)}`}>
                  {getStatusText(result.banner, result.error)}
                </div>
                <p className="text-green-200 mt-2">
                  {result.error 
                    ? 'Failed to retrieve banner information'
                    : result.banner
                    ? 'Successfully retrieved banner information'
                    : 'No banner information available'
                  }
                </p>
              </div>

              {/* Error Details */}
              {result.error && (
                <div className="card-3d rounded-lg p-4 border border-red-500/20 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <h4 className="text-lg font-semibold text-white">Error Details</h4>
                  </div>
                  <p className="text-red-300">{result.error}</p>
                </div>
              )}

              {/* Banner Information */}
              {result.banner && (
                <div className="card-3d rounded-lg p-4 md:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Banner Information</h4>
                    <button
                      onClick={() => copyToClipboard(result.banner!)}
                      className="btn-3d px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 hover:scale-105 transition-all duration-300"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 backdrop-blur-sm">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">{result.banner}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-green-200">
                {result.error 
                  ? "Banner grab completed with errors" 
                  : result.banner
                  ? "Banner grab completed successfully"
                  : "Banner grab completed - no banner information found"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerGrab; 