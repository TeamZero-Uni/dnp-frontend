import api from "./api";

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
export const getEngravingExamples = async () => {
    try {
        const response = await api.get("/chatbot/engraving");
        return response.data;
    } catch (error) {
        console.error("Error fetching engraving examples:", error);
        throw error;
    }
};

export const getChatbotCutting = async () => {
    try {
        const response = await api.get("/chatbot/cutting");
        return response.data;
    } catch (error) {
        console.error("Error fetching chatbot cutting examples:", error);
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



