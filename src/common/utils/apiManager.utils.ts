import axios, { ResponseType } from "axios";
import { getAuthorizationToken } from "./authorization.utils";

interface IRequestConfig {
  params?: any;
  data?: any;
  responseType?: ResponseType;
}

export const apiManager = {
  async get<T = any>(url: string, config: IRequestConfig = {}) {
    const { params, responseType } = config;
    const headers = getHeaders();
    return axios.get<T>(url, { params, headers, responseType });
  },

  async patch<T = any>(url: string, config: IRequestConfig = {}) {
    const { params, data, responseType } = config;
    const headers = getHeaders();
    return axios.patch<T>(url, data, { params, headers, responseType });
  },

  async post<T = any>(url: string, config: IRequestConfig = {}) {
    const { params, data, responseType } = config;
    const headers = getHeaders();
    return axios.post<T>(url, data, { params, headers, responseType });
  },

  async put<T = any>(url: string, config: IRequestConfig = {}) {
    const { params, data, responseType } = config;
    const headers = getHeaders();
    return axios.put<T>(url, data, { params, headers, responseType });
  },

  async delete<T = any>(url: string, config: IRequestConfig = {}) {
    const { params, responseType } = config;
    const headers = getHeaders();
    return axios.delete<T>(url, { params, headers, responseType });
  },
};

function getHeaders() {
  const token = getAuthorizationToken();
  const headers = {
    Authorization: token,
  };
  return headers;
}
