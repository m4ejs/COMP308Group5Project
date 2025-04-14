
const { volunteerEvent } = require('../../../../schema/mutations/event/volunteerEvent.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('volunteerEvent Mutation', () => {
  it('should execute volunteerEvent resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await volunteerEvent(null, args);
    expect(result).toBeDefined();
  });
});
