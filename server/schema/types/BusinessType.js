import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import User from '../../models/User.js';
import UserType from './UserType.js';
import ReviewType from './ReviewType.js';

const DealType = new GraphQLObjectType({
  name: 'Deal',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    validUntil: { type: GraphQLString }
  })
});

const BusinessType = new GraphQLObjectType({
  name: 'Business',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    owner: {
      type: UserType,
      resolve: (parent) => User.findById(parent.owner)
    },
    reviews: { type: new GraphQLList(ReviewType) },
    deals: { type: new GraphQLList(DealType) }
  })
});

export default BusinessType;
