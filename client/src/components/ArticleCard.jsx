import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div className="card">
      <h2>{article.title}</h2>
      <p>{article.content.slice(0, 150)}...</p>
      <Link to={`/article/${article._id}`}>Read More</Link>
    </div>
  );
}
