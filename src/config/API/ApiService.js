import axios from 'axios';
import cookie from 'js-cookie';
import { trackPromise } from 'react-promise-tracker';

// urls
export const BASE_URL = 'https://imdb-api.com/en/API/';

export const errorResponse = {};

export const METHOD = {
  GET: 'get',
  HEAD: 'HEAD',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
};

const singleton = Symbol();
const singletonEnforcer = Symbol();

const defaultOptions = {
  baseURL: BASE_URL,
  method: METHOD.GET,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
};

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }
    const defaultOptions = {
      baseURL: BASE_URL,
      method: METHOD.GET,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.session = axios.create(defaultOptions);

    this.session.interceptors.request.use((config) => {
      const getToken = cookie.get('sessionid');
      config.headers['Authorization'] = getToken;
      config.params = Object.assign({}, config.params || {});

      return config;
    });

    this.session.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        errorResponse.error = error.response;
        errorResponse.networkError = JSON.parse(JSON.stringify(error));
        return Promise.reject(error?.response?.data);
      }
    );
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }

    return this[singleton];
  }

  /*eslint-disable */
  get = (url, options = {}) => trackPromise(this.session.get(url, { ...defaultOptions, ...options }));
  getWithoutLoading = (url, options = {}) => this.session.get(url, { ...defaultOptions, ...options });
  post = (url, data, options = {}) => trackPromise(this.session.post(url, data, { ...defaultOptions, ...options }));
  postWithoutLoading = (url, data, options = {}) => this.session.post(url, data, { ...defaultOptions, ...options });
  put = (url, data, options = {}) => trackPromise(this.session.put(url, data, { ...defaultOptions, ...options }));
  putWithoutLoading = (url, data, options = {}) => this.session.put(url, data, { ...defaultOptions, ...options });
  patch = (url, data, options = {}) => trackPromise(this.session.patch(url, data, { ...defaultOptions, ...options }));
  delete = (url, options = {}) => trackPromise(this.session.delete(url, { ...defaultOptions, ...options }));
  remove = (...params) => this.session.delete(...params);
}

export default ApiService.instance;
