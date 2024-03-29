import axios, { AxiosResponse } from 'axios';
import Axios from 'axios-observable';
import {
  DevelopmentEnvironment,
  StagingEnvironment,
  ProductionEnvironment,
  EnvironmentType,
  Environment,
  ApiUrlType,
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
    apiUrlType?: ApiUrlType,
    data?: any,
  ): AxiosObservable<T> {
    let baseUrl: string;
    let siteUrl: string;
    let homepageBaseUrl: string;
    let homepageSiteUrl: string;
    let analysisUrl: string;
    let pickcookUrl: string;
    if (process.env.NODE_ENV === EnvironmentType.development) {
      baseUrl = DevelopmentEnvironment.baseURL;
      siteUrl = DevelopmentEnvironment.siteUrl;
      homepageBaseUrl = DevelopmentEnvironment.homepageBaseUrl;
      homepageSiteUrl = DevelopmentEnvironment.homepageSiteUrl;
      analysisUrl = DevelopmentEnvironment.analysisUrl;
      pickcookUrl = DevelopmentEnvironment.pickcookUrl;
    }
    if (process.env.NODE_ENV === EnvironmentType.staging) {
      baseUrl = StagingEnvironment.baseURL;
      siteUrl = StagingEnvironment.siteUrl;
      homepageBaseUrl = StagingEnvironment.homepageBaseUrl;
      homepageSiteUrl = StagingEnvironment.homepageSiteUrl;
      analysisUrl = StagingEnvironment.analysisUrl;
      pickcookUrl = StagingEnvironment.pickcookUrl;
    }
    if (process.env.NODE_ENV === EnvironmentType.production) {
      baseUrl = ProductionEnvironment.baseURL;
      siteUrl = ProductionEnvironment.siteUrl;
      homepageBaseUrl = ProductionEnvironment.homepageBaseUrl;
      homepageSiteUrl = ProductionEnvironment.homepageSiteUrl;
      analysisUrl = ProductionEnvironment.analysisUrl;
      pickcookUrl = ProductionEnvironment.pickcookUrl;
    }
    // axios observable에서 글로벌 에러 catch하는 코드
    Axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (
          typeof error.response.data.message === 'string' &&
          error.response.data.message ===
            '세션이 만료되었습니다. 다시 로그인해주세요.'
        ) {
          JwtStorageService.removeToken();
          window.location.replace(`${siteUrl}login`);
          toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
        }
        if (typeof error.response.data.message === 'object') {
          toast.error(
            error.response.data.message[0].constraints[
              Object.keys(error.response.data.message[0].constraints)[0]
            ],
          );
        }
        if (
          typeof error.response.data.message === 'string' &&
          error.response.data.message !==
            '세션이 만료되었습니다. 다시 로그인해주세요.'
        ) {
          toast.error(error.response.data.message);
        }
      },
    );
    if (apiUrlType === ApiUrlType.ANALYSIS) {
      baseUrl = analysisUrl;
    } else if (apiUrlType === ApiUrlType.PICKCOOK) {
      baseUrl = pickcookUrl;
    }
    if (path.indexOf('http') !== 0) {
      path = baseUrl + path;
    }
    const headers: any = {
      'x-client-name': baseUrl,
      'Content-type': 'application/json',
      //   'Accept': 'application/json',
    };
    // console.log(headers);
    // console.log(baseUrl);
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
      return Axios.delete(path, { params, headers, data }) as AxiosObservable<
        T
      >;
    }
  }

  public fileGet(path: string, params?: any, apiUrlType?: ApiUrlType) {
    let baseUrl: string;
    let pickcookUrl: string;
    if (process.env.NODE_ENV === EnvironmentType.development) {
      baseUrl = DevelopmentEnvironment.baseURL;
      pickcookUrl = DevelopmentEnvironment.pickcookUrl;
    }
    if (process.env.NODE_ENV === EnvironmentType.staging) {
      baseUrl = StagingEnvironment.baseURL;
      pickcookUrl = StagingEnvironment.pickcookUrl;
    }
    if (process.env.NODE_ENV === EnvironmentType.production) {
      baseUrl = ProductionEnvironment.baseURL;
      pickcookUrl = ProductionEnvironment.pickcookUrl;
    }
    if (apiUrlType === ApiUrlType.PICKCOOK) {
      baseUrl = pickcookUrl;
    }

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

  public filePost(path: string, params?: any, apiUrlType?: ApiUrlType) {
    let baseUrl: string;
    let pickcookUrl: string;
    if (process.env.NODE_ENV === EnvironmentType.development) {
      baseUrl = DevelopmentEnvironment.baseURL;
      pickcookUrl = DevelopmentEnvironment.pickcookUrl;
    }
    if (process.env.NODE_ENV === EnvironmentType.staging) {
      baseUrl = StagingEnvironment.baseURL;
      pickcookUrl = StagingEnvironment.pickcookUrl;
    }
    if (process.env.NODE_ENV === EnvironmentType.production) {
      baseUrl = ProductionEnvironment.baseURL;
      pickcookUrl = ProductionEnvironment.pickcookUrl;
    }
    if (apiUrlType === ApiUrlType.PICKCOOK) {
      baseUrl = pickcookUrl;
    }
    if (path.indexOf('http') !== 0) {
      path = baseUrl + path;
    }
    return axios.post(path, params);
  }

  public put(path: string, params?: any) {
    return axios.put(path, params);
  }

  protected get<T>(
    path: string,
    params?: any,
    apiUrlType?: ApiUrlType,
  ): AxiosObservable<T> {
    return this.__api('get', path, params, apiUrlType);
  }

  protected post<T>(
    path: string,
    params?: any,
    apiUrlType?: ApiUrlType,
  ): AxiosObservable<T> {
    return this.__api('post', path, params, apiUrlType);
  }

  protected patch<T>(
    path: string,
    params?: any,
    apiUrlType?: ApiUrlType,
  ): AxiosObservable<T> {
    return this.__api('patch', path, params, apiUrlType);
  }

  protected delete<T>(
    path: string,
    params?: any,
    apiUrlType?: ApiUrlType,
    data?: any,
  ): AxiosObservable<T> {
    return this.__api('delete', path, params, apiUrlType, data);
  }

  protected paginate<T>(
    path: string,
    params: any | Pagination,
    pagination?: Pagination,
    apiUrlType?: ApiUrlType,
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
    return this.__api('get', path, request, apiUrlType);
  }
}
