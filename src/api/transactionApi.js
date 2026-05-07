import api, { request } from "./api";

export const getAllTransactions = async () => request("get", "/transactions");
export const deleteTransaction = async (id) => {
        const res = await api.delete(`/transactions/${id}`);
        return res.data;
}