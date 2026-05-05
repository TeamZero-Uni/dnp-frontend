import api from "./api";

//add quote request data
export const submitQuoteRequest = async (quoteData) => {
    const response = await api.post("/quote", quoteData);
    return response.data;
}