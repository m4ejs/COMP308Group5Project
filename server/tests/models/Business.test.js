
const mongoose = require('mongoose');
const Business = require('../../../../models/Business');

describe('Business Model', () => {
  it('should create a Business instance with required fields', () => {
    const data = {};  // Add relevant fields
    const instance = new Business(data);
    expect(instance).toBeInstanceOf(Business);
  });
});
