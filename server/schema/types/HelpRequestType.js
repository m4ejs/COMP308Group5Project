import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import User from '../../models/User.js';
import UserType from './UserType.js';

const HelpRequestType = new GraphQLObjectType({
  name: 'HelpRequest',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    requester: {
      type: UserType,
      resolve: (parent) => User.findById(parent.requester)
    },
    matchedVolunteer: {
      type: UserType,
      resolve: (parent) => User.findById(parent.matchedVolunteer)
    }
  })
});

export default HelpRequestType;
