import axiosClient from "./axiosClient";

export const addNote = (data) =>
  axiosClient.post("/notes", data);

export const getNotes = (articleId) =>
  axiosClient.get(`/notes/${articleId}`);

export const deleteNote = (id) =>
  axiosClient.delete(`/notes/${id}`);
