

export type GraphqlError = {
  message: string;
  path?: Array<string | number>;
  extensions?: Record<string, unknown>;
};

export type GraphqlVariables = Record<string, unknown>;

export type GraphqlRequestOptions<TVariables = GraphqlVariables> = {
  query: string;
  variables?: TVariables;
  operationName?: string;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

export type GraphqlClientConfig = {
  endpoint: string;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  fetcher?: typeof fetch;
};
