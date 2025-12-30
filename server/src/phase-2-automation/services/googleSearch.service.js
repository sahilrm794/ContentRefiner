import axios from "axios";
import * as cheerio from "cheerio";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const googleSearch = asyncHandler( async (query) => {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;

  const { data } = await axios.get(searchUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
  });

  const $ = cheerio.load(data);
  const links = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");

    if (
      href &&
      href.startsWith("/url?q=") &&
      !href.includes("google.com")
    ) {
      const url = href.split("/url?q=")[1].split("&")[0];
      links.push(decodeURIComponent(url));
    }
  });

  return [...new Set(links)].slice(0, 2);
});
