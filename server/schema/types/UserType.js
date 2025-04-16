import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (parent) => parent._id
    },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    location: { type: GraphQLString },
    interests: { type: new GraphQLList(GraphQLString) }
  })
});

export default UserType;
