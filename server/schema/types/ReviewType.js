import { GraphQLObjectType, GraphQLString } from 'graphql';

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    text: { type: GraphQLString },
    sentiment: { type: GraphQLString },
    reply: { type: GraphQLString }
  })
});

export default ReviewType;
