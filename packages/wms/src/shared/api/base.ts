import axios from "axios";

export const serverUrl = import.meta.env.VITE_SERVER_URL;

const authAxios = axios.create({
  baseURL: serverUrl,
});

authAxios.interceptors.request.use((config) => {
  const localStorageValue = localStorage.getItem("loginUser");

  if (localStorageValue) {
    const localStorage = JSON.parse(localStorageValue);

    const token = localStorage?.state?.user?.at;

    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }
  }

  return config;
});

const noAuthAxios = axios.create({
  baseURL: serverUrl,
});

export { authAxios, noAuthAxios };
