import axios, { AxiosRequestConfig } from "axios";

export interface BaseApiResponse<T = any> {
  statusCode: string;
  message: string;
  data: T;
}

export interface BaseApiError {
  statusCode: string;
  message: string;
  url: string;
}

export class Api {
  private axiosFunction;
  public constructor(hasToken: boolean = false) {
    this.axiosFunction = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });

    if (hasToken) this.setToken();
  }

  private setToken() {
    this.axiosFunction.interceptors.request.use(
      (config) => {
        if (!config.headers) return config;
        config.headers["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T = never, R = BaseApiResponse<T>>(
    url: string,
    params?: AxiosRequestConfig["params"]
  ) {
    return this.axiosFunction.get<R>(url, params);
  }

  public post<T = never, R = BaseApiResponse<T>>(
    url: string,
    data?: AxiosRequestConfig["data"],
    headers?: AxiosRequestConfig["headers"]
  ) {
    return this.axiosFunction.post<R>(url, data, { headers });
  }
}
