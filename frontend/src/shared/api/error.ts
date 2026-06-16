import { GraphqlError } from "./types";

export class GraphqlClientError extends Error {
  readonly status: number;
  readonly errors: GraphqlError[];
  readonly data: unknown;

  constructor(params: {
    message: string;
    status: number;
    errors?: GraphqlError[];
    data?: unknown;
  }) {
    super(params.message);
    this.name = "GraphqlClientError";
    this.status = params.status;
    this.errors = params.errors ?? [];
    this.data = params.data;
  }
}
