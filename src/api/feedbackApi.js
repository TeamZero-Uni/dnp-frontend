import api, { request } from "./api";

export const submitFeedback = async ({ message, rating }) => request("post", "/feedback", { message, rating });
export const getAllFeedback = async () => request("get", "/feedback");
export const getApprovedFeedbacks = async () => request("get", "/feedback/approved");
export const deleteFeedback = async (id) => {
        const res = await api.delete(`/feedback/${id}`);
        return res.data;
}
export const changeFeedbackStatus = async ({id, status}) => request("put", `/feedback/update-status`, { id, status });