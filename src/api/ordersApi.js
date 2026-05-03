import { request } from "./api";

export const getAllOrders = async () => request("get", "/orders");
export const changeOrderStatus = async ({ id, status }) => request("put", `/orders/update-status`, { id, status });
export const updateTrackingNumber = async ({ id, tracking_number }) => request("put", `/orders/add-tracking-number`, { id, tracking_number });
export const updatePaymentStatus = async ({ id, payment_status }) => request("put", `/orders/update-payment-status`, { id, payment_status });
