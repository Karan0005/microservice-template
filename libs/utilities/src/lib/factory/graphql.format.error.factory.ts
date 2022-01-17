import { GraphQLError } from 'graphql';
import { BaseMessage } from '../constants';

export const GraphQLFormatErrorFactory = (error: GraphQLError) => {
  let errorMessage;
  if (error.extensions?.response?.message && Array.isArray(error.extensions?.response?.message)) {
    errorMessage = error.extensions?.response?.message;
  } else if (error.extensions?.response?.message) {
    errorMessage = [error.extensions?.response?.message];
  } else if (error.message) {
    errorMessage = [error.message];
  } else {
    errorMessage = [BaseMessage.Error];
  }
  return { message: errorMessage };
};
