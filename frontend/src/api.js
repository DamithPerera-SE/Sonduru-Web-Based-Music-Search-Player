import axios from 'axios';

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/music"
});

export const searchMusic = (query) => API.get(`/search?query=${query}`);
