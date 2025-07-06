import React, { useState } from 'react';
import { Server, AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';
import { PortCheckResult } from '../types';
import ApiService from '../services/api';

interface PortScanProps {
  apiService: ApiService;
}

const PortScan: React.FC<PortScanProps> = ({ apiService }) => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PortCheckResult | null>(null);
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
      const response = await apiService.checkPort(host.trim(), portNum);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'closed':
        return <XCircle className="h-5 w-5 text-danger-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'text-success-600';
      case 'closed':
        return 'text-danger-600';
      case 'error':
        return 'text-warning-600';
      default:
        return 'text-warning-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Server className="h-6 w-6 text-primary-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Port Scanner</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-2">
              Hostname
            </label>
            <input
              type="text"
              id="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="example.com"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-2">
              Port Number
            </label>
            <input
              type="number"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="80"
              min="1"
              max="65535"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !host.trim() || !port.trim()}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Server className="h-4 w-4 mr-2" />
          )}
          Scan Port
        </button>
        
        <p className="mt-1 text-sm text-gray-500">
          Enter a hostname and port number to check if the port is open
        </p>
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
              <span className="text-sm font-medium text-gray-700">Host:</span>
              <span className="text-sm text-gray-900">{result.host}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Port:</span>
              <span className="text-sm text-gray-900">{result.port}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex items-center">
                {getStatusIcon(result.status)}
                <span className={`ml-2 text-sm font-medium ${getStatusColor(result.status)}`}>
                  {result.status}
                </span>
              </div>
            </div>
            
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

export default PortScan; 