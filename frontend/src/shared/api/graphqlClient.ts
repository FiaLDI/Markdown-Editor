import { GraphqlClientError } from "./error";
import { 
  GraphqlClientConfig, 
  GraphqlError, 
  GraphqlRequestOptions, 
  GraphqlVariables 
} from "./types";

type GraphqlResponse<TData> = {
  data?: TData;
  errors?: GraphqlError[];
};

export function createGraphqlClient(config: GraphqlClientConfig) {
  const {
    endpoint,
    credentials = "include",
    headers: defaultHeaders,
    fetcher = fetch,
  } = config;

  return async function graphqlRequest<TData, TVariables = GraphqlVariables>({
    query,
    variables,
    operationName,
    headers,
    signal,
  }: GraphqlRequestOptions<TVariables>): Promise<TData> {
    const response = await fetcher(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...defaultHeaders,
        ...headers,
      },
      credentials,
      signal,
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
    });

    const result = (await response.json()) as GraphqlResponse<TData>;
    const error = result.errors?.[0];

    if (!response.ok || error) {
      throw new GraphqlClientError({
        message: error?.message ?? response.statusText,
        status: response.status,
        errors: result.errors,
        data: result.data,
      });
    }

    if (result.data === undefined) {
      throw new GraphqlClientError({
        message: "GraphQL response does not contain data",
        status: response.status,
      });
    }

    return result.data;
  };
}
