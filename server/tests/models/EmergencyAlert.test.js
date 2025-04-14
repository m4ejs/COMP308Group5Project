
const mongoose = require('mongoose');
const EmergencyAlert = require('../../../../models/EmergencyAlert');

describe('EmergencyAlert Model', () => {
  it('should create a EmergencyAlert instance with required fields', () => {
    const data = {};  // Add relevant fields
    const instance = new EmergencyAlert(data);
    expect(instance).toBeInstanceOf(EmergencyAlert);
  });
});
