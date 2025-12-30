import api from "./axios";

export const fetchArticles = async () => {
  const { data } = await api.get("/articles");
  return data.articles;
};

export const fetchUpdatedArticles = async () => {
  const { data } = await api.get("/updated-articles");
  return data.updatedArticles;
};

export const fetchUpdatedByOriginalId = async (id) => {
  const { data } = await api.get(`/updated-articles/original/${id}`);
  return data.updatedArticle;
};
