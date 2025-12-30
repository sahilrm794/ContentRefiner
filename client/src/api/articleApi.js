import api from "./axios";

export const fetchArticles = async () => {
  const response = await api.get("/articles");
  return response.data.data;
};


export const fetchUpdatedArticles = async () => {
  const response = await api.get("/updated-articles");
  return response.data.data;
};

export const fetchUpdatedByOriginalId = async (id) => {
  const response = await api.get(`/updated-articles/${id}`);
  return response.data.data;
};
