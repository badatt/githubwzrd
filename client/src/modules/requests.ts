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

async function get(url: string, body?: any) {
  return init().get(url, body);
}

async function post(url: string, body?: any) {
  return init().post(url, body);
}

async function put(url: string, body?: any) {
  return init().put(url, body);
}

async function patch(url: string, body?: any) {
  return init().patch(url, body);
}

async function del(url: string, body?: any) {
  return init().delete(url, body);
}

export default {
  get,
  post,
  put,
  patch,
  del,
};

export interface IApi {
  get: (url: string, body?: any) => Promise<AxiosResponse<any>>;
  post: (url: string, body?: any) => Promise<AxiosResponse<any>>;
  put: (url: string, body?: any) => Promise<AxiosResponse<any>>;
  patch: (url: string, body?: any) => Promise<AxiosResponse<any>>;
  del: (url: string, body?: any) => Promise<AxiosResponse<any>>;
}
