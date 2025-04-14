import { GraphQLString, GraphQLID } from 'graphql';
import HelpRequest from '../../../models/HelpRequest.js';
import HelpRequestType from '../../types/HelpRequestType.js';
import User from '../../../models/User.js';

const postHelpRequest = {
  postHelpRequest: {
    type: HelpRequestType,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      requesterId: { type: GraphQLID }
    },
    async resolve(_, { title, description, requesterId }) {
      const requester = await User.findById(requesterId);
      if (!requester) throw new Error("Requester not found");

      const potentialVolunteers = await User.find({
        _id: { $ne: requesterId },
        role: "resident",
        location: requester.location,
        interests: { $in: requester.interests }
      });

      const matchedVolunteer = potentialVolunteers[0]?._id || null;

      const helpRequest = new HelpRequest({
        title,
        description,
        requester: requesterId,
        matchedVolunteer
      });

      return helpRequest.save();
    }
  }
};

export default postHelpRequest;
