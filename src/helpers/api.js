import axios from "axios";

const baseURL = 'https://api.visitdusunbutuh.com/api';

const api = axios.create({
  baseURL: baseURL,
});

export default api;