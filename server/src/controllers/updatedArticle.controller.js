import {UpdatedArticle} from "../models/updatedArticle.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"


/**
 * READ all articles
 */
 const getAllUpdatedArticles = asyncHandler( async (req, res) => {
  try {
    const articles = await UpdatedArticle.find().sort({ createdAt: -1 });
     return res.status(200)
    .json(new Apiresponse(200,articles,"Updated Articles fetched successfully"))
  } catch (error) {
     console.error(error)
    throw new Apierror(500,"Something went wrong getting all Updated articles.")
  }
});

/**
 * READ single article
 */
 const getUpdatedArticleById = asyncHandler( async (req, res) => {
  try {
    const article = await UpdatedArticle.findOne({
      originalArticle: req.params.id
    });
    if (!article)
      throw new Apierror(404,"Updated Article not found")

    return res.status(200)
    .json(new Apiresponse(200,article,"Updated Article fetched successfully"))
  } catch (error) {
    console.error(error)
    throw new Apierror(500,"Something went wrong while getting Updated article.")
  }
});

export {
    getAllUpdatedArticles,
    getUpdatedArticleById
}
