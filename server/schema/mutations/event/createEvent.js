import { GraphQLString, GraphQLID } from 'graphql';
import Event from '../../../models/Event.js';
import EventType from '../../types/EventType.js';

const createEvent = {
  createEvent: {
    type: EventType,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      date: { type: GraphQLString },
      organizerId: { type: GraphQLID }
    },
    async resolve(_, { title, description, date, organizerId }) {
      let finalDate = date;

      if (!finalDate) {
        const now = new Date();
        const day = now.getDay();
        const daysUntilSaturday = (6 - day + 7) % 7;
        const suggested = new Date(now);
        suggested.setDate(now.getDate() + daysUntilSaturday);
        suggested.setHours(10, 0, 0);

        finalDate = suggested.toISOString();
      }

      const event = new Event({ title, description, date: finalDate, organizer: organizerId });
      return event.save();
    }
  }
};

export default createEvent;
