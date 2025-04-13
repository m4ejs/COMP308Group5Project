import { GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';

import User from '../../models/User.js';
import News from '../../models/News.js';
import HelpRequest from '../../models/HelpRequest.js';
import Business from '../../models/Business.js';
import Event from '../../models/Event.js';
import EmergencyAlert from '../../models/EmergencyAlert.js';
import Notification from '../../models/Notification.js';

import UserType from '../types/UserType.js';
import NewsType from '../types/NewsType.js';
import HelpRequestType from '../types/HelpRequestType.js';
import BusinessType from '../types/BusinessType.js';
import EventType from '../types/EventType.js';
import EmergencyAlertType from '../types/EmergencyAlertType.js';
import NotificationType from '../types/NotificationType.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: () => User.find()
    },
    newsFeed: {
      type: new GraphQLList(NewsType),
      resolve: () => News.find().sort({ createdAt: -1 })
    },
    helpRequests: {
      type: new GraphQLList(HelpRequestType),
      resolve: () => HelpRequest.find()
    },
    businesses: {
      type: new GraphQLList(BusinessType),
      resolve: () => Business.find()
    },
    events: {
      type: new GraphQLList(EventType),
      resolve: () => Event.find()
    },
    emergencyAlerts: {
      type: new GraphQLList(EmergencyAlertType),
      resolve: () => EmergencyAlert.find().sort({ createdAt: -1 })
    },
    notificationsByUser: {
      type: new GraphQLList(NotificationType),
      args: { userId: { type: GraphQLID } },
      resolve: (_, { userId }) => Notification.find({ userId }).sort({ createdAt: -1 })
    }
  }
});

export default RootQuery;
