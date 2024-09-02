import configs from "@/config";

export type FetchHttpOption = RequestInit & {
  baseUrl?: string;
};

export interface IError {
  success: boolean;
  headers: Headers;
  data: any;
}

export interface FetchResponse<T extends any> {
  success: boolean;
  headers: Headers;
  data: T;
}

export class FetchHttpError<T> extends Error {
  private data;
  private headers: Headers;

  constructor(props: IError) {
    super(props.data.message);
    this.data = props.data;
    this.headers = props.headers;
  }

  serialize(): FetchResponse<T> {
    return {
      data: this.data,
      success: false,
      headers: this.headers,
    };
  }
}

async function fetchHttp<FetchSuccess, FetchError>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: FetchHttpOption
): Promise<FetchResponse<FetchSuccess>> {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };
  const baseUrl = options?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  if (!res.ok) {
    const { message }: { message: string } = await res.json();
    throw new FetchHttpError<FetchError>({
      success: false,
      headers: res.headers,
      data: { message },
    });
  }
  const data: FetchSuccess = await res.json();
  const result: FetchResponse<FetchSuccess> = {
    success: true,
    headers: res.headers,
    data: data,
  };
  return result;
}

export default {
  get<S = any, E = any>(url: string, options?: Omit<FetchHttpOption, "body">) {
    return fetchHttp<S, E>("GET", url, options);
  },
  post<S = any, E = any>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<S, E>("POST", url, { ...options, body });
  },
  patch<S = any, E = any>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<S, E>("PATCH", url, { ...options, body });
  },
  put<S = any, E = any>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<S, E>("PUT", url, { ...options, body });
  },
  delete<S = any, E = any>(
    url: string,
    options?: Omit<FetchHttpOption, "body">
  ) {
    return fetchHttp<S, E>("DELETE", url, { ...options });
  },
};
