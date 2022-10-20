import axios from 'axios';

const server = axios.create({
  baseURL: "http://localhost:5173/"
})

export const getlist = () => server.get("/api/list")