import { GraphQLObjectType } from 'graphql';

import register from './user/register.js';
import login from './user/login.js';
import updateUserProfile from './user/updateProfile.js';

import postNews from './news/postNews.js';

import postHelpRequest from './help/postHelpRequest.js';

import createEmergencyAlert from './emergency/createEmergencyAlert.js';

import addBusiness from './business/addBusiness.js';
import addReview from './business/addReview.js';
import replyToReview from './business/replyToReview.js';
import addBusinessDeal from './business/addBusinessDeal.js';

import createEvent from './event/createEvent.js';
import volunteerEvent from './event/volunteerEvent.js';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...register,
    ...login,
    ...updateUserProfile,
    ...postNews,
    ...postHelpRequest,
    ...createEmergencyAlert,
    ...addBusiness,
    ...addReview,
    ...replyToReview,
    ...addBusinessDeal,
    ...createEvent,
    ...volunteerEvent
  }
});

export default Mutation;
