import { ApiError } from "../../utils/api-error.ts"
import { config } from "dotenv";
config()

const USERNAME = process.env.WOO_CONSUMER_KEY;
const PASSWORD = process.env.WOO_CONSUMER_SECRET;

const encodedCredentials = btoa(`${USERNAME}:${PASSWORD}`)

class ApiClinet {
  private baseURL: string;
  private basicHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.basicHeaders = {
      'Authorization': `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: { ...this.basicHeaders, ...options.headers },
      ...options
    }

      const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => { })

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

export const apiClient = new ApiClinet(process.env.WOO_API_URL);

