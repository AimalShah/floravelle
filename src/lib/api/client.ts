import { ApiError } from "../../utils/api-error.ts"
import { loadEnv } from "../../utils/env.ts"

class ApiClinet {
  private baseURL: string = '';
  private basicHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  private initialized = false;

  private initialize() {
    if (this.initialized) return;
    
    const env = loadEnv();
    const USERNAME = env.WOO_CONSUMER_KEY;
    const PASSWORD = env.WOO_CONSUMER_SECRET;
    
    if (USERNAME && PASSWORD) {
      const credentials = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
      this.basicHeaders = {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      };
    }
    
    const rawUrl = (env.WOO_API_URL || '').trim();
    if (rawUrl) {
      try {
        const parsed = new URL(rawUrl);
        this.baseURL = parsed.toString().replace(/\/+$/, '');
      } catch {
        this.baseURL = rawUrl.replace(/\/+$/, '');
      }
    } else {
      this.baseURL = '';
    }
    this.initialized = true;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    this.initialize();
    
    if (!this.baseURL) {
      throw new ApiError('WOO_API_URL not configured', 500, {}, new Response(null, { status: 500 }));
    }
    
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: { ...this.basicHeaders, ...options.headers },
      ...options
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: await response.text() };
      }

      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData,
        response
      )
    }
    return response.json();
  }


  async get<T>(endpoint: string): Promise<T> {
    return this.request(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

}

export const apiClient = new ApiClinet();

