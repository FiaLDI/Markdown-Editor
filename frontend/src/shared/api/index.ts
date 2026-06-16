import { GRAPHQL_ENDPOINT } from "./config";
import { createGraphqlClient } from "./graphqlClient";

export { GRAPHQL_ENDPOINT } from "./config";
export {
  type GraphqlClientConfig,
  type GraphqlError,
  type GraphqlRequestOptions,
  type GraphqlVariables,
} from "./types";

export { GraphqlClientError } from "./error";
export { createGraphqlClient } from "./graphqlClient";

export const graphqlRequest = createGraphqlClient({
  endpoint: GRAPHQL_ENDPOINT,
});
