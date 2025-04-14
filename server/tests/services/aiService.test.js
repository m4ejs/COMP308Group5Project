
const aiService = require('../../../../services/aiService');

describe('AI Service', () => {
  it('should summarize content', async () => {
    const result = await aiService.summarize('Long text content');
    expect(result).toBeDefined();
  });

  it('should analyze sentiment', async () => {
    const result = await aiService.analyzeSentiment('Happy content');
    expect(result).toBeDefined();
  });

  it('should detect trends', async () => {
    const result = await aiService.detectTrends(['tag1', 'tag2']);
    expect(result).toBeDefined();
  });
});
