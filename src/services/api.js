import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.111.47.237:8000', // FastAPI backend endpoint
});

export default api;
