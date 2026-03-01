// const API_URL = "http://localhost:5000/api";

// interface ApiError {
//   message: string;
// }

// export async function apiRequest<T>(
//   path: string,
//   method: string = "GET",
//   body?: object
// ): Promise<T> {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${API_URL}${path}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   if (!res.ok) {
//     const error: ApiError = await res.json();
//     throw new Error(error.message || "API Error");
//   }

//   return res.json() as Promise<T>;
// }
import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface ApiError {
  message: string;
}

export async function apiRequest<T>(
  path: string,
  method: string = "GET",
  body?: object
): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error: ApiError = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json() as Promise<T>;
}


const api = axios.create({
  baseURL: API_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;