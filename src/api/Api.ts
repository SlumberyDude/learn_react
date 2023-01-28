/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Body_login_for_access_token_token_post */
export interface BodyLoginForAccessTokenTokenPost {
  /**
   * Grant Type
   * @pattern password
   */
  grant_type?: string;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string;
  /** Client Secret */
  client_secret?: string;
}

/**
 * ConfirmDelete
 * @example {"deletion_confirm":"delete"}
 */
export interface ConfirmDelete {
  /** Deletion Confirm */
  deletion_confirm: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** LinkInp */
export interface LinkInp {
  /** Title */
  title?: string;
  /** Url */
  url: string;
}

/** Token */
export interface Token {
  /** Access Token */
  access_token: string;
  /** Token Type */
  token_type: string;
}

/**
 * UserReg
 * @example {"username":"JohnDoe","password":"qwerty","password_confirm":"qwerty"}
 */
export interface UserReg {
  /** Username */
  username: string;
  /** Password */
  password: string;
  /** Password Confirm */
  password_confirm: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: any[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Link Manager API
 * @version 0.0.1
 *
 * This is a custom OpenAPI schema
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name HomeGet
   * @summary Home
   * @request GET:/
   */
  homeGet = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  token = {
    /**
     * No description
     *
     * @tags Users
     * @name LoginForAccessTokenTokenPost
     * @summary Login For Access Token
     * @request POST:/token
     */
    loginForAccessTokenTokenPost: (data: BodyLoginForAccessTokenTokenPost, params: RequestParams = {}) =>
      this.request<Token, HTTPValidationError>({
        path: `/token`,
        method: 'POST',
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),
  };
  register = {
    /**
     * No description
     *
     * @tags Users
     * @name RegisterRegisterPost
     * @summary Register
     * @request POST:/register
     */
    registerRegisterPost: (data: UserReg, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  deleteMe = {
    /**
     * No description
     *
     * @tags Users
     * @name DeleteMyAccountDeleteMeDelete
     * @summary Delete My Account
     * @request DELETE:/delete_me
     * @secure
     */
    deleteMyAccountDeleteMeDelete: (data: ConfirmDelete, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/delete_me`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  getMyLinks = {
    /**
     * No description
     *
     * @tags Links
     * @name GetLinksGetMyLinksGet
     * @summary Get Links
     * @request GET:/get_my_links
     * @secure
     */
    getLinksGetMyLinksGet: (
      query?: {
        /**
         * Offset
         * @default ""
         */
        offset?: string;
        /** Limit */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/get_my_links`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  getLinkByUrl = {
    /**
     * No description
     *
     * @tags Links
     * @name GetLinkByUrlGetLinkByUrlGet
     * @summary Get Link By Url
     * @request GET:/get_link_by_url
     * @secure
     */
    getLinkByUrlGetLinkByUrlGet: (
      query: {
        /** Url */
        url: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/get_link_by_url`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  getLinkByTimestamp = {
    /**
     * No description
     *
     * @tags Links
     * @name GetLinkByTimestampGetLinkByTimestampGet
     * @summary Get Link By Timestamp
     * @request GET:/get_link_by_timestamp
     * @secure
     */
    getLinkByTimestampGetLinkByTimestampGet: (
      query: {
        /** Timestamp */
        timestamp: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/get_link_by_timestamp`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  addLink = {
    /**
     * No description
     *
     * @tags Links
     * @name AddLinkAddLinkPost
     * @summary Add Link
     * @request POST:/add_link
     * @secure
     */
    addLinkAddLinkPost: (data: LinkInp, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/add_link`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  addTag = {
    /**
     * No description
     *
     * @tags Tags
     * @name AddTagAddTagPost
     * @summary Add Tag
     * @request POST:/add_tag
     * @secure
     */
    addTagAddTagPost: (
      query: {
        /** Link Timestamp */
        link_timestamp: string;
        /** Tagname */
        tagname: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/add_tag`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  removeTag = {
    /**
     * No description
     *
     * @tags Tags
     * @name RemoveTagRemoveTagDelete
     * @summary Remove Tag
     * @request DELETE:/remove_tag
     * @secure
     */
    removeTagRemoveTagDelete: (
      query: {
        /** Link Timestamp */
        link_timestamp: string;
        /** Tagname */
        tagname: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/remove_tag`,
        method: 'DELETE',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  getLinksByTag = {
    /**
     * No description
     *
     * @tags Links
     * @name GetLinksByTagGetLinksByTagGet
     * @summary Get Links By Tag
     * @request GET:/get_links_by_tag
     * @secure
     */
    getLinksByTagGetLinksByTagGet: (
      query: {
        /** Tagname */
        tagname: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/get_links_by_tag`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  deleteLink = {
    /**
     * No description
     *
     * @tags Links
     * @name DeleteLinkDeleteLinkDelete
     * @summary Delete Link
     * @request DELETE:/delete_link
     * @secure
     */
    deleteLinkDeleteLinkDelete: (
      query: {
        /** Link Timestamp */
        link_timestamp: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/delete_link`,
        method: 'DELETE',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
