import axiosClient from "./axiosClient";

export const addHighlight = (data) =>
  axiosClient.post("/highlights", data);

export const getHighlights = (articleId) =>
  axiosClient.get(`/highlights/${articleId}`);

export const deleteHighlight = (id) =>
  axiosClient.delete(`/highlights/${id}`);
