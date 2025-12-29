import Article from "../models/article.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/Apierror.js"
import { Apiresponse } from "../utils/Apiresponse.js"

/**
 * CREATE article
 */
 const createArticle = asyncHandler(async (req, res) => {
  try {
const { title, content } = req.body;

  const existingArticle = await Article.findOne({
    title,
    content
  });

  if (existingArticle) {
    throw new ApiError(409,"Article already exxist")
  }
    const article = await Article.create(req.body);
    return res.status(200)
    .json(new Apiresponse(200,article,"Article created successfully"))
  } catch (error) {
    console.error(error)
    throw new ApiError(500,"Something went wrong while creating article.")
  }
})

/**
 * READ all articles
 */
 const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
     return res.status(200)
    .json(new Apiresponse(200,articles,"Articles fetched successfully"))
  } catch (error) {
     console.error(error)
    throw new ApiError(500,"Something went wrong getting all articles.")
  }
};

/**
 * READ single article
 */
 const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article)
      throw new ApiError(404,"Article not found")

    return res.status(200)
    .json(new Apiresponse(200,article,"Article fetched successfully"))
  } catch (error) {
    console.error(error)
    throw new ApiError(500,"Something went wrong while getting article.")
  }
};

/**
 * UPDATE article
 */
 const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!article)
      throw new ApiError(404,"Article not found")

    return res.status(200)
    .json(new Apiresponse(200,article,"Article updated successfully"))
  } catch (error) {
    console.error(error)
    throw new ApiError(500,"Something went wrong while updating article.")
  }
};

/**
 * DELETE article
 */
 const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article)
      throw new ApiError(404,"Article not found")

    return res.status(200)
    .json(new Apiresponse(200,article,"Article deleted successfully"))
  } catch (error) {
    console.error(error)
    throw new ApiError(500,"Something went wrong while deleting article.")
  }
};

export {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
}