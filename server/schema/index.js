import { GraphQLSchema } from 'graphql';
import RootQuery from './queries/index.js';
import Mutation from './mutations/index.js';

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
