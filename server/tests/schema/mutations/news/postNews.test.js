
const { postNews } = require('../../../../schema/mutations/news/postNews.js');
const User = require('../../../../models/User');

jest.mock('../../../../models/User');

describe('postNews Mutation', () => {
  it('should execute postNews resolver without error', async () => {
    const args = {};  // Add mock args
    const result = await postNews(null, args);
    expect(result).toBeDefined();
  });
});
