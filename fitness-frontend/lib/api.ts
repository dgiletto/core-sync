import axios from "axios";

const API = axios.create({
    baseURL: "http://coresync-env.eba-cus37khe.us-east-2.elasticbeanstalk.com/api"
});

// Add JWT auth header
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global 401 handler
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export const AuthAPI = {
    register: (data: any) => API.post("/auth/register", data),
    login: (data: { email: string; password: string }) =>
        API.post("/auth/login", data)
};

export default API;