import type {
  SearchParams,
  SearchResponse,
  Hotel,
  City,
  Country,
} from "@/types";
import { API_CONFIG } from "@/config/api";
import { ApiError } from "@/errors";

interface ApiResponse<T> {
  message: string;
  data: T;
}

const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries = API_CONFIG.retries,
): Promise<Response> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (
      retries > 0 &&
      !(error instanceof DOMException && error.name === "AbortError")
    ) {
      await new Promise((resolve) =>
        setTimeout(resolve, API_CONFIG.retryDelay),
      );
      return fetchWithRetry(url, options, retries - 1);
    }
    throw new ApiError(0, "NETWORK_ERROR", error);
  }
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => response.text());
    throw new ApiError(response.status, response.statusText, errorData);
  }

  const apiResponse = (await response.json()) as ApiResponse<T>;
  return apiResponse.data;
};

export const searchApi = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    const searchParams = new URLSearchParams({
      query: params.query,
      ...(params.page && { page: params.page.toString() }),
      ...(params.pageSize && { pageSize: params.pageSize.toString() }),
    });

    const response = await fetchWithRetry(
      `${API_CONFIG.baseUrl}/search?${searchParams}`,
      { signal: params.signal },
    );

    const rawData = await handleResponse<{
      hotels: Hotel[];
      cities: City[];
      countries: Country[];
    }>(response);

    return {
      query: params.query,
      hotels: rawData?.hotels || [],
      cities: rawData?.cities || [],
      countries: rawData?.countries || [],
    };
  },

  getHotel: async (id: string): Promise<Hotel> => {
    const response = await fetchWithRetry(`${API_CONFIG.baseUrl}/hotels/${id}`);
    return handleResponse<Hotel>(response);
  },

  getCity: async (id: string): Promise<City> => {
    const response = await fetchWithRetry(`${API_CONFIG.baseUrl}/cities/${id}`);
    return handleResponse<City>(response);
  },

  getCountry: async (id: string): Promise<Country> => {
    const response = await fetchWithRetry(
      `${API_CONFIG.baseUrl}/countries/${id}`,
    );
    return handleResponse<Country>(response);
  },
};

interface RequestOptions {
  query?: Record<string, string>;
  signal?: AbortSignal;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3001/api") {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        await response.json().catch(() => null),
      );
    }

    return response.json();
  }

  async get<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { query, signal } = options;
    const url = new URL(path, this.baseUrl);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });

      return this.handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, "NETWORK_ERROR", null);
    }
  }

  async post<T>(
    path: string,
    data: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    const { signal } = options;
    const url = new URL(path, this.baseUrl);

    try {
      const response = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal,
      });

      return this.handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, "NETWORK_ERROR", null);
    }
  }
}

export const client = new ApiClient();
