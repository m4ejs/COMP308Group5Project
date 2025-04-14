import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import EmergencyAlert from '../../models/EmergencyAlert.js';
import EmergencyAlertType from './EmergencyAlertType.js';

const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    isRead: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    alert: {
      type: EmergencyAlertType,
      resolve: (parent) => EmergencyAlert.findById(parent.alertId)
    }
  })
});

export default NotificationType;
