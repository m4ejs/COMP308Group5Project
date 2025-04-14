
const mongoose = require('mongoose');
const Event = require('../../../../models/Event');

describe('Event Model', () => {
  it('should create a Event instance with required fields', () => {
    const data = {};  // Add relevant fields
    const instance = new Event(data);
    expect(instance).toBeInstanceOf(Event);
  });
});
