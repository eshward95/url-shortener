// apiService.js

import axios from "axios";

const BASE_URL = "http://localhost:3001";
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createShortUrl(longUrl) {
  try {
    const response = await apiClient.post("/generate", {
      originalUrl: longUrl,
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw error;
  }
}
export async function deleteShortUrl(shortUrl) {
  try {
    const response = await apiClient.delete(`/${shortUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw error;
  }
}

export async function getAllShortUrls() {
  try {
    const response = await apiClient.get("/all");
    return response.data;
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw error;
  }
}
