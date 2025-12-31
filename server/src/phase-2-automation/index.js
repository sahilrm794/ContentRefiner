import api from "../configs/axios.configs.js";
import { googleSearch } from "./services/googleSearch.service.js";
import { scrapeArticleText } from "./services/contentScrapper.service.js";
import { rewriteArticle } from "./services/llmRewrite.service.js";
import {UpdatedArticle} from "../models/updatedArticle.model.js"

const automate = (async () => {
  // 1. Fetch articles from your API
try {
      const { data } = await api.get("/");
      const articles = data.data
    
      for (const article of articles) {
        console.log("Processing:", article.title);
    
        // 2. Google Search
        const links = await googleSearch(article.title);
    
        // 3. Scrape reference content
        const referenceContents = [];
        for (const link of links) {
          const text = await scrapeArticleText(link);
          referenceContents.push(text.slice(0, 4000)); // limit size
        }
    
        // 4. Rewrite using Gemini
        const updatedContent = await rewriteArticle(
          article.content,
          referenceContents,
          links
        );
    
        await UpdatedArticle.create({
            originalArticle: article._id,
            title: article.title,
            content: updatedContent,
            references: links,
        });

    
        console.log("Updated:", article.title);
      }
} catch (error) {
    console.error(error)
}
})

automate()
