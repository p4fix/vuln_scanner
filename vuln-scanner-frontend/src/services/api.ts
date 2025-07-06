import axios, { AxiosInstance } from 'axios';
import { WebsiteCheckResult, PortCheckResult, BannerGrabResult, ApiConfig } from '../types';

class ApiService {
  private api: AxiosInstance;
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
    this.api = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': config.apiKey,
      },
      timeout: 30000, // 30 seconds
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (error.response?.status === 400) {
          throw new Error(error.response.data?.error || 'Invalid request data.');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please try again.');
        } else if (error.code === 'ERR_NETWORK') {
          throw new Error('Network error. Please check your connection and API server.');
        } else {
          throw new Error(error.response?.data?.error || 'An unexpected error occurred.');
        }
      }
    );
  }

  async checkWebsite(url: string): Promise<WebsiteCheckResult> {
    try {
      const response = await this.api.post('/check_website', { url });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async checkPort(host: string, port: number): Promise<PortCheckResult> {
    try {
      const response = await this.api.post('/check_port', { host, port });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async bannerGrab(host: string, port: number): Promise<BannerGrabResult> {
    try {
      const response = await this.api.post('/banner_grab', { host, port });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  updateConfig(newConfig: Partial<ApiConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.api.defaults.headers['X-API-Key'] = this.config.apiKey;
    if (newConfig.baseURL) {
      this.api.defaults.baseURL = newConfig.baseURL;
    }
  }

  getConfig(): ApiConfig {
    return { ...this.config };
  }
}

export default ApiService; 