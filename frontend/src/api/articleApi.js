import axiosClient from "./axiosClient";

export const addArticle = (url) =>
  axiosClient.post("/articles", { url });

export const getUserArticles = () =>
  axiosClient.get("/articles");

export const deleteArticle = (id) =>
  axiosClient.delete(`/articles/${id}`);
