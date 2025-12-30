import express from  "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import articleRouter from "./routes/article.routes.js";
import { updatedArticleRouter } from "./routes/updatedArticle.routes.js";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit:"16kb"
}))


app.use(express.static("public"))

app.use(cookieParser())


//routes start
app.use("/api/articles", articleRouter);
app.use("/api/updated-articles", updatedArticleRouter);

export {app}