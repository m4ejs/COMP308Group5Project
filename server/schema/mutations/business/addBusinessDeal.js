import { GraphQLID, GraphQLString } from 'graphql';
import Business from '../../../models/Business.js';
import BusinessType from '../../types/BusinessType.js';

const addBusinessDeal = {
  addBusinessDeal: {
    type: BusinessType,
    args: {
      businessId: { type: GraphQLID },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      validUntil: { type: GraphQLString }
    },
    async resolve(_, { businessId, title, description, validUntil }) {
      const business = await Business.findById(businessId);
      if (!business) throw new Error("Business not found");

      business.deals.push({ title, description, validUntil });
      return business.save();
    }
  }
};

export default addBusinessDeal;
