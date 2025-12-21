import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export async function parseArticleFromUrl(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118"
    }
  });

  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  return {
    title: article.title,
    author: article.byline,
    htmlContent: article.content,
    textContent: article.textContent,
  };
}
