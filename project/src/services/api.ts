import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

enum HttpCode {
  Unauthorized = 401,
}

type UnauthorizedCallback = () => void;

const createAPI = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });


  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};


export default createAPI;
