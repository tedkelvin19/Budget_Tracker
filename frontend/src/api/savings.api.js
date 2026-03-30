import { api } from "./client";

export const savingsApi = {
  list: () => api.get("/savings"),
  create: (payload) => api.post("/savings", payload),
  update: (id, payload) => api.put(`/savings/${id}`, payload),
  remove: (id) => api.delete(`/savings/${id}`),
};

