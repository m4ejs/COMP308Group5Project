import { GraphQLString, GraphQLID } from 'graphql';
import Business from '../../../models/Business.js';
import BusinessType from '../../types/BusinessType.js';

const addBusiness = {
  addBusiness: {
    type: BusinessType,
    args: {
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      ownerId: { type: GraphQLID }
    },
    async resolve(_, { name, description, ownerId }) {
      const business = new Business({ name, description, owner: ownerId });
      return business.save();
    }
  }
};

export default addBusiness;
