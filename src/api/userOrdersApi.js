import api from "./api"

// ── GET requests ────────────────────────────────────────

export const getMyOrdersAPI = async () => {
  const response = await api.get("/user/orders/me")
  return response.data.data
}

export const getUserDetailsAPI = async () => {
  const response = await api.get("/user/orders/details/me")
  return response.data.data
}

export const updateUserDetailsAPI = async (payload) => {
  // Update profile endpoint - handles both JSON and FormData (for file upload)
  const config = payload instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
  const response = await api.put("/user/profile/update", payload, config)
  return response.data
}

export const getWishlistAPI = async () => {
  const response = await api.get("/user/orders/wishlist/me")
  return response.data.data
}

