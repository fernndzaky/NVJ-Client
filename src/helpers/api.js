import axios from "axios";

const baseURL = 'https://www.api.stujaindonesia.com/api';

const api = axios.create({
  baseURL: baseURL,
});

export default api;