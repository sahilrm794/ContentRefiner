import axios from "axios";
import * as cheerio from "cheerio";
import {Article} from "../models/article.model.js";

const BASE_URL = "https://beyondchats.com/blogs";

const scrapeBeyondChats = async () => {
  console.log("Scraping BeyondChats started...");

  let page = 1;
  let allBlogLinks = [];

  // 1. Loop through all pages
  while (true) {
    const pageUrl =
      page === 1 ? `${BASE_URL}/` : `${BASE_URL}/page/${page}/`;

    console.log("Fetching:", pageUrl);

    const { data } = await axios.get(pageUrl);
    const $ = cheerio.load(data);

    const linksOnPage = [];

    $("h2.entry-title a").each((_, el) => {
      const link = $(el).attr("href");
      if (link) linksOnPage.push(link);
    });

    // 2. Stop if no blogs found (last page crossed)
    if (linksOnPage.length === 0) {
      break;
    }

    allBlogLinks.push(...linksOnPage);
    page++;
  }

  console.log("Total blogs found:", allBlogLinks.length);

  // 3. Pick the 5 oldest blogs
  const oldestFiveLinks = allBlogLinks.slice(-5);

  for (const url of oldestFiveLinks) {
    // 4. Skip if already exists
    const exists = await Article.findOne({ sourceUrl: url });
    if (exists) {
      console.log("Skipping existing article:", url);
      continue;
    }

    // 5. Fetch article page
    const articleRes = await axios.get(url);
    const $$ = cheerio.load(articleRes.data);

    // 6. Scrape article details
    const title = $$("h1.elementor-heading-title")
      .first()
      .text()
      .trim();

    const author = $$(
      "span.elementor-post-info__item--type-author"
    )
      .first()
      .text()
      .trim();

    const dateText = $$(
      "span.elementor-post-info__item--type-date time"
    )
      .first()
      .text()
      .trim();

    const category = $$(
      "span.elementor-post-info__terms-list a"
    )
      .first()
      .text()
      .trim();

    const contentHtml = $$(
        "div.elementor-widget-theme-post-content"
    ).html();

    const content = $(
      "div.elementor-widget-theme-post-content"
    ).text().trim();


    if (!contentHtml) {
        console.log("No content found, skipping:", url);
        continue;
    }


    // 7. Save to database
    await Article.create({
        title,
        author,
        category,
        contentHtml,
        content,
        publishedAt: dateText ? new Date(dateText) : null,
        sourceUrl: url,
    });


    console.log("Saved article:", title);
  }

  console.log("Scraping completed");
};

export default scrapeBeyondChats;
