import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import User from '../../models/User.js';
import UserType from './UserType.js';

const EmergencyAlertType = new GraphQLObjectType({
  name: 'EmergencyAlert',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (parent) => parent._id // ✅ resolve Mongo _id as id
    },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (parent) => {
        return parent.createdAt
          ? new Date(parent.createdAt).toLocaleString('en-US') // ✅ readable date
          : null;
      }
    },
    reporter: {
      type: UserType,
      resolve: (parent) => User.findById(parent.reporter) // ✅ resolve user
    }
  })
});

export default EmergencyAlertType;
