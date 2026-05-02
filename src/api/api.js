import axios from "axios";
import { log } from "three";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

export const request = async (method, url, data = null, config = {}) => {
    try {
        const response = await api({
            method,
            url,
            data,
            ...config,
        });
        return response.data;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
};

export const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
};

export const register = async (credential) => {
    const response = await api.post("/auth/register", credential);
    return response.data.data;
};

export const logout = async () => {
    await api.post("/auth/logout");
    window.location.href = "/";
};

export const resetPassword = async (email) => {
    const response = await api.post("/auth/forgot-password",  email );
    return response;
};

export const getOtp = async (email) => {
    const response = await api.post("/auth/generate-otp",  {email} );
    return response.data;
}

export const verifyOtp = async (data) => {
    const response = await api.post("/auth/verify-otp", data);
    return response;
}

export const getAllProduct = async () => {
    const response = await api.get("/products");
    return response.data;
}

export const createProduct = async (product) => {
    const response = await api.post("/products", product);
    return response.data;
}

export const uploadMultipleImages = async (formData) => {
    const response = await api.post("/upload/multiple", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const getAllCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
}

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}