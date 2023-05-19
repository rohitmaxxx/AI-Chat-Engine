/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable  no-console */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiUrls } from './ApiConstants';

const TAG = 'NetworkOps: ';
const unAuthRoutes: string[] = [ApiUrls.todos];

const API_TIMEOUT = 10000;

const instance = axios.create({
  timeout: API_TIMEOUT,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const configUrl = config.url ?? '';
    try {
      const isTokenRequired = !unAuthRoutes.includes(configUrl);
      if (isTokenRequired) {
        const token = '';
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn(TAG, 'Error in interceptor request');
      console.error(e);
    }
    return config;
  },
  (error) => {
    console.warn(TAG, 'Error in interceptor request');
    console.error(error);
    return Promise.reject(error);
  },
);

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  },
);

export const makeGetRequest = <T>(URL: string) => instance.get<T>(URL);
export const makePostRequest = <T>(URL: string, data = {}) => instance.post<T>(URL, { ...data });
export const makePutRequest = <T>(URL: string, data = {}) => instance.put<T>(URL, { ...data });
export const makePatchRequest = <T>(URL: string, data = {}) => instance.patch<T>(URL, { ...data });
export const makeDeleteRequest = <T>(URL: string) => instance.delete<T>(URL);
