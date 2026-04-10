import axios from "axios";
import { log } from "three";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

export const googleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
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

