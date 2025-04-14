
const { createEvent } = require('../../../../schema/mutations/event/createEvent.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('createEvent Mutation', () => {
  it('should execute createEvent resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await createEvent(null, args);
    expect(result).toBeDefined();
  });
});
