import api from "./api"

export const getMyOrdersAPI = async () => {
  const response = await api.get("/user/orders/me")
  return response.data.data
}