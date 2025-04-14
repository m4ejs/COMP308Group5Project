import { GraphQLID } from 'graphql';
import Event from '../../../models/Event.js';
import EventType from '../../types/EventType.js';

const volunteerEvent = {
  volunteerEvent: {
    type: EventType,
    args: {
      eventId: { type: GraphQLID },
      userId: { type: GraphQLID }
    },
    async resolve(_, { eventId, userId }) {
      const event = await Event.findById(eventId);
      event.volunteers.push(userId);
      return event.save();
    }
  }
};

export default volunteerEvent;
