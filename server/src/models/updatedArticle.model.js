import mongoose from "mongoose";

const updatedArticleSchema = new mongoose.Schema(
  {
    originalArticle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },

    title: String,

    content: String,

    references: [{type:String}],

    generatedBy: {
      type: String,
      default: "Gemini",
    },
  },
  { timestamps: true }
);

export const UpdatedArticle = mongoose.model("UpdatedArticle", updatedArticleSchema);
