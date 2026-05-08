import api, { request } from "./api";

export const getAllProjects = async () => request("get", "/portfolio");
export const updateProject = async (data) => request("put", `/portfolio/${data.portfolio_id}`, data);
export const createProject = async (data) => request("post", "/portfolio", data);
export const deleteProject = async (id) => {
        const res = await api.delete(`/portfolio/${id}`);
        return res.data;
}