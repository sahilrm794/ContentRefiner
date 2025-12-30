import { asyncHandler } from "../../utils/asyncHandler.js";
import { geminiModel } from "../../configs/llm.configs.js";

export const rewriteArticle = asyncHandler(async (
  originalContent,
  referenceContents,
  referenceUrls
) => {
  const prompt = `
You are a professional SEO blog writer.

Original Article:
${originalContent}

Reference Articles:
${referenceContents.join("\n\n")}

Rewrite the original article:
- Improve structure & clarity
- Match tone of reference articles
- Do NOT plagiarize
- Keep original meaning
- Add a "References" section at the end
- Cite these URLs:
${referenceUrls.join("\n")}
`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;

  return response.text();
});
