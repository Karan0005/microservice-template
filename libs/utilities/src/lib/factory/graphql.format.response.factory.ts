import type { GraphQLResponse } from 'apollo-server-types';

export const GraphQLFormatResponseFactory = (response: GraphQLResponse) => {
  return {
    data: response.data,
    errors: response.errors,
    extensions: response.extensions,
    http: response.http
  };
};
