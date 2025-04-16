import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import UserType from './UserType.js';
import User from '../../models/User.js';

const NewsType = new GraphQLObjectType({
  name: 'News',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (parent) => parent._id
    },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    summary: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (parent) =>
        parent.createdAt
          ? new Date(parent.createdAt).toLocaleString('en-US')
          : null
    },
    author: {
      type: UserType,
      resolve: (parent) => User.findById(parent.author)
    }
  })
});

export default NewsType;
