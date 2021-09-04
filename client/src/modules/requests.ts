import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchJwt } from 'modules/auth';

const init = (): AxiosInstance => {
  const options: AxiosRequestConfig = {
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
      authorization: `Bearer ${fetchJwt()}`,
    },
  };
  const instance = axios.create(options);

  instance.interceptors.response.use(undefined, error => {
    let statusCode;
    let errorData;
    let message;
    if (error.response) {
      // Extracting the status code from the response and passing it in Promise rejection error.
      // This will enable to manipulate the functionalities based on status code.
      statusCode = error.response.status;
      message = error.response.data.errors[0].message; // eslint-disable-line prefer-destructuring
      errorData = { message, statusCode };
    } else if (error.request) {
      message = 'There is a problem with the server.';
      errorData = { message };
    } else {
      message = error;
      errorData = { message };
    }
    return Promise.reject(errorData);
  });

  return instance;
};

async function get(url: string, config?: AxiosRequestConfig) {
  return init().get(url, config);
}

async function post(url: string, config?: AxiosRequestConfig) {
  return init().post(url, config);
}

async function put(url: string, config?: AxiosRequestConfig) {
  return init().put(url, config);
}

async function patch(url: string, config?: AxiosRequestConfig) {
  return init().patch(url, config);
}

async function del(url: string, config?: AxiosRequestConfig) {
  return init().delete(url, config);
}

export default {
  get,
  post,
  put,
  patch,
  del,
};

export interface IApi {
  get: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  post: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  put: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  patch: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  del: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
}
