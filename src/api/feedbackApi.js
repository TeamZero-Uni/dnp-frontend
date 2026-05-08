import api, { request } from "./api";

export const getAllFeedback = async () => request("get", "/feedback");
export const deleteFeedback = async (id) => {
        const res = await api.delete(`/feedback/${id}`);
        return res.data;
}
export const changeFeedbackStatus = async ({id, status}) => request("put", `/feedback/update-status`, { id, status });