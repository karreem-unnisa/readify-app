import axiosClient from "./axiosClient";

export const registerUser = (name, email, password) =>
  axiosClient.post("/auth/register", { name, email, password });

export const loginUser = (email, password) =>
  axiosClient.post("/auth/login", { email, password });

export const getMe = () => axiosClient.get("/auth/me");
