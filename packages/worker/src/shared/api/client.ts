import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "https://api.stockholmes.store/api/"
    : "https://api.stockholmes.store/api/";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true, 
});


export default client;
