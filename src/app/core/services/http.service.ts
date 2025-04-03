import axios, { AxiosResponse } from "axios";

import StorageService from "./storage.serive";

interface QueryParams {
  [key: string]: string | string[];
}

class HttpService {
  private apiUrl: string;
  private storageService: StorageService = new StorageService();

  constructor() {
    this.apiUrl = "https://api-dev.oohmetrics.co";
    //this.apiUrl = "http://localhost:3000";
  }

  private getHeaders(): { [key: string]: string } {
    const token = this.storageService.get("local", "token");
    return token ? { "x-access-token": `${token}` } : {};
  }


  async get<T>(path: string, query: QueryParams = {}): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      if (error?.status === 401) {
        this.storageService.remove("local", "token");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
      throw error;
    }
  }

  async getListCount<T>(path: string, query: QueryParams = {}): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      if (error?.status === 401) {
        this.storageService.remove("local", "token");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
      throw error;
    }
  }

  async getAll<T>(path: string, query: QueryParams = {}): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      if (error?.status === 401) {
        this.storageService.remove("local", "token");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
      }
      throw error;
    }
  }
  async delete<T>(path: string, query: QueryParams = {}): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }
      const response: AxiosResponse<T> = await axios.delete(url, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      throw error;
    }
  }
  async create<T>(
    path: string,
    payload: any,
    query: QueryParams = {}
  ): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }
      const response: AxiosResponse<T> = await axios.post(url, payload, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      throw error;
    }
  }

  async update<T>(
    path: string,
    payload: any,
    query: QueryParams = {}
  ): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }
      const response: AxiosResponse<T> = await axios.put(url, payload, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      throw error;
    }
  }

  async patch<T>(
    path: string,
    payload: any,
    query: QueryParams = {}
  ): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }
      const response: AxiosResponse<T> = await axios.patch(url, payload, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      console.error("An error occurred:", error.message);
      throw error;
    }
  }

  private buildQuery(query: QueryParams): string {
    const params = new URLSearchParams();

    Object.keys(query).forEach((key) => {
      const value = query[key];

      if (Array.isArray(value)) {
        value.forEach((element) => {
          params.append(key, element);
        });
      } else {
        params.append(key, value);
      }
    });

    return params.toString();
  }

  async upload<T>(
    path: string,
    file: File,
    query: QueryParams = {}
  ): Promise<T> {
    try {
      let url = `${this.apiUrl}/${path}`;
      const params = this.buildQuery(query);
      if (params) {
        url = `${url}?${params}`;
      }

      const formData = new FormData();

      // Determine field name based on file type
      const fieldName = file.type.startsWith("video/") ? "video" : "file";
      formData.append(fieldName, file);

      const response: AxiosResponse<T> = await axios.post(url, formData, {
        headers: {
          ...this.getHeaders(), // Include existing headers (e.g., Authorization)
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("An error occurred during file upload:", error.message);
      throw error;
    }
  }
}

export default HttpService;
