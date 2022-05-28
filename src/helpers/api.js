import axios from "axios";

const baseURL = 'https://nvj-backend-app.herokuapp.com/api';

const api = axios.create({
  baseURL: baseURL,
});

export default api;