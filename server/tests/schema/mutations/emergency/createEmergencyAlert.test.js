
const { createEmergencyAlert } = require('../../../../schema/mutations/emergency/createEmergencyAlert.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('createEmergencyAlert Mutation', () => {
  it('should execute createEmergencyAlert resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await createEmergencyAlert(null, args);
    expect(result).toBeDefined();
  });
});
