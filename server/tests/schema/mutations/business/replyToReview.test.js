
const { replyToReview } = require('../../../../schema/mutations/business/replyToReview.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('replyToReview Mutation', () => {
  it('should execute replyToReview resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await replyToReview(null, args);
    expect(result).toBeDefined();
  });
});
