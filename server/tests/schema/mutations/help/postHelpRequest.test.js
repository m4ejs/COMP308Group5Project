
const { postHelpRequest } = require('../../../../schema/mutations/help/postHelpRequest.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('postHelpRequest Mutation', () => {
  it('should execute postHelpRequest resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await postHelpRequest(null, args);
    expect(result).toBeDefined();
  });
});
