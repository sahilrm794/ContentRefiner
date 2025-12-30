import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articleApi";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);

useEffect(() => {
   fetchArticles().then(setArticles).catch(console.error);
}, []);

  console.log(articles)
  return (
    <div className="container">
      <h1>Original Articles</h1>
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
}
