import api, { request } from "./api";

//add quote request data
export const submitQuoteRequest = async (quoteData) => {
    const response = await api.post("/quote", quoteData);
    return response.data;
}

export const getQuotetions = async () => request("get", "/quote");

export const updateQuotetion = async (data) => request("put", `/quote/${data.q_id}`, data); 