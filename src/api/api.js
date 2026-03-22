import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

export const login = (credentials) => api.post("/auth/login", credentials);
export const logout = () => api.post("/auth/logout");
export const me = () => api.get("/auth/me");
export const register = (userData) => api.post("/auth/register", userData);
export const verifyEmail = (otp) => api.post("/auth/verify-otp", { otp });
export const resendOTP = (email) => api.post("/auth/generate-otp", { email });
export const forgotPassword = (email) => api.post("/auth/change-password", { email });
export const googleLogin = () => api.get("/auth/google");
export const GoogleCallback = () => api.get(`/auth/google/callback`);

export const uploadImage = (formData) => api.post("/upload/img", formData);

export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post("/products", productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;