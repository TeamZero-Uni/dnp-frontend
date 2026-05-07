import { exp } from "three/src/nodes/math/MathNode.js";
import api, { request } from "./api";

export const getAllGalleries = async () => request("get", "/galleries");
export const createGallery = async ({ title, image_url, category_id }) => request("post", "/galleries", { title, image_url, category_id });

export const deleteGallery = async (id) => {
    const res = await api.delete(`/galleries/${id}`);
    return res.data;
}