
const { addBusiness } = require('../../../../schema/mutations/business/addBusiness.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('addBusiness Mutation', () => {
  it('should execute addBusiness resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await addBusiness(null, args);
    expect(result).toBeDefined();
  });
});
