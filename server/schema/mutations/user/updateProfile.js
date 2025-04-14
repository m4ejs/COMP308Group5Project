import { GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import User from '../../../models/User.js';
import UserType from '../../types/UserType.js';

const updateUserProfile = {
  updateUserProfile: {
    type: UserType,
    args: {
      userId: { type: GraphQLID },
      location: { type: GraphQLString },
      interests: { type: new GraphQLList(GraphQLString) }
    },
    async resolve(_, { userId, location, interests }) {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      if (location) user.location = location;
      if (interests) user.interests = interests;

      return user.save();
    }
  }
};

export default updateUserProfile;
