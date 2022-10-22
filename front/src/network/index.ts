import axios from 'axios';

const server = axios.create({
  baseURL: "http://localhost:5173/"
})

export const getApiList = () => server.get("/api/list")
export const getCityList = (city: string) => server.get(`/api/citylist?city=${city}`)