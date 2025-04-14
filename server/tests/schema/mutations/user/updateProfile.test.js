
const { updateProfile } = require('../../../../schema/mutations/user/updateProfile.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('updateProfile Mutation', () => {
  it('should execute updateProfile resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await updateProfile(null, args);
    expect(result).toBeDefined();
  });
});
