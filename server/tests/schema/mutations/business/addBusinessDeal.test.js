
const { addBusinessDeal } = require('../../../../schema/mutations/business/addBusinessDeal.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('addBusinessDeal Mutation', () => {
  it('should execute addBusinessDeal resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await addBusinessDeal(null, args);
    expect(result).toBeDefined();
  });
});
