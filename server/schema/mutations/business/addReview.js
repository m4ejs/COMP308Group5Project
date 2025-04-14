import { GraphQLString, GraphQLID } from 'graphql';
import Business from '../../../models/Business.js';
import BusinessType from '../../types/BusinessType.js';
import { analyzeSentiment } from '../../../services/aiService.js';

const addReview = {
  addReview: {
    type: BusinessType,
    args: {
      businessId: { type: GraphQLID },
      text: { type: GraphQLString }
    },
    async resolve(_, { businessId, text }) {
      let sentiment = "Sentiment unavailable";
      try {
        sentiment = await analyzeSentiment(text);
      } catch (err) {
        console.error("❌ Sentiment analysis failed:", err.message);
      }

      const business = await Business.findById(businessId);
      business.reviews.push({ text, sentiment });
      return business.save();
    }
  }
};

export default addReview;
