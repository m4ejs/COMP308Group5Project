
const { register } = require('../../../../schema/mutations/user/register.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('register Mutation', () => {
  it('should execute register resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await register(null, args);
    expect(result).toBeDefined();
  });
});
