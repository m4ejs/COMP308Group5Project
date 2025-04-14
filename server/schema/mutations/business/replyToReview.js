import { GraphQLID, GraphQLString } from 'graphql';
import Business from '../../../models/Business.js';
import BusinessType from '../../types/BusinessType.js';

const replyToReview = {
  replyToReview: {
    type: BusinessType,
    args: {
      businessId: { type: GraphQLID },
      reviewIndex: { type: GraphQLString },
      replyText: { type: GraphQLString }
    },
    async resolve(_, { businessId, reviewIndex, replyText }) {
      const business = await Business.findById(businessId);
      if (!business) throw new Error("Business not found");

      if (!business.reviews[reviewIndex]) {
        throw new Error("Review not found at index");
      }

      business.reviews[reviewIndex].reply = replyText;
      return business.save();
    }
  }
};

export default replyToReview;
