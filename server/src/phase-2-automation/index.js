import api from "../config/axios.js";
import { googleSearch } from "../services/googleSearch.js";
import { scrapeArticleText } from "/services/contentScraper.js";
import { rewriteArticle } from "/services/llmRewrite.js";

const automate = (async () => {
  // 1. Fetch articles from your API
try {
      const { data: articles } = await api.get("/");
    
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

export {automate}
