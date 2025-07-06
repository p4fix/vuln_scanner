export interface WebsiteCheckResult {
  url: string;
  status_code: number | null;
  message: string;
  error: string | null;
}

export interface PortCheckResult {
  host: string;
  port: number;
  status: string;
  error: string | null;
}

export interface BannerGrabResult {
  host: string;
  port: number;
  banner: string | null;
  error: string | null;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface ScanRequest {
  url?: string;
  host?: string;
  port?: number;
}

export interface ApiConfig {
  baseURL: string;
  apiKey: string;
} 