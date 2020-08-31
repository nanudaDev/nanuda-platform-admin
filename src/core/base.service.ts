import axios, { AxiosResponse } from 'axios';
import Axios from 'axios-observable';
import {
  DevelopmentEnvironment,
  StagingEnvironment,
  ProductionEnvironment,
  EnvironmentType,
  Environment,
} from '../../environments';
import { Pagination, PaginatedResponse } from '../common';
import JwtStorageService from '../services/shared/auth/jwt-storage.service';
import toast from '../../resources/assets/js/services/toast.js';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import Vue from 'vue';

// axios에서 사용할 메소드 타입
type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';
export class BaseService extends Vue {
  self = this;
  private __makeArrayParam(value: any) {
    const s: string[] = [];

    const add = (k: string, v: any) => {
      v = typeof v === 'function' ? v() : v;
      v = v === null ? '' : v === undefined ? '' : v;
      s.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    };

    const buildParams = (prefix: string, obj: any) => {
      if (prefix) {
        if (Array.isArray(obj)) {
          obj.forEach((v, i) =>
            buildParams(
              prefix + '[' + (typeof v === 'object' && v ? i : '') + ']',
              v,
            ),
          );
        } else if (String(obj) === '[object Object]') {
          Object.keys(obj).forEach(key =>
            buildParams(prefix + '[' + key + ']', obj[key]),
          );
        } else {
          add(prefix, obj);
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(v => add(v.name, v.value));
      } else {
        Object.keys(obj).forEach(key => buildParams(key, obj[key]));
      }
      return s;
    };

    const params = buildParams('', value).join('&');

    return { fromString: params };
  }

  // remove empty string values
  private __excludeNullParam(value: any) {
    if (!value) {
      return;
    }
    if (typeof value !== 'object') {
      return value;
    }
    Object.keys(value).map(prop => {
      if (value[prop] === '') {
        delete value[prop];
      }
    });
    return value;
  }

  private __api<T>(
    method: Method,
    path: string,
    params?: any,
  ): AxiosObservable<T> {
    let baseUrl;
    if (process.env.NODE_ENV === EnvironmentType.development) {
      baseUrl = DevelopmentEnvironment.baseURL;
    }
    if (process.env.NODE_ENV === EnvironmentType.staging) {
      baseUrl = StagingEnvironment.baseURL;
    }
    if (process.env.NODE_ENV === EnvironmentType.production) {
      baseUrl = ProductionEnvironment.baseURL;
    }
    // axios observable에서 글로벌 에러 catch하는 코드
    Axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (typeof error.response.data.message === 'object') {
          toast.error(
            error.response.data.message[0].constraints[
              Object.keys(error.response.data.message[0].constraints)[0]
            ],
          );
        }
        if (typeof error.response.data.message === 'string') {
          toast.error(error.response.data.message);
        }
      },
    );
    if (path.indexOf('http') !== 0) {
      path = baseUrl + path;
    }
    const headers: any = {
      'x-client-name': baseUrl.clientName,
      'Content-type': 'application/json',
      //   'Accept': 'application/json',
    };

    const accessToken = JwtStorageService.getToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    if (params) {
      params = this.__excludeNullParam(params);
    }
    if (method === 'get') {
      return Axios.get(path, { params, headers }) as AxiosObservable<T>;
    } else if (method === 'post') {
      return Axios.post(path, params, { headers }) as AxiosObservable<T>;
    } else if (method === 'patch') {
      return Axios.patch(path, params, { headers }) as AxiosObservable<T>;
    } else if (method === 'delete') {
      return Axios.delete(path, { params, headers }) as AxiosObservable<T>;
    }
  }

  public fileGet(path: string, params?: any) {
    let baseUrl;
    if (process.env.NODE_ENV === EnvironmentType.development) {
      baseUrl = DevelopmentEnvironment.baseURL;
    }
    if (process.env.NODE_ENV === EnvironmentType.staging) {
      baseUrl = StagingEnvironment.baseURL;
    }
    if (process.env.NODE_ENV === EnvironmentType.production) {
      baseUrl = ProductionEnvironment.baseURL;
    }
    if (path.indexOf('http') !== 0) {
      path = baseUrl + path;
    }
    return axios.get(path, params);
  }

  public filePost(path: string, params?: any) {
    let baseUrl;
    if (process.env.NODE_ENV === EnvironmentType.development) {
      baseUrl = DevelopmentEnvironment.baseURL;
    }
    if (process.env.NODE_ENV === EnvironmentType.staging) {
      baseUrl = StagingEnvironment.baseURL;
    }
    if (process.env.NODE_ENV === EnvironmentType.production) {
      baseUrl = ProductionEnvironment.baseURL;
    }
    if (path.indexOf('http') !== 0) {
      path = baseUrl + path;
    }
    return axios.post(path, params);
  }

  public put(path: string, params?: any) {
    return axios.put(path, params);
  }

  protected get<T>(path: string, params?: any): AxiosObservable<T> {
    return this.__api('get', path, params);
  }

  protected post<T>(path: string, params?: any): AxiosObservable<T> {
    return this.__api('post', path, params);
  }

  protected patch<T>(path: string, params?: any): AxiosObservable<T> {
    return this.__api('patch', path, params);
  }

  protected delete<T>(path: string, params?: any): AxiosObservable<T> {
    return this.__api('delete', path, params);
  }

  protected paginate<T>(
    path: string,
    params: any | Pagination,
    pagination?: Pagination,
  ): AxiosObservable<PaginatedResponse<T>> {
    let request = {};
    if (params instanceof Pagination) {
      request = {
        skip: String(params.page),
        take: String(params.limit),
      };
    } else {
      request = {
        ...params,
        skip: String(pagination.page),
        take: String(pagination.limit),
      };
    }
    return this.__api('get', path, request);
  }
}
