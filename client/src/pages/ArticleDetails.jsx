import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticles,
  fetchUpdatedByOriginalId,
} from "../api/articleApi";

export default function ArticleDetails() {
  const { id } = useParams();
  const [original, setOriginal] = useState(null);
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    fetchArticles().then((articles) => {
      setOriginal(articles.find((a) => a._id === id));
    });

    fetchUpdatedByOriginalId(id).then(setUpdated);
  }, [id]);

  if (!original) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{original.title}</h1>

      <div className="card">
        <h2>Original Article</h2>
        <p>{original.content}</p>
      </div>

      {updated && (
        <div className="card">
          <h2>Updated Article (AI)</h2>
          <p>{updated.content}</p>

          <h3>References</h3>
          <ul>
            {updated.references.map((ref, i) => (
              <li key={i}>
                <a href={ref} target="_blank">{ref}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
