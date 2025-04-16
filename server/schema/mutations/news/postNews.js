import { GraphQLString, GraphQLID } from 'graphql';
import News from '../../../models/News.js';
import NewsType from '../../types/NewsType.js';
import { summarizeText } from '../../../services/aiService.js';

const postNews = {
  postNews: {
    type: NewsType,
    args: {
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      authorId: { type: GraphQLID },
      type: { type: GraphQLString }
    },
    async resolve(_, { title, content, authorId, type }) {
      console.log("📥 Mutation input:", { title, content, authorId, type });

      let summary = "";
      try {
        summary = await summarizeText(content);
      } catch (error) {
        console.error("❌ AI Summary failed:", error.message);
        summary = "Summary unavailable due to AI error.";
      }

      try {
        const news = new News({ title, content, summary, author: authorId, type }); // ✅ Fixed
        const saved = await news.save();
        return saved;
      } catch (err) {
        console.error("❌ Error saving news to MongoDB:", err.message);
        throw new Error("Failed to save news post.");
      }
    }
  }
};

export default postNews;
