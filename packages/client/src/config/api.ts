/**
 * API Configuration interface defining the shape of the configuration object
 */
interface ApiConfig {
  /** Base URL for the API endpoints */
  baseUrl: string;
  /** Timeout in milliseconds for API requests */
  timeout: number;
  /** Number of retry attempts for failed requests */
  retries: number;
  /** Delay in milliseconds between retry attempts */
  retryDelay: number;
}

/**
 * API configuration object with environment variable fallbacks
 */
export const API_CONFIG: ApiConfig = {
  baseUrl:
    import.meta.env.ACCOMMODATION_API_BASE_URL || "http://localhost:3001/api",
  timeout: Number(import.meta.env.ACCOMMODATION_API_TIMEOUT) || 5000,
  retries: Number(import.meta.env.ACCOMMODATION_API_RETRIES) || 1,
  retryDelay: Number(import.meta.env.ACCOMMODATION_API_RETRY_DELAY) || 2000,
};
