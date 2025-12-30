import { Router } from "express";
import {
  getAllUpdatedArticles,
  getUpdatedArticleById,
} from "../controllers/updatedArticle.controller.js";


const updatedArticleRouter = Router();


updatedArticleRouter.get("/", getAllUpdatedArticles);
updatedArticleRouter.get("/:id", getUpdatedArticleById);


export {updatedArticleRouter}

