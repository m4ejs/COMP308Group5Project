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
      authorId: { type: GraphQLID }
    },
    async resolve(_, { title, content, authorId }) {
      let summary = "";
      try {
        summary = await summarizeText(content);
      } catch (error) {
        console.error("❌ AI Summary failed:", error.message);
        summary = "Summary unavailable due to AI error.";
      }

      const news = new News({ title, content, summary, author: authorId });
      return news.save();
    }
  }
};

export default postNews;
