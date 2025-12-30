import axios from "axios";
import cheerio from "cheerio";
import {asyncHandler} from "../../utils/asyncHandler.js";


export const scrapeArticleText = asyncHandler( async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
  });

  const $ = cheerio.load(data);

  // Remove junk
  $("script, style, nav, footer, header").remove();

const selectors = [
  "article",
  ".entry-content",
  ".post-content",
  ".blog-content",
  ".wp-block-post-content",
  "main"
];

let text = null;

for (const selector of selectors) {
  if ($(selector).length) {
    text = $(selector).text().trim();
    break;
  }
}

  return text;
});
