import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import UserType from './UserType.js';
const NewsType = new GraphQLObjectType({
  name: 'News',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    author: {
        type: UserType,
        resolve: (parent) => User.findById(parent.author)
      }
  })
});

export default NewsType;
