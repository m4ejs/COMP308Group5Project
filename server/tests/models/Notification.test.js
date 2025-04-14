
const mongoose = require('mongoose');
const Notification = require('../../../../models/Notification');

describe('Notification Model', () => {
  it('should create a Notification instance with required fields', () => {
    const data = {};  // Add relevant fields
    const instance = new Notification(data);
    expect(instance).toBeInstanceOf(Notification);
  });
});
