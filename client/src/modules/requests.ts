import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchJwt } from 'modules/auth';
import { IError } from 'types';

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
    const reason: IError = {};
    if (error.response) {
      reason.code = error.response.status;
      reason.detail = error.response.data;
      reason.message = error.response.data && error.response.data.message;
    } else {
      reason.message = 'Unknown error';
      reason.detail = error;
    }
    return Promise.reject(reason);
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
