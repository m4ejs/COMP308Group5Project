import HelpRequest from '../../../models/HelpRequest.js';
import User from '../../../models/User.js';
import HelpRequestType from '../../types/HelpRequestType.js';
import { GraphQLString, GraphQLID } from 'graphql';

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

      // ✅ Debug logs (optional)
      console.log("📨 New Help Request from:", requester.username);
      console.log("📍 Location:", requester.location);
      console.log("🎯 Interests:", requester.interests);

      // ✅ Find matching volunteer: role=resident + same location + interest match
      const volunteer = await User.findOne({
        _id: { $ne: requesterId },
        role: 'resident',
        location: requester.location,
        interests: { $in: requester.interests }
      });

      if (volunteer) {
        console.log("✅ Matched Volunteer:", volunteer.username);
      } else {
        console.log("❌ No volunteer match found.");
      }

      // ✅ Save help request
      const helpRequest = new HelpRequest({
        title,
        description,
        requester: requesterId,
        matchedVolunteer: volunteer?._id || null
      });

      return helpRequest.save();
    }
  }
};

export default postHelpRequest;
