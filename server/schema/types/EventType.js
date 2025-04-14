import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import User from '../../models/User.js';
import UserType from './UserType.js';

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    organizer: {
      type: UserType,
      resolve: (parent) => User.findById(parent.organizer)
    },
    volunteers: {
      type: new GraphQLList(UserType),
      resolve: async (parent) => {
        return await User.find({ _id: { $in: parent.volunteers } });
      }
    }
  })
});

export default EventType;
