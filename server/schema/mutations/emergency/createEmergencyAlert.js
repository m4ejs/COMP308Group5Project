import { GraphQLString, GraphQLID } from 'graphql';
import mongoose from 'mongoose';
import EmergencyAlert from '../../../models/EmergencyAlert.js';
import EmergencyAlertType from '../../types/EmergencyAlertType.js';
import User from '../../../models/User.js';
import Notification from '../../../models/Notification.js';

const createEmergencyAlert = {
  createEmergencyAlert: {
    type: EmergencyAlertType,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      location: { type: GraphQLString },
      type: { type: GraphQLString },
      reporterId: { type: GraphQLID }
    },
    async resolve(_, { title, description, location, type, reporterId }) {
      const objectId = new mongoose.Types.ObjectId(reporterId);



      const reporter = await User.findById(objectId);
      if (!reporter) {
        console.log("❌ Reporter not found:", reporterId);
        throw new Error("User not found");
      }

      const alert = new EmergencyAlert({
        title,
        description,
        location,
        type,
        reporter: objectId
      });

      await alert.save();

      const otherUsers = await User.find({ _id: { $ne: objectId } });

      const notifications = otherUsers.map(user => ({
        message: `🚨 Emergency Alert: ${title} in ${location}`,
        userId: user._id,
        alertId: alert._id
      }));

      await Notification.insertMany(notifications);

      return alert;
    }
  }
};

export default createEmergencyAlert;
