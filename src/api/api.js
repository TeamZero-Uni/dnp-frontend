import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

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

export const getProductReviews = async (productId) => {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data;
}

export const createReview = async (reviewData) => {
    const response = await api.post("/reviews", reviewData);
    return response.data;
}

export const voteReviewAPI = async (reviewId, likesChange, dislikesChange) => {
    const response = await api.post(`/reviews/${reviewId}/vote`, { likesChange, dislikesChange });
    return response.data;
}
// Chatbot services

// ── GET requests ────────────────────────────────────────
export const getChatbotServices = async () => {
    try {
        const response = await api.get("/chatbot/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching chatbot services:", error);
        throw error;
    }
};

export const getChatbotSizes = async () => {
    try {
        const response = await api.get("/chatbot/sizes");
        return response.data;
    } catch (error) {
        console.error("Error fetching chatbot sizes:", error);
        throw error;
    }
};

export const getChatbotMaterials = async () => {
    try {
        const response = await api.get("/chatbot/materials");
        return response.data;
    } catch (error) {
        console.error("Error fetching chatbot materials:", error);
        throw error;
    }
};



// ── POST requests ───────────────────────────────────────
export const postLightLetterEstimate = async (payload) => {
    try {
        const response = await api.post("/chatbot/calculate", payload);
        return response.data;
    } catch (error) {
        console.error("Error posting light letter estimate:", error);
        throw error;
    }
};
export const postThreeDPartEstimate = async (payload) => {
    try {
        const response = await api.post("/chatbot/calculate/3dpart", payload);
        return response.data;
    } catch (error) {
        console.error("Error posting 3D part estimate:", error);
        throw error;
    }
};
//===================================== 
