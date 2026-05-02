import { request } from "./api";

export const getAllOrders = async () => request("get", "/orders");
export const changeOrderStatus = async (data) => request("put", `/orders/update-status`, data );
export const updateTrackingNumber = async (data) => request("put", `/orders/add-tracking-number`, data );
export const updatePaymentStatus = async (data) => request("put", `/orders/update-payment-status`, data );