
const mongoose = require('mongoose');
const HelpRequest = require('../../../../models/HelpRequest');

describe('HelpRequest Model', () => {
  it('should create a HelpRequest instance with required fields', () => {
    const data = {};  // Add relevant fields
    const instance = new HelpRequest(data);
    expect(instance).toBeInstanceOf(HelpRequest);
  });
});
