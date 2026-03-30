import { api } from "./client";

export const transactionsApi = {
  list: (params) => api.get("/transactions", { params }),
  create: (payload) => api.post("/transactions", payload),
  update: (id, payload) => api.put(`/transactions/${id}`, payload),
  remove: (id) => api.delete(`/transactions/${id}`),
};