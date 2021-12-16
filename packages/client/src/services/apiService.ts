import axios, { AxiosRequestConfig } from "axios";

export interface BaseApiResponse<T = any> {
  statusCode: string;
  message: string;
  data: T;
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
        config.headers["Authorization"] = "Bearer " + localStorage.get("token");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<ResponseType>(url: string, params: AxiosRequestConfig["params"]) {
    return this.axiosFunction.get<ResponseType>(url, params);
  }

  public post<T = T extends BaseApiResponse<T>>(
    url: string,
    data?: AxiosRequestConfig["data"],
    headers?: AxiosRequestConfig["headers"]
  ) {
    return this.axiosFunction.post<ResponseType>(url, data, { headers });
  }
}
