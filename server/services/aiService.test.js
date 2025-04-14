const axios = require('axios');
const { summarizeText, analyzeSentiment } = require('./aiService');

jest.mock('axios');

describe('AI Service', () => {
    test('summarizeText returns summarized content', async () => {
        const mockSummary = 'This is a summary.';
        axios.post.mockResolvedValue({
            data: {
                candidates: [
                    { content: { parts: [{ text: mockSummary }] } }
                ]
            }
        });

        const result = await summarizeText('Some long text...');
        expect(result).toBe(mockSummary);
    });

    test('analyzeSentiment returns sentiment analysis', async () => {
        const mockSentiment = 'Positive';
        axios.post.mockResolvedValue({
            data: {
                candidates: [
                    { content: { parts: [{ text: mockSentiment }] } }
                ]
            }
        });

        const result = await analyzeSentiment('I love this product!');
        expect(result).toBe(mockSentiment);
    });
});
