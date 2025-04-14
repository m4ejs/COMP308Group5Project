
const { addReview } = require('../../../../schema/mutations/business/addReview.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('addReview Mutation', () => {
  it('should execute addReview resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await addReview(null, args);
    expect(result).toBeDefined();
  });
});
