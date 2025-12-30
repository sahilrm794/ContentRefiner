import { asyncHandler } from "../../utils/asyncHandler.js";
import { groq } from "../../configs/llm.configs.js";

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

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
});
