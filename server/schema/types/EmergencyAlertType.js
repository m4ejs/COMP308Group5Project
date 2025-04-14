import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import User from '../../models/User.js';
import UserType from './UserType.js';

const EmergencyAlertType = new GraphQLObjectType({
  name: 'EmergencyAlert',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    reporter: {
      type: UserType,
      resolve: (parent) => User.findById(parent.reporter)
    }
  })
});

export default EmergencyAlertType;
